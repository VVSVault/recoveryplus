import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import Redis from 'ioredis';
import { config } from '../config/index.js';
import { createLogger } from './logger.js';

const logger = createLogger('queue');

export const redis = new Redis(config.redis.url, {
  maxRetriesPerRequest: null,
});

export const queues = {
  ingest: new Queue('ingest', { connection: redis }),
  readiness: new Queue('readiness', { connection: redis }),
  prescription: new Queue('prescription', { connection: redis }),
  notification: new Queue('notification', { connection: redis }),
};

export const queueEvents = {
  ingest: new QueueEvents('ingest', { connection: redis }),
  readiness: new QueueEvents('readiness', { connection: redis }),
  prescription: new QueueEvents('prescription', { connection: redis }),
  notification: new QueueEvents('notification', { connection: redis }),
};

export interface JobData {
  ingest: {
    type: 'apple-health';
    payload: any;
    userId: string;
  };
  readiness: {
    userId: string;
    date: string;
    trigger: 'survey' | 'ingest' | 'manual' | 'scheduled';
  };
  prescription: {
    userId: string;
    date: string;
  };
  notification: {
    type: 'survey-prompt' | 'weekly-report';
    userId: string;
    data: any;
  };
}

export const addJob = async <T extends keyof JobData>(
  queueName: T,
  data: JobData[T],
  options: {
    delay?: number;
    attempts?: number;
    backoff?: { type: 'exponential' | 'fixed'; delay: number };
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
  } = {}
) => {
  const queue = queues[queueName];
  const job = await queue.add(queueName, data, {
    attempts: options.attempts ?? 3,
    backoff: options.backoff ?? { type: 'exponential', delay: 2000 },
    removeOnComplete: options.removeOnComplete ?? 100,
    removeOnFail: options.removeOnFail ?? 50,
    ...options,
  });

  logger.info({ jobId: job.id, queue: queueName, data }, 'Job added to queue');
  return job;
};

export const createWorker = <T extends keyof JobData>(
  queueName: T,
  processor: (job: Job<JobData[T]>) => Promise<any>
) => {
  const worker = new Worker(
    queueName,
    async (job) => {
      logger.info({ jobId: job.id, queue: queueName }, 'Processing job');
      const start = Date.now();

      try {
        const result = await processor(job);
        const duration = Date.now() - start;

        logger.info({
          jobId: job.id,
          queue: queueName,
          duration,
        }, 'Job completed successfully');

        return result;
      } catch (error) {
        const duration = Date.now() - start;

        logger.error({
          jobId: job.id,
          queue: queueName,
          duration,
          error: error instanceof Error ? error.message : error,
        }, 'Job failed');

        throw error;
      }
    },
    {
      connection: redis,
      concurrency: 5,
    }
  );

  worker.on('failed', (job, error) => {
    logger.error({
      jobId: job?.id,
      queue: queueName,
      error: error.message,
      attemptsMade: job?.attemptsMade,
    }, 'Job failed after all attempts');
  });

  return worker;
};