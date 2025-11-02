import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const ConfigSchema = z.object({
  env: z.enum(['development', 'test', 'production']).default('development'),
  port: z.number().default(3000),

  database: z.object({
    url: z.string(),
  }),

  redis: z.object({
    url: z.string(),
  }),

  auth: z.object({
    jwtSecret: z.string(),
    jwtExpiresIn: z.string().default('7d'),
  }),

  webhook: z.object({
    token: z.string(),
  }),

  features: z.object({
    enablePrescriptions: z.boolean().default(true),
    enableSurveyPrompts: z.boolean().default(true),
    enableNotifications: z.boolean().default(false),
  }),

  logging: z.object({
    level: z.enum(['trace', 'debug', 'info', 'warn', 'error']).default('info'),
  }),

  telemetry: z.object({
    sentryDsn: z.string().optional(),
    otelEndpoint: z.string().optional(),
  }),

  email: z.object({
    from: z.string().email().default('noreply@recoveryplus.io'),
    smtp: z.object({
      host: z.string().optional(),
      port: z.number().optional(),
      user: z.string().optional(),
      password: z.string().optional(),
    }),
  }),
});

const rawConfig = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,

  database: {
    url: process.env.DATABASE_URL!,
  },

  redis: {
    url: process.env.REDIS_URL!,
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  webhook: {
    token: process.env.WEBHOOK_TOKEN!,
  },

  features: {
    enablePrescriptions: process.env.ENABLE_PRESCRIPTIONS === 'true',
    enableSurveyPrompts: process.env.ENABLE_SURVEY_PROMPTS === 'true',
    enableNotifications: process.env.ENABLE_NOTIFICATIONS === 'true',
  },

  logging: {
    level: process.env.LOG_LEVEL as any || 'info',
  },

  telemetry: {
    sentryDsn: process.env.SENTRY_DSN,
    otelEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  },

  email: {
    from: process.env.EMAIL_FROM || 'noreply@recoveryplus.io',
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    },
  },
};

export const config = ConfigSchema.parse(rawConfig);

export type Config = z.infer<typeof ConfigSchema>;