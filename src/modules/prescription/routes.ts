import { FastifyInstance } from 'fastify';
import { authenticate } from '../../middleware/auth.js';
import { prisma } from '../../utils/database.js';
import { createLogger } from '../../utils/logger.js';

const logger = createLogger('prescription:routes');

export async function prescriptionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate);

  app.get('/today', async (request, reply) => {
    const userId = request.user!.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const prescription = await prisma.prescription.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      include: {
        items: {
          include: {
            protocol: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!prescription) {
      return reply.send({
        date: today.toISOString().split('T')[0],
        protocols: [],
        rationale: {
          ruleIds: [],
          keyInputs: {},
        },
      });
    }

    return reply.send({
      date: prescription.date.toISOString().split('T')[0],
      protocols: prescription.items.map(item => ({
        id: item.protocol.id,
        title: item.protocol.title,
        durationMin: item.protocol.durationMin,
        steps: item.protocol.steps,
        tags: item.protocol.tags,
        equipment: item.protocol.equipment || [],
        contraindications: item.protocol.contraindications || [],
      })),
      rationale: {
        ruleIds: prescription.ruleIds as string[],
        keyInputs: prescription.inputs as any,
      },
    });
  });

  app.get('/history', async (request, reply) => {
    const userId = request.user!.id;
    const { from, to } = request.query as any;

    const where: any = { userId };

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }

    const prescriptions = await prisma.prescription.findMany({
      where,
      include: {
        items: {
          include: {
            protocol: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 30,
    });

    return reply.send({
      prescriptions: prescriptions.map(p => ({
        date: p.date.toISOString().split('T')[0],
        protocols: p.items.map(item => ({
          id: item.protocol.id,
          title: item.protocol.title,
          durationMin: item.protocol.durationMin,
          steps: item.protocol.steps,
          tags: item.protocol.tags,
          equipment: item.protocol.equipment || [],
          contraindications: item.protocol.contraindications || [],
        })),
        rationale: {
          ruleIds: p.ruleIds as string[],
          keyInputs: p.inputs as any,
        },
      })),
    });
  });

  app.post('/:id/complete', async (request, reply) => {
    const userId = request.user!.id;
    const { id } = request.params as any;

    const item = await prisma.prescriptionItem.findFirst({
      where: {
        id,
        prescription: {
          userId,
        },
      },
    });

    if (!item) {
      return reply.status(404).send({ error: 'Prescription item not found' });
    }

    await prisma.prescriptionItem.update({
      where: { id },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    });

    logger.info({
      userId,
      itemId: id,
    }, 'Prescription item completed');

    return reply.send({ success: true });
  });
}