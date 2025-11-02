import { FastifyInstance } from 'fastify';
import { authenticate } from '../../middleware/auth.js';
import { SessionSurveyRequestSchema } from '../../contracts/surveys.js';
import { prisma } from '../../utils/database.js';
import { addJob } from '../../utils/queue.js';
import { createLogger } from '../../utils/logger.js';

const logger = createLogger('surveys:routes');

export async function surveyRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate);

  app.post('/session', async (request, reply) => {
    const data = SessionSurveyRequestSchema.parse(request.body);
    const userId = request.user!.id;

    const survey = await prisma.sessionSurvey.create({
      data: {
        userId,
        sessionAt: new Date(data.sessionAt),
        stiffness: data.stiffness,
        soreness: data.soreness,
        mentalReset: data.mentalReset,
        notes: data.notes,
        tags: data.tags || [],
      },
    });

    const date = new Date(data.sessionAt).toISOString().split('T')[0];

    const jobs = await Promise.all([
      addJob('readiness', {
        userId,
        date,
        trigger: 'survey',
      }),
      addJob('prescription', {
        userId,
        date,
      }, { delay: 5000 }),
    ]);

    logger.info({
      surveyId: survey.id,
      userId,
      jobs: jobs.map(j => j.id),
    }, 'Survey submitted and recompute triggered');

    return reply.status(201).send({
      id: survey.id,
      createdAt: survey.createdAt.toISOString(),
      triggeredRecompute: true,
    });
  });

  app.get('/history', async (request, reply) => {
    const userId = request.user!.id;
    const { from, to, limit = 50 } = request.query as any;

    const where: any = { userId };

    if (from || to) {
      where.sessionAt = {};
      if (from) where.sessionAt.gte = new Date(from);
      if (to) where.sessionAt.lte = new Date(to);
    }

    const surveys = await prisma.sessionSurvey.findMany({
      where,
      orderBy: {
        sessionAt: 'desc',
      },
      take: Number(limit),
    });

    return reply.send({
      surveys: surveys.map(s => ({
        id: s.id,
        userId: s.userId,
        sessionAt: s.sessionAt.toISOString(),
        stiffness: s.stiffness,
        soreness: s.soreness,
        mentalReset: s.mentalReset,
        notes: s.notes,
        tags: s.tags,
        createdAt: s.createdAt.toISOString(),
      })),
    });
  });
}