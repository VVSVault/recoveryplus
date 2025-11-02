import { createWorker } from '../utils/queue.js';
import { processIngest } from './ingest.js';
import { processReadiness } from './readiness.js';
import { processPrescription } from './prescription.js';
import { processNotification } from './notification.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('jobs');

export function startWorkers() {
  const workers = [
    createWorker('ingest', processIngest),
    createWorker('readiness', processReadiness),
    createWorker('prescription', processPrescription),
    createWorker('notification', processNotification),
  ];

  logger.info(`Started ${workers.length} job workers`);

  return workers;
}