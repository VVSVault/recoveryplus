import { z } from 'zod';
import { MetricKind } from '@prisma/client';
import { DateStringSchema, DateTimeStringSchema } from './common';

export const MetricPayloadSchema = z.object({
  kind: z.nativeEnum(MetricKind),
  value: z.number(),
  unit: z.string().optional(),
  date: DateStringSchema,
  meta: z.record(z.any()).optional(),
});

export const AppleHealthPayloadSchema = z.object({
  userId: z.string(),
  timestamp: DateTimeStringSchema,
  metrics: z.array(MetricPayloadSchema),
});

export const IngestResponseSchema = z.object({
  message: z.string(),
  jobId: z.string(),
});

export type MetricPayload = z.infer<typeof MetricPayloadSchema>;
export type AppleHealthPayload = z.infer<typeof AppleHealthPayloadSchema>;
export type IngestResponse = z.infer<typeof IngestResponseSchema>;