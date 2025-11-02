import { prisma } from '../../utils/database.js';
import { createLogger } from '../../utils/logger.js';
import { config } from '../../config/index.js';

const logger = createLogger('prescription:engine');

interface RuleCondition {
  metric: string;
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq';
  value: number;
  combinator?: 'AND' | 'OR';
}

interface RuleAction {
  type: 'add_protocol';
  protocolIds?: string[];
  protocolTags?: string[];
}

interface EvaluationContext {
  readinessScore: number;
  hrvDeltaPct: number;
  sleepHours: number;
  sleepDebt24h: number;
  rhrDeltaPct: number;
  acuteChronic: number;
  stiffness: number;
  soreness: number;
  mentalReset: number;
}

export class PrescriptionEngine {
  async generatePrescription(userId: string, date: Date) {
    if (!config.features.enablePrescriptions) {
      logger.info({ userId, date }, 'Prescriptions disabled by feature flag');
      return null;
    }

    const context = await this.buildContext(userId, date);
    const matchedRules = await this.evaluateRules(context);
    const protocolIds = await this.selectProtocols(matchedRules, context);

    if (protocolIds.length === 0) {
      logger.info({ userId, date }, 'No prescriptions generated');
      return null;
    }

    const prescription = await prisma.prescription.create({
      data: {
        userId,
        date,
        reason: this.generateReason(matchedRules, context),
        ruleIds: matchedRules.map(r => r.id),
        inputs: context as any,
        items: {
          create: protocolIds.map((protocolId, index) => ({
            protocolId,
            order: index,
          })),
        },
      },
      include: {
        items: {
          include: {
            protocol: true,
          },
        },
      },
    });

    logger.info({
      userId,
      date,
      prescriptionId: prescription.id,
      protocols: protocolIds.length,
      rules: matchedRules.length,
    }, 'Prescription generated');

    return prescription;
  }

  private async buildContext(userId: string, date: Date): Promise<EvaluationContext> {
    const [readiness, metrics, survey] = await Promise.all([
      this.fetchLatestReadiness(userId, date),
      this.fetchMetricsContext(userId, date),
      this.fetchLatestSurvey(userId, date),
    ]);

    return {
      readinessScore: readiness?.score || 50,
      hrvDeltaPct: metrics.hrvDeltaPct,
      sleepHours: metrics.sleepHours,
      sleepDebt24h: metrics.sleepDebt24h,
      rhrDeltaPct: metrics.rhrDeltaPct,
      acuteChronic: metrics.acuteChronic,
      stiffness: survey?.stiffness || 5,
      soreness: survey?.soreness || 5,
      mentalReset: survey?.mentalReset || 5,
    };
  }

  private async fetchLatestReadiness(userId: string, date: Date) {
    return await prisma.readinessScore.findFirst({
      where: {
        userId,
        date: {
          lte: date,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  private async fetchMetricsContext(userId: string, date: Date) {
    const sevenDaysAgo = new Date(date);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const metrics = await prisma.metricSample.findMany({
      where: {
        userId,
        date: {
          gte: sevenDaysAgo,
          lte: date,
        },
      },
    });

    const todayHrv = metrics.find(m =>
      m.kind === 'HRV' && m.date.toDateString() === date.toDateString()
    )?.value || 0;

    const avgHrv = metrics
      .filter(m => m.kind === 'HRV' && m.date < date)
      .reduce((sum, m) => sum + m.value, 0) / 7 || 1;

    const todaySleep = metrics.find(m =>
      m.kind === 'SLEEP_DURATION' && m.date.toDateString() === date.toDateString()
    )?.value || 0;

    const avgSleep = metrics
      .filter(m => m.kind === 'SLEEP_DURATION')
      .reduce((sum, m) => sum + m.value, 0) / 7 || 7;

    const todayRhr = metrics.find(m =>
      m.kind === 'RHR' && m.date.toDateString() === date.toDateString()
    )?.value || 0;

    const avgRhr = metrics
      .filter(m => m.kind === 'RHR' && m.date < date)
      .reduce((sum, m) => sum + m.value, 0) / 7 || 60;

    return {
      hrvDeltaPct: ((todayHrv - avgHrv) / avgHrv) * 100,
      sleepHours: todaySleep,
      sleepDebt24h: Math.max(0, 8 - todaySleep),
      rhrDeltaPct: ((todayRhr - avgRhr) / avgRhr) * 100,
      acuteChronic: 1.0,
    };
  }

  private async fetchLatestSurvey(userId: string, date: Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await prisma.sessionSurvey.findFirst({
      where: {
        userId,
        sessionAt: {
          gte: date,
          lte: endOfDay,
        },
      },
      orderBy: {
        sessionAt: 'desc',
      },
    });
  }

  private async evaluateRules(context: EvaluationContext) {
    const rules = await prisma.rule.findMany({
      where: {
        enabled: true,
      },
      orderBy: {
        priority: 'desc',
      },
    });

    const matchedRules = [];

    for (const rule of rules) {
      const conditions = rule.conditions as RuleCondition[];
      if (this.evaluateConditions(conditions, context)) {
        matchedRules.push(rule);
      }
    }

    return matchedRules;
  }

  private evaluateConditions(conditions: RuleCondition[], context: EvaluationContext): boolean {
    if (!conditions || conditions.length === 0) return false;

    let result = this.evaluateCondition(conditions[0], context);

    for (let i = 1; i < conditions.length; i++) {
      const condition = conditions[i];
      const conditionResult = this.evaluateCondition(condition, context);

      if (condition.combinator === 'OR') {
        result = result || conditionResult;
      } else {
        result = result && conditionResult;
      }
    }

    return result;
  }

  private evaluateCondition(condition: RuleCondition, context: EvaluationContext): boolean {
    const value = (context as any)[condition.metric];
    if (value === undefined || value === null) return false;

    switch (condition.operator) {
      case 'gt': return value > condition.value;
      case 'gte': return value >= condition.value;
      case 'lt': return value < condition.value;
      case 'lte': return value <= condition.value;
      case 'eq': return value === condition.value;
      case 'neq': return value !== condition.value;
      default: return false;
    }
  }

  private async selectProtocols(rules: any[], context: EvaluationContext): Promise<string[]> {
    const protocolIds = new Set<string>();
    const protocolTags = new Set<string>();

    for (const rule of rules) {
      const actions = rule.actions as RuleAction[];
      for (const action of actions) {
        if (action.type === 'add_protocol') {
          if (action.protocolIds) {
            action.protocolIds.forEach(id => protocolIds.add(id));
          }
          if (action.protocolTags) {
            action.protocolTags.forEach(tag => protocolTags.add(tag));
          }
        }
      }
    }

    if (protocolTags.size > 0) {
      const protocols = await prisma.protocol.findMany({
        where: {
          isActive: true,
          tags: {
            path: '$',
            array_contains: Array.from(protocolTags),
          },
        },
        take: 5,
      });

      protocols.forEach(p => protocolIds.add(p.id));
    }

    return Array.from(protocolIds).slice(0, 5);
  }

  private generateReason(rules: any[], context: EvaluationContext): string {
    if (rules.length === 0) {
      return 'Standard recovery protocol';
    }

    const reasons = [];

    if (context.hrvDeltaPct < -10) {
      reasons.push('HRV below baseline');
    }
    if (context.sleepHours < 6) {
      reasons.push('Insufficient sleep');
    }
    if (context.stiffness >= 7 || context.soreness >= 7) {
      reasons.push('Elevated muscle tension');
    }
    if (context.readinessScore < 60) {
      reasons.push('Low readiness score');
    }

    return reasons.length > 0
      ? reasons.join(', ')
      : `Based on ${rules.map(r => r.name).join(', ')}`;
  }
}