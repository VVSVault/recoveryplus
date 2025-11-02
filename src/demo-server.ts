import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createLogger } from './utils/logger.js';
import path from 'path';
import { readFileSync } from 'fs';

const logger = createLogger('demo-server');

async function startDemoServer() {
  const app = Fastify({
    logger: false,
  });

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  // Health endpoint
  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: 'demo',
      message: 'Recovery Plus Backend is running!'
    };
  });

  // Demo dashboard snapshot endpoint
  app.get('/v1/dashboard/snapshot', async (request, reply) => {
    const demoData = {
      apiVersion: '1.0',
      date: new Date().toISOString().split('T')[0],
      readiness: {
        score: 72,
        delta7d: 6,
        version: 'v1.0',
        confidence: 0.85
      },
      keyMetrics: {
        hrvMs: 66,
        sleepH: 7.2,
        rhrBpm: 54,
        load: 420
      },
      flags: ['HRV below baseline', 'Consider lighter intensity'],
      todayPrescription: [
        {
          protocolId: 'mob_lower_10',
          title: 'Lower Body Mobility',
          durationMin: 10
        },
        {
          protocolId: 'box_breathe_5',
          title: 'Box Breathing',
          durationMin: 5
        }
      ],
      surveyPromptPending: true
    };

    return reply.send(demoData);
  });

  // Demo prescriptions endpoint
  app.get('/v1/prescriptions/today', async (request, reply) => {
    return {
      date: new Date().toISOString().split('T')[0],
      protocols: [
        {
          id: 'mob_lower_10',
          title: 'Lower Body Mobility',
          durationMin: 10,
          steps: [
            '90/90 hip switches - 2 minutes',
            'Couch stretch - 2 minutes per side',
            'Ankle dorsiflexion - 2 minutes',
            'Pigeon pose - 2 minutes per side'
          ],
          tags: ['mobility', 'recovery', 'lower-body'],
          equipment: [],
          contraindications: ['acute knee injury']
        },
        {
          id: 'box_breathe_5',
          title: 'Box Breathing',
          durationMin: 5,
          steps: [
            'Inhale for 4 counts',
            'Hold for 4 counts',
            'Exhale for 4 counts',
            'Hold for 4 counts',
            'Repeat for 5 minutes'
          ],
          tags: ['breathwork', 'recovery', 'stress'],
          equipment: [],
          contraindications: []
        }
      ],
      rationale: {
        ruleIds: ['Low_HRV_High_Stiffness'],
        keyInputs: {
          hrvDeltaPct: -12,
          stiffness: 7,
          sleepH: 6.3
        }
      }
    };
  });

  // Demo trends endpoint
  app.get('/v1/dashboard/trends', async (request, reply) => {
    const generateTrend = (base: number, variance: number, days: number) => {
      const result = [];
      const today = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        result.push({
          d: date.toISOString().split('T')[0],
          v: base + (Math.random() - 0.5) * variance
        });
      }
      return result;
    };

    return {
      apiVersion: '1.0',
      series: {
        hrvMs: generateTrend(65, 10, 14),
        sleepH: generateTrend(7, 2, 14),
        rhrBpm: generateTrend(54, 6, 14),
        load: generateTrend(450, 100, 14),
        soreness: generateTrend(4, 3, 14),
        stiffness: generateTrend(5, 3, 14),
        reset: generateTrend(6, 2, 14),
        readiness: generateTrend(72, 15, 14)
      }
    };
  });

  // Demo auth endpoint
  app.post('/v1/auth/login', async (request, reply) => {
    const { email } = request.body as any;
    return {
      token: 'demo-jwt-token-' + Date.now(),
      user: {
        id: 'demo-user-id',
        email: email || 'demo@recoveryplus.io',
        name: 'Demo User',
        role: 'ATHLETE',
        sport: 'RUNNING',
        timezone: 'America/Los_Angeles',
        teamId: null,
        createdAt: new Date().toISOString()
      }
    };
  });

  // Serve the demo dashboard HTML
  app.get('/demo', async (request, reply) => {
    try {
      const htmlPath = path.join(process.cwd(), 'public', 'demo-dashboard.html');
      const html = readFileSync(htmlPath, 'utf-8');
      reply.type('text/html').send(html);
    } catch (error) {
      reply.status(404).send({ error: 'Demo dashboard not found' });
    }
  });

  // List available endpoints
  app.get('/', async (request, reply) => {
    return {
      message: 'Recovery Plus Backend API',
      version: '1.0.0',
      demo: 'Visit http://localhost:3000/demo for the interactive dashboard',
      endpoints: [
        'GET /demo - Interactive Dashboard UI',
        'GET /health - Health check',
        'GET /v1/dashboard/snapshot - Dashboard data',
        'GET /v1/dashboard/trends - Historical trends',
        'GET /v1/prescriptions/today - Today\'s prescriptions',
        'POST /v1/auth/login - Demo login',
      ],
      documentation: '/api/openapi.yaml'
    };
  });

  const port = process.env.PORT || 3000;

  await app.listen({
    port: Number(port),
    host: '0.0.0.0',
  });

  logger.info(`🚀 Demo server running on http://localhost:${port}`);
  logger.info('📊 Dashboard snapshot: http://localhost:3000/v1/dashboard/snapshot');
  logger.info('💊 Today\'s prescriptions: http://localhost:3000/v1/prescriptions/today');
  logger.info('📈 Trends: http://localhost:3000/v1/dashboard/trends');
  logger.info('\n✨ This is a demo server with mock data. Full server requires PostgreSQL and Redis.');

  return app;
}

startDemoServer().catch((error) => {
  logger.error({ error }, 'Failed to start demo server');
  process.exit(1);
});