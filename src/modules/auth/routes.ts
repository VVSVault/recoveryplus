import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { RegisterRequestSchema, LoginRequestSchema } from '../../contracts/auth.js';
import { prisma } from '../../utils/database.js';
import { createLogger } from '../../utils/logger.js';

const logger = createLogger('auth:routes');

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const data = RegisterRequestSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return reply.status(409).send({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        sport: data.sport,
        timezone: data.timezone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        sport: true,
        timezone: true,
        teamId: true,
        createdAt: true,
      },
    });

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info({ userId: user.id }, 'User registered');

    return reply.status(201).send({
      token,
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },
    });
  });

  app.post('/login', async (request, reply) => {
    const data = LoginRequestSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info({ userId: user.id }, 'User logged in');

    return reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        sport: user.sport,
        timezone: user.timezone,
        teamId: user.teamId,
        createdAt: user.createdAt.toISOString(),
      },
    });
  });
}