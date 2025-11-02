import { PrismaClient } from '@prisma/client';
import { config } from '../config/index.js';
import { createLogger } from './logger.js';

const logger = createLogger('database');

class Database {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: config.env === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
      });

      Database.instance.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();

        logger.debug({
          model: params.model,
          action: params.action,
          duration: after - before,
        }, 'Database query');

        return result;
      });
    }

    return Database.instance;
  }

  static async connect(): Promise<void> {
    const prisma = Database.getInstance();
    try {
      await prisma.$connect();
      logger.info('Database connected');
    } catch (error) {
      logger.error({ error }, 'Failed to connect to database');
      throw error;
    }
  }

  static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
      logger.info('Database disconnected');
    }
  }
}

export const prisma = Database.getInstance();
export { Database };