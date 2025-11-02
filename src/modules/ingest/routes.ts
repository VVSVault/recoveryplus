import { FastifyInstance } from 'fastify';
import { AppleHealthPayloadSchema } from '../../contracts/ingest.js';
import { config } from '../../config/index.js';
import { addJob } from '../../utils/queue.js';
import { createLogger } from '../../utils/logger.js';

const logger = createLogger('ingest:routes');

export async function ingestRoutes(app: FastifyInstance) {
  app.post('/apple-health', async (request, reply) => {
    const token = request.headers['x-webhook-token'] as string;

    if (token !== config.webhook.token) {
      return reply.status(401).send({ error: 'Invalid webhook token' });
    }

    const data = AppleHealthPayloadSchema.parse(request.body);

    const job = await addJob('ingest', {
      type: 'apple-health',
      payload: data,
      userId: data.userId,
    });

    logger.info({
      jobId: job.id,
      userId: data.userId,
      metricsCount: data.metrics.length,
    }, 'Apple Health data ingestion queued');

    return reply.status(202).send({
      message: 'Data accepted for processing',
      jobId: job.id,
    });
  });
}