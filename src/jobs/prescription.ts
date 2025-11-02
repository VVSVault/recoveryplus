import { Job } from 'bullmq';
import { JobData } from '../utils/queue.js';
import { createLogger } from '../utils/logger.js';
import { PrescriptionEngine } from '../modules/prescription/engine.js';

const logger = createLogger('jobs:prescription');

export async function processPrescription(job: Job<JobData['prescription']>) {
  const { userId, date } = job.data;

  const engine = new PrescriptionEngine();
  const dateObj = new Date(date);

  const prescription = await engine.generatePrescription(userId, dateObj);

  if (prescription) {
    logger.info({
      userId,
      date,
      prescriptionId: prescription.id,
      protocolCount: prescription.items.length,
    }, 'Prescription generated');

    return {
      prescriptionId: prescription.id,
      protocolCount: prescription.items.length,
    };
  }

  logger.info({
    userId,
    date,
  }, 'No prescription generated');

  return null;
}