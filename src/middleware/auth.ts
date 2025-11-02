import { FastifyReply, FastifyRequest } from 'fastify';
import { Role } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;
  }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    request.user = request.user as AuthUser;
  } catch (error) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
}

export function requireRole(...roles: Role[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    await authenticate(request, reply);

    if (!request.user || !roles.includes(request.user.role)) {
      reply.status(403).send({ error: 'Insufficient permissions' });
    }
  };
}