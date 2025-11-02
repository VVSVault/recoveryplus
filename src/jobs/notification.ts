import { Job } from 'bullmq';
import { JobData } from '../utils/queue.js';
import { createLogger } from '../utils/logger.js';
import { config } from '../config/index.js';

const logger = createLogger('jobs:notification');

export async function processNotification(job: Job<JobData['notification']>) {
  const { type, userId, data } = job.data;

  if (!config.features.enableNotifications) {
    logger.info({
      userId,
      type,
    }, 'Notifications disabled, skipping');
    return null;
  }

  switch (type) {
    case 'survey-prompt':
      logger.info({
        userId,
        type,
        wouldSend: {
          to: data.email,
          subject: 'Time for your recovery check-in',
          template: 'survey-prompt',
        },
      }, 'Would send survey prompt notification');
      break;

    case 'weekly-report':
      logger.info({
        userId,
        type,
        wouldSend: {
          to: data.email,
          subject: 'Your weekly recovery report',
          template: 'weekly-report',
          data: data.report,
        },
      }, 'Would send weekly report notification');
      break;

    default:
      throw new Error(`Unknown notification type: ${type}`);
  }

  return {
    type,
    userId,
    delivered: false,
    reason: 'Notification delivery not implemented',
  };
}