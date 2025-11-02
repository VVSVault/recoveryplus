import { describe, it, expect, beforeAll } from 'vitest';
import { buildApp } from '../../src/app';
import { FastifyInstance } from 'fastify';

describe('Auth Endpoints', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
  });

  describe('POST /v1/auth/register', () => {
    it('should register a new user', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/auth/register',
        payload: {
          email: `test${Date.now()}@example.com`,
          password: 'testpassword123',
          name: 'Test User',
          sport: 'RUNNING',
          timezone: 'America/Los_Angeles',
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('token');
      expect(body).toHaveProperty('user');
      expect(body.user.email).toContain('test');
    });

    it('should reject duplicate email', async () => {
      const email = `duplicate${Date.now()}@example.com`;

      await app.inject({
        method: 'POST',
        url: '/v1/auth/register',
        payload: {
          email,
          password: 'testpassword123',
          name: 'Test User',
          sport: 'RUNNING',
        },
      });

      const response = await app.inject({
        method: 'POST',
        url: '/v1/auth/register',
        payload: {
          email,
          password: 'testpassword123',
          name: 'Test User 2',
          sport: 'RUNNING',
        },
      });

      expect(response.statusCode).toBe(409);
    });
  });

  describe('POST /v1/auth/login', () => {
    it('should login with valid credentials', async () => {
      const email = `login${Date.now()}@example.com`;
      const password = 'testpassword123';

      await app.inject({
        method: 'POST',
        url: '/v1/auth/register',
        payload: {
          email,
          password,
          name: 'Login Test',
          sport: 'RUNNING',
        },
      });

      const response = await app.inject({
        method: 'POST',
        url: '/v1/auth/login',
        payload: { email, password },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('token');
      expect(body.user.email).toBe(email);
    });

    it('should reject invalid credentials', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/auth/login',
        payload: {
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        },
      });

      expect(response.statusCode).toBe(401);
    });
  });
});