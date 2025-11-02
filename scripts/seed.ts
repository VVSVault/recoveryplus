import { PrismaClient, Role, Sport, MetricKind } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { addDays, subDays } from 'date-fns';
import protocolsData from '../seeds/protocols.json' assert { type: 'json' };
import rulesData from '../seeds/rules.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@recoveryplus.io' },
    update: {},
    create: {
      email: 'admin@recoveryplus.io',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      sport: Sport.GENERAL,
    },
  });

  console.log('Creating test athletes...');
  const athletePassword = await bcrypt.hash('athlete123', 10);

  const athlete1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      passwordHash: athletePassword,
      name: 'John Runner',
      role: Role.ATHLETE,
      sport: Sport.RUNNING,
      timezone: 'America/Los_Angeles',
    },
  });

  const athlete2 = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      email: 'sarah@example.com',
      passwordHash: athletePassword,
      name: 'Sarah Cyclist',
      role: Role.ATHLETE,
      sport: Sport.CYCLING,
      timezone: 'America/New_York',
    },
  });

  console.log('Creating protocols...');
  for (const protocol of protocolsData) {
    await prisma.protocol.upsert({
      where: { id: protocol.id },
      update: {},
      create: {
        ...protocol,
        createdBy: admin.id,
      },
    });
  }

  console.log('Creating rules...');
  for (const rule of rulesData) {
    await prisma.rule.upsert({
      where: { name: rule.name },
      update: {},
      create: rule as any,
    });
  }

  console.log('Creating feature flags...');
  await prisma.featureFlag.upsert({
    where: { name: 'ENABLE_PRESCRIPTIONS' },
    update: {},
    create: { name: 'ENABLE_PRESCRIPTIONS', enabled: true },
  });

  await prisma.featureFlag.upsert({
    where: { name: 'ENABLE_SURVEY_PROMPTS' },
    update: {},
    create: { name: 'ENABLE_SURVEY_PROMPTS', enabled: true },
  });

  await prisma.featureFlag.upsert({
    where: { name: 'ENABLE_NOTIFICATIONS' },
    update: {},
    create: { name: 'ENABLE_NOTIFICATIONS', enabled: false },
  });

  console.log('Creating sample metrics for John (14 days)...');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 13; i >= 0; i--) {
    const date = subDays(today, i);

    const hrvBase = 65 + Math.random() * 10 - 5;
    const hrvValue = i === 2 ? hrvBase * 0.85 : hrvBase;

    await prisma.metricSample.upsert({
      where: {
        userId_date_kind_source: {
          userId: athlete1.id,
          date,
          kind: MetricKind.HRV,
          source: 'APPLE_HEALTH',
        },
      },
      update: {},
      create: {
        userId: athlete1.id,
        date,
        kind: MetricKind.HRV,
        value: Math.round(hrvValue),
        unit: 'ms',
        source: 'APPLE_HEALTH',
      },
    });

    const sleepBase = 7 + Math.random() * 2 - 1;
    const sleepValue = i === 1 ? 5.5 : sleepBase;

    await prisma.metricSample.upsert({
      where: {
        userId_date_kind_source: {
          userId: athlete1.id,
          date,
          kind: MetricKind.SLEEP_DURATION,
          source: 'APPLE_HEALTH',
        },
      },
      update: {},
      create: {
        userId: athlete1.id,
        date,
        kind: MetricKind.SLEEP_DURATION,
        value: Math.round(sleepValue * 10) / 10,
        unit: 'hours',
        source: 'APPLE_HEALTH',
      },
    });

    const rhrBase = 52 + Math.random() * 6 - 3;
    const rhrValue = i === 2 ? rhrBase * 1.15 : rhrBase;

    await prisma.metricSample.upsert({
      where: {
        userId_date_kind_source: {
          userId: athlete1.id,
          date,
          kind: MetricKind.RHR,
          source: 'APPLE_HEALTH',
        },
      },
      update: {},
      create: {
        userId: athlete1.id,
        date,
        kind: MetricKind.RHR,
        value: Math.round(rhrValue),
        unit: 'bpm',
        source: 'APPLE_HEALTH',
      },
    });

    const loadValue = 400 + Math.random() * 200 - 100;

    await prisma.metricSample.upsert({
      where: {
        userId_date_kind_source: {
          userId: athlete1.id,
          date,
          kind: MetricKind.LOAD,
          source: 'APPLE_HEALTH',
        },
      },
      update: {},
      create: {
        userId: athlete1.id,
        date,
        kind: MetricKind.LOAD,
        value: Math.round(loadValue),
        unit: 'au',
        source: 'APPLE_HEALTH',
      },
    });
  }

  console.log('Creating sample surveys for John...');
  for (let i = 6; i >= 0; i -= 2) {
    const sessionDate = subDays(today, i);
    sessionDate.setHours(17, 30, 0, 0);

    const stiffness = i === 2 ? 7 : Math.floor(Math.random() * 3) + 3;
    const soreness = i === 2 ? 6 : Math.floor(Math.random() * 3) + 3;

    await prisma.sessionSurvey.create({
      data: {
        userId: athlete1.id,
        sessionAt: sessionDate,
        stiffness,
        soreness,
        mentalReset: Math.floor(Math.random() * 3) + 5,
        notes: i === 2 ? 'Hamstrings tight after intervals' : null,
        tags: [],
      },
    });
  }

  console.log('Creating sample readiness scores for John...');
  const { ReadinessCalculator } = await import('../src/modules/readiness/calculator.js');
  const calculator = new ReadinessCalculator(Sport.RUNNING);

  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    const result = await calculator.calculate(athlete1.id, date);

    await prisma.readinessScore.create({
      data: {
        userId: athlete1.id,
        date,
        score: result.score,
        confidence: result.confidence,
        version: 'v1.0',
        inputs: result.inputs as any,
        weights: result.weights as any,
        components: result.components as any,
        rationale: result.rationale,
      },
    });
  }

  console.log('Creating sample prescriptions for John...');
  const { PrescriptionEngine } = await import('../src/modules/prescription/engine.js');
  const engine = new PrescriptionEngine();

  for (let i = 2; i >= 0; i--) {
    const date = subDays(today, i);
    await engine.generatePrescription(athlete1.id, date);
  }

  console.log('Setting up source accounts...');
  await prisma.sourceAccount.create({
    data: {
      userId: athlete1.id,
      provider: 'APPLE_HEALTH',
      status: 'ACTIVE',
      lastSyncAt: today,
      scopes: ['activity', 'body', 'heart_rate', 'sleep'],
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('\n📋 Test accounts created:');
  console.log('Admin: admin@recoveryplus.io / admin123');
  console.log('Athlete 1: john@example.com / athlete123');
  console.log('Athlete 2: sarah@example.com / athlete123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });