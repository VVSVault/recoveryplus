import { FastifyInstance } from 'fastify';
import { authenticate } from '../../middleware/auth.js';
import { DateRangeSchema } from '../../contracts/common.js';
import { prisma } from '../../utils/database.js';
import { createLogger } from '../../utils/logger.js';
import { MetricKind } from '@prisma/client';

const logger = createLogger('dashboard:routes');

export async function dashboardRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate);

  app.get('/snapshot', async (request, reply) => {
    const date = request.query.date
      ? new Date(request.query.date as string)
      : new Date();

    const userId = request.user!.id;

    const [readinessScore, metrics, prescriptions, survey] = await Promise.all([
      fetchLatestReadiness(userId, date),
      fetchTodayMetrics(userId, date),
      fetchTodayPrescriptions(userId, date),
      checkSurveyPending(userId, date),
    ]);

    const sevenDaysAgo = new Date(date);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const previousReadiness = await prisma.readinessScore.findFirst({
      where: {
        userId,
        date: sevenDaysAgo,
      },
    });

    const delta7d = readinessScore && previousReadiness
      ? readinessScore.score - previousReadiness.score
      : 0;

    const flags = generateFlags(readinessScore, metrics);

    return reply.send({
      apiVersion: '1.0',
      date: date.toISOString().split('T')[0],
      readiness: {
        score: readinessScore?.score || 50,
        delta7d,
        version: readinessScore?.version || 'v1.0',
        confidence: readinessScore?.confidence,
      },
      keyMetrics: {
        hrvMs: metrics.hrv,
        sleepH: metrics.sleep,
        rhrBpm: metrics.rhr,
        load: metrics.load,
      },
      flags,
      todayPrescription: prescriptions.map(p => ({
        protocolId: p.protocol.id,
        title: p.protocol.title,
        durationMin: p.protocol.durationMin,
      })),
      surveyPromptPending: survey,
    });
  });

  app.get('/trends', async (request, reply) => {
    const { from, to } = DateRangeSchema.parse(request.query);
    const userId = request.user!.id;

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const [metrics, surveys, readiness] = await Promise.all([
      fetchMetricsTrends(userId, fromDate, toDate),
      fetchSurveyTrends(userId, fromDate, toDate),
      fetchReadinessTrends(userId, fromDate, toDate),
    ]);

    return reply.send({
      apiVersion: '1.0',
      series: {
        hrvMs: metrics.hrv,
        sleepH: metrics.sleep,
        rhrBpm: metrics.rhr,
        load: metrics.load,
        soreness: surveys.soreness,
        stiffness: surveys.stiffness,
        reset: surveys.reset,
        readiness: readiness,
      },
    });
  });
}

async function fetchLatestReadiness(userId: string, date: Date) {
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

async function fetchTodayMetrics(userId: string, date: Date) {
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

async function fetchTodayPrescriptions(userId: string, date: Date) {
  const prescription = await prisma.prescription.findUnique({
    where: {
      userId_date: {
        userId,
        date,
      },
    },
    include: {
      items: {
        include: {
          protocol: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  return prescription?.items || [];
}

async function checkSurveyPending(userId: string, date: Date) {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const survey = await prisma.sessionSurvey.findFirst({
    where: {
      userId,
      sessionAt: {
        gte: date,
        lte: endOfDay,
      },
    },
  });

  return !survey;
}

function generateFlags(readiness: any, metrics: any): string[] {
  const flags = [];

  if (readiness) {
    const inputs = readiness.inputs as any;
    if (inputs?.hrvDeltaPct && inputs.hrvDeltaPct < -10) {
      flags.push('HRV below baseline');
    }
    if (inputs?.stiffness >= 7) {
      flags.push('Stiffness elevated');
    }
    if (inputs?.soreness >= 7) {
      flags.push('Soreness elevated');
    }
  }

  if (metrics.sleep && metrics.sleep < 6) {
    flags.push('Insufficient sleep');
  }

  if (metrics.rhr && readiness?.inputs?.rhrDeltaPct > 10) {
    flags.push('RHR elevated');
  }

  return flags;
}

async function fetchMetricsTrends(userId: string, from: Date, to: Date) {
  const metrics = await prisma.metricSample.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  const grouped = {
    hrv: [] as { d: string; v: number }[],
    sleep: [] as { d: string; v: number }[],
    rhr: [] as { d: string; v: number }[],
    load: [] as { d: string; v: number }[],
  };

  for (const metric of metrics) {
    const point = {
      d: metric.date.toISOString().split('T')[0],
      v: metric.value,
    };

    switch (metric.kind) {
      case MetricKind.HRV:
        grouped.hrv.push(point);
        break;
      case MetricKind.SLEEP_DURATION:
        grouped.sleep.push(point);
        break;
      case MetricKind.RHR:
        grouped.rhr.push(point);
        break;
      case MetricKind.LOAD:
        grouped.load.push(point);
        break;
    }
  }

  return grouped;
}

async function fetchSurveyTrends(userId: string, from: Date, to: Date) {
  const surveys = await prisma.sessionSurvey.findMany({
    where: {
      userId,
      sessionAt: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      sessionAt: 'asc',
    },
  });

  const grouped = {
    stiffness: [] as { d: string; v: number }[],
    soreness: [] as { d: string; v: number }[],
    reset: [] as { d: string; v: number }[],
  };

  for (const survey of surveys) {
    const date = survey.sessionAt.toISOString().split('T')[0];
    grouped.stiffness.push({ d: date, v: survey.stiffness });
    grouped.soreness.push({ d: date, v: survey.soreness });
    grouped.reset.push({ d: date, v: survey.mentalReset });
  }

  return grouped;
}

async function fetchReadinessTrends(userId: string, from: Date, to: Date) {
  const scores = await prisma.readinessScore.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  return scores.map(score => ({
    d: score.date.toISOString().split('T')[0],
    v: score.score,
  }));
}