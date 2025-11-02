import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { config } from './config/index.js';
import { createLogger } from './utils/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { authRoutes } from './modules/auth/routes.js';
import { dashboardRoutes } from './modules/dashboard/routes.js';
import { surveyRoutes } from './modules/surveys/routes.js';
import { prescriptionRoutes } from './modules/prescription/routes.js';
import { ingestRoutes } from './modules/ingest/routes.js';
import { adminRoutes } from './modules/admin/routes.js';

const logger = createLogger('app');

export async function buildApp() {
  const app = Fastify({
    logger: false,
    requestIdLogLabel: 'reqId',
    requestIdHeader: 'x-request-id',
    genReqId: () => crypto.randomUUID(),
  });

  await app.register(cors, {
    origin: config.env === 'production'
      ? ['https://recoveryplus.io', 'https://www.recoveryplus.io']
      : true,
    credentials: true,
  });

  await app.register(jwt, {
    secret: config.auth.jwtSecret,
  });

  app.setErrorHandler(errorHandler);

  app.addHook('onRequest', async (request, reply) => {
    logger.info({
      method: request.method,
      url: request.url,
      reqId: request.id,
    }, 'Request received');
  });

  app.addHook('onResponse', async (request, reply) => {
    logger.info({
      method: request.method,
      url: request.url,
      reqId: request.id,
      statusCode: reply.statusCode,
      duration: reply.getResponseTime(),
    }, 'Request completed');
  });

  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: config.env,
    };
  });

  app.register(authRoutes, { prefix: '/v1/auth' });
  app.register(dashboardRoutes, { prefix: '/v1/dashboard' });
  app.register(surveyRoutes, { prefix: '/v1/surveys' });
  app.register(prescriptionRoutes, { prefix: '/v1/prescriptions' });
  app.register(ingestRoutes, { prefix: '/v1/ingest' });
  app.register(adminRoutes, { prefix: '/v1/admin' });

  return app;
}