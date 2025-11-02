import { beforeAll, afterAll } from 'vitest';
import { prisma } from '../src/utils/database';

beforeAll(async () => {
  console.log('Test setup: Connecting to test database');
});

afterAll(async () => {
  await prisma.$disconnect();
});