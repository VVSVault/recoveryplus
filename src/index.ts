import { buildApp } from './app.js';
import { config } from './config/index.js';
import { Database } from './utils/database.js';
import { createLogger } from './utils/logger.js';
import { startWorkers } from './jobs/index.js';
import { initTelemetry } from '../telemetry/opentelemetry.js';

const logger = createLogger('main');

async function start() {
  try {
    await initTelemetry();

    await Database.connect();

    const app = await buildApp();

    startWorkers();

    await app.listen({
      port: config.port,
      host: '0.0.0.0',
    });

    logger.info(`Server running on http://localhost:${config.port}`);
    logger.info(`Environment: ${config.env}`);
    logger.info(`Features: Prescriptions=${config.features.enablePrescriptions}, Surveys=${config.features.enableSurveyPrompts}`);

    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}, shutting down gracefully...`);

      try {
        await app.close();
        await Database.disconnect();
        process.exit(0);
      } catch (error) {
        logger.error({ error }, 'Error during shutdown');
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
}

start();