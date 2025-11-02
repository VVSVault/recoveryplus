import { MetricKind, Sport } from '@prisma/client';
import { prisma } from '../../utils/database.js';
import { createLogger } from '../../utils/logger.js';
import weightsConfig from '../../../config/readiness/weights.v1.json' assert { type: 'json' };

const logger = createLogger('readiness:calculator');

interface MetricInput {
  hrvMs: number | null;
  sleepH: number | null;
  rhrBpm: number | null;
  load: number | null;
  stiffness: number | null;
  soreness: number | null;
  mentalReset: number | null;
}

interface BaselineMetrics {
  hrvMean: number;
  hrvStd: number;
  sleepMean: number;
  sleepStd: number;
  rhrMean: number;
  rhrStd: number;
  loadMean: number;
  loadStd: number;
}

export class ReadinessCalculator {
  private weights: Record<string, number>;

  constructor(sport: Sport = Sport.GENERAL) {
    this.weights = this.getWeightsForSport(sport);
  }

  private getWeightsForSport(sport: Sport): Record<string, number> {
    const sportWeights = (weightsConfig.sportSpecific as any)[sport];
    return sportWeights || weightsConfig.default;
  }

  async calculate(userId: string, date: Date): Promise<{
    score: number;
    confidence: number;
    inputs: MetricInput;
    weights: Record<string, number>;
    components: Record<string, number>;
    rationale: string;
  }> {
    const [metrics, baseline, survey] = await Promise.all([
      this.fetchTodayMetrics(userId, date),
      this.fetchBaseline(userId, date),
      this.fetchLatestSurvey(userId, date),
    ]);

    const inputs: MetricInput = {
      hrvMs: metrics.hrv,
      sleepH: metrics.sleep,
      rhrBpm: metrics.rhr,
      load: metrics.load,
      stiffness: survey?.stiffness || null,
      soreness: survey?.soreness || null,
      mentalReset: survey?.mentalReset || null,
    };

    const components: Record<string, number> = {};
    let totalWeight = 0;
    let weightedSum = 0;

    if (inputs.hrvMs !== null && baseline.hrvMean > 0) {
      const zScore = this.calculateZScore(inputs.hrvMs, baseline.hrvMean, baseline.hrvStd);
      components.hrv = this.normalizeScore(zScore);
      weightedSum += components.hrv * this.weights.hrv;
      totalWeight += this.weights.hrv;
    }

    if (inputs.sleepH !== null && baseline.sleepMean > 0) {
      const zScore = this.calculateZScore(inputs.sleepH, baseline.sleepMean, baseline.sleepStd);
      components.sleep = this.normalizeScore(zScore);
      weightedSum += components.sleep * this.weights.sleep;
      totalWeight += this.weights.sleep;
    }

    if (inputs.rhrBpm !== null && baseline.rhrMean > 0) {
      const zScore = this.calculateZScore(inputs.rhrBpm, baseline.rhrMean, baseline.rhrStd);
      components.rhr = this.normalizeScore(-zScore);
      weightedSum += components.rhr * this.weights.rhr;
      totalWeight += this.weights.rhr;
    }

    if (inputs.load !== null && baseline.loadMean > 0) {
      const acuteChronicRatio = this.calculateAcuteChronic(userId, date);
      components.load = this.normalizeLoadRatio(await acuteChronicRatio);
      weightedSum += components.load * this.weights.load;
      totalWeight += this.weights.load;
    }

    if (inputs.stiffness !== null) {
      components.stiffness = this.inverseScale(inputs.stiffness);
      weightedSum += components.stiffness * this.weights.stiffness;
      totalWeight += this.weights.stiffness;
    }

    if (inputs.soreness !== null) {
      components.soreness = this.inverseScale(inputs.soreness);
      weightedSum += components.soreness * this.weights.soreness;
      totalWeight += this.weights.soreness;
    }

    if (inputs.mentalReset !== null) {
      components.reset = this.scale(inputs.mentalReset);
      weightedSum += components.reset * this.weights.reset;
      totalWeight += this.weights.reset;
    }

    const score = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 50;
    const confidence = totalWeight / Object.values(this.weights).reduce((a, b) => a + b, 0);

    const rationale = this.generateRationale(inputs, components, score);

    return {
      score: Math.max(0, Math.min(100, score)),
      confidence: Math.round(confidence * 100) / 100,
      inputs,
      weights: this.weights,
      components,
      rationale,
    };
  }

  private async fetchTodayMetrics(userId: string, date: Date) {
    const metrics = await prisma.metricSample.findMany({
      where: {
        userId,
        date,
      },
    });

    const result = {
      hrv: null as number | null,
      sleep: null as number | null,
      rhr: null as number | null,
      load: null as number | null,
    };

    for (const metric of metrics) {
      switch (metric.kind) {
        case MetricKind.HRV:
          result.hrv = metric.value;
          break;
        case MetricKind.SLEEP_DURATION:
          result.sleep = metric.value;
          break;
        case MetricKind.RHR:
          result.rhr = metric.value;
          break;
        case MetricKind.LOAD:
          result.load = metric.value;
          break;
      }
    }

    return result;
  }

  private async fetchBaseline(userId: string, date: Date): Promise<BaselineMetrics> {
    const sevenDaysAgo = new Date(date);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const metrics = await prisma.metricSample.findMany({
      where: {
        userId,
        date: {
          gte: sevenDaysAgo,
          lt: date,
        },
      },
    });

    const hrvValues = metrics.filter(m => m.kind === MetricKind.HRV).map(m => m.value);
    const sleepValues = metrics.filter(m => m.kind === MetricKind.SLEEP_DURATION).map(m => m.value);
    const rhrValues = metrics.filter(m => m.kind === MetricKind.RHR).map(m => m.value);
    const loadValues = metrics.filter(m => m.kind === MetricKind.LOAD).map(m => m.value);

    return {
      hrvMean: this.mean(hrvValues),
      hrvStd: this.std(hrvValues),
      sleepMean: this.mean(sleepValues),
      sleepStd: this.std(sleepValues),
      rhrMean: this.mean(rhrValues),
      rhrStd: this.std(rhrValues),
      loadMean: this.mean(loadValues),
      loadStd: this.std(loadValues),
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

  private async calculateAcuteChronic(userId: string, date: Date): Promise<number> {
    const thirtyDaysAgo = new Date(date);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const loads = await prisma.metricSample.findMany({
      where: {
        userId,
        kind: MetricKind.LOAD,
        date: {
          gte: thirtyDaysAgo,
          lte: date,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    if (loads.length < 7) return 1.0;

    const acuteLoads = loads.slice(-7).map(l => l.value);
    const chronicLoads = loads.slice(-28).map(l => l.value);

    const acute = this.mean(acuteLoads);
    const chronic = this.mean(chronicLoads);

    return chronic > 0 ? acute / chronic : 1.0;
  }

  private calculateZScore(value: number, mean: number, std: number): number {
    if (std === 0) return 0;
    return (value - mean) / std;
  }

  private normalizeScore(zScore: number): number {
    const clampedZ = Math.max(-3, Math.min(3, zScore));
    return (clampedZ + 3) / 6;
  }

  private normalizeLoadRatio(ratio: number): number {
    if (ratio < 0.8) return 0.9;
    if (ratio > 1.5) return 0.3;
    if (ratio > 1.3) return 0.5;
    if (ratio > 1.1) return 0.7;
    return 1.0;
  }

  private scale(value: number): number {
    return value / 10;
  }

  private inverseScale(value: number): number {
    return (10 - value) / 10;
  }

  private mean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private std(values: number[]): number {
    if (values.length < 2) return 0;
    const avg = this.mean(values);
    const squareDiffs = values.map(v => Math.pow(v - avg, 2));
    return Math.sqrt(this.mean(squareDiffs));
  }

  private generateRationale(
    inputs: MetricInput,
    components: Record<string, number>,
    score: number
  ): string {
    const factors: string[] = [];

    if (components.hrv !== undefined) {
      const impact = components.hrv > 0.5 ? 'positive' : 'negative';
      factors.push(`HRV ${impact}`);
    }

    if (components.sleep !== undefined && components.sleep < 0.4) {
      factors.push('Sleep deficit');
    }

    if (components.soreness !== undefined && inputs.soreness! >= 7) {
      factors.push('High soreness');
    }

    if (components.stiffness !== undefined && inputs.stiffness! >= 7) {
      factors.push('High stiffness');
    }

    if (score >= 80) {
      return `Strong recovery. ${factors.join(', ') || 'All systems optimal'}`;
    } else if (score >= 60) {
      return `Moderate recovery. ${factors.join(', ') || 'Consider lighter intensity'}`;
    } else {
      return `Recovery needed. ${factors.join(', ') || 'Prioritize rest'}`;
    }
  }
}