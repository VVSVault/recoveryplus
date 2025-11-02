import { FastifyInstance } from 'fastify';
import { Role } from '@prisma/client';
import { requireRole } from '../../middleware/auth.js';
import { prisma } from '../../utils/database.js';
import { createLogger } from '../../utils/logger.js';

const logger = createLogger('admin:routes');

export async function adminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', requireRole(Role.ADMIN));

  app.get('/protocols', async (request, reply) => {
    const { tags } = request.query as any;

    const where: any = { isActive: true };

    if (tags) {
      const tagList = Array.isArray(tags) ? tags : [tags];
      where.tags = {
        path: '$',
        array_contains: tagList,
      };
    }

    const protocols = await prisma.protocol.findMany({
      where,
      orderBy: {
        title: 'asc',
      },
    });

    return reply.send({ protocols });
  });

  app.post('/protocols', async (request, reply) => {
    const data = request.body as any;

    const protocol = await prisma.protocol.create({
      data: {
        title: data.title,
        description: data.description,
        steps: data.steps,
        durationMin: data.durationMin,
        tags: data.tags || [],
        equipment: data.equipment || [],
        contraindications: data.contraindications || [],
        level: data.level || 'intermediate',
        createdBy: request.user!.id,
      },
    });

    logger.info({
      protocolId: protocol.id,
      createdBy: request.user!.id,
    }, 'Protocol created');

    return reply.status(201).send(protocol);
  });

  app.put('/protocols/:id', async (request, reply) => {
    const { id } = request.params as any;
    const data = request.body as any;

    const protocol = await prisma.protocol.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        steps: data.steps,
        durationMin: data.durationMin,
        tags: data.tags,
        equipment: data.equipment,
        contraindications: data.contraindications,
        level: data.level,
        version: {
          increment: 1,
        },
      },
    });

    logger.info({
      protocolId: protocol.id,
      updatedBy: request.user!.id,
      version: protocol.version,
    }, 'Protocol updated');

    return reply.send(protocol);
  });

  app.get('/rules', async (request, reply) => {
    const rules = await prisma.rule.findMany({
      orderBy: {
        priority: 'desc',
      },
    });

    return reply.send({ rules });
  });

  app.post('/rules', async (request, reply) => {
    const data = request.body as any;

    const rule = await prisma.rule.create({
      data: {
        name: data.name,
        enabled: data.enabled ?? true,
        priority: data.priority ?? 0,
        conditions: data.conditions,
        actions: data.actions,
      },
    });

    logger.info({
      ruleId: rule.id,
      createdBy: request.user!.id,
    }, 'Rule created');

    return reply.status(201).send(rule);
  });

  app.put('/rules/:id', async (request, reply) => {
    const { id } = request.params as any;
    const data = request.body as any;

    const rule = await prisma.rule.update({
      where: { id },
      data: {
        name: data.name,
        enabled: data.enabled,
        priority: data.priority,
        conditions: data.conditions,
        actions: data.actions,
        version: {
          increment: 0.1,
        },
      },
    });

    logger.info({
      ruleId: rule.id,
      updatedBy: request.user!.id,
    }, 'Rule updated');

    return reply.send(rule);
  });

  app.get('/flags', async (request, reply) => {
    const flags = await prisma.featureFlag.findMany();

    const flagMap = flags.reduce((acc, flag) => {
      acc[flag.name] = flag.enabled;
      return acc;
    }, {} as Record<string, boolean>);

    return reply.send(flagMap);
  });

  app.put('/flags', async (request, reply) => {
    const updates = request.body as Record<string, boolean>;

    for (const [name, enabled] of Object.entries(updates)) {
      await prisma.featureFlag.upsert({
        where: { name },
        create: { name, enabled },
        update: { enabled },
      });
    }

    logger.info({
      updatedBy: request.user!.id,
      flags: Object.keys(updates),
    }, 'Feature flags updated');

    return reply.send({ success: true });
  });
}