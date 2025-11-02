import { Job } from 'bullmq';
import { JobData } from '../utils/queue.js';
import { prisma } from '../utils/database.js';
import { createLogger } from '../utils/logger.js';
import { addJob } from '../utils/queue.js';

const logger = createLogger('jobs:ingest');

export async function processIngest(job: Job<JobData['ingest']>) {
  const { type, payload, userId } = job.data;

  if (type !== 'apple-health') {
    throw new Error(`Unknown ingest type: ${type}`);
  }

  const { metrics } = payload;
  let metricsProcessed = 0;
  const dates = new Set<string>();

  for (const metric of metrics) {
    const date = new Date(metric.date);
    date.setHours(0, 0, 0, 0);

    try {
      await prisma.metricSample.upsert({
        where: {
          userId_date_kind_source: {
            userId,
            date,
            kind: metric.kind,
            source: 'APPLE_HEALTH',
          },
        },
        create: {
          userId,
          date,
          kind: metric.kind,
          value: metric.value,
          unit: metric.unit,
          source: 'APPLE_HEALTH',
          metadata: metric.meta || {},
        },
        update: {
          value: metric.value,
          unit: metric.unit,
          metadata: metric.meta || {},
        },
      });

      metricsProcessed++;
      dates.add(date.toISOString().split('T')[0]);
    } catch (error) {
      logger.error({
        userId,
        metric,
        error: error instanceof Error ? error.message : error,
      }, 'Failed to process metric');
    }
  }

  await prisma.sourceAccount.upsert({
    where: {
      userId_provider: {
        userId,
        provider: 'APPLE_HEALTH',
      },
    },
    create: {
      userId,
      provider: 'APPLE_HEALTH',
      status: 'ACTIVE',
      lastSyncAt: new Date(),
    },
    update: {
      lastSyncAt: new Date(),
      status: 'ACTIVE',
    },
  });

  for (const date of dates) {
    await addJob('readiness', {
      userId,
      date,
      trigger: 'ingest',
    }, { delay: 2000 });
  }

  logger.info({
    userId,
    metricsProcessed,
    datesAffected: dates.size,
  }, 'Ingest completed');

  return {
    metricsProcessed,
    dates: Array.from(dates),
  };
}