import { Job } from 'bullmq';
import { JobData } from '../utils/queue.js';
import { prisma } from '../utils/database.js';
import { createLogger } from '../utils/logger.js';
import { ReadinessCalculator } from '../modules/readiness/calculator.js';
import { addJob } from '../utils/queue.js';

const logger = createLogger('jobs:readiness');

export async function processReadiness(job: Job<JobData['readiness']>) {
  const { userId, date, trigger } = job.data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  const calculator = new ReadinessCalculator(user.sport);
  const dateObj = new Date(date);

  const result = await calculator.calculate(userId, dateObj);

  const readinessScore = await prisma.readinessScore.upsert({
    where: {
      userId_date_version: {
        userId,
        date: dateObj,
        version: 'v1.0',
      },
    },
    create: {
      userId,
      date: dateObj,
      score: result.score,
      confidence: result.confidence,
      version: 'v1.0',
      inputs: result.inputs as any,
      weights: result.weights as any,
      components: result.components as any,
      rationale: result.rationale,
    },
    update: {
      score: result.score,
      confidence: result.confidence,
      inputs: result.inputs as any,
      weights: result.weights as any,
      components: result.components as any,
      rationale: result.rationale,
    },
  });

  logger.info({
    userId,
    date,
    trigger,
    score: result.score,
    confidence: result.confidence,
  }, 'Readiness score calculated');

  await addJob('prescription', {
    userId,
    date,
  }, { delay: 1000 });

  return {
    scoreId: readinessScore.id,
    score: result.score,
    confidence: result.confidence,
  };
}