import { z } from 'zod';
import { DateStringSchema } from './common';

export const ReadinessSchema = z.object({
  score: z.number().min(0).max(100),
  delta7d: z.number(),
  version: z.string(),
  confidence: z.number().min(0).max(1).optional(),
});

export const KeyMetricsSchema = z.object({
  hrvMs: z.number().nullable(),
  sleepH: z.number().nullable(),
  rhrBpm: z.number().nullable(),
  load: z.number().nullable(),
});

export const PrescriptionSummarySchema = z.object({
  protocolId: z.string(),
  title: z.string(),
  durationMin: z.number(),
});

export const DashboardSnapshotSchema = z.object({
  apiVersion: z.string().default('1.0'),
  date: DateStringSchema,
  readiness: ReadinessSchema,
  keyMetrics: KeyMetricsSchema,
  flags: z.array(z.string()),
  todayPrescription: z.array(PrescriptionSummarySchema),
  surveyPromptPending: z.boolean(),
});

export const DataPointSchema = z.object({
  d: DateStringSchema,
  v: z.number(),
});

export const TrendSeriesSchema = z.object({
  hrvMs: z.array(DataPointSchema),
  sleepH: z.array(DataPointSchema),
  rhrBpm: z.array(DataPointSchema),
  load: z.array(DataPointSchema),
  soreness: z.array(DataPointSchema),
  stiffness: z.array(DataPointSchema),
  reset: z.array(DataPointSchema),
  readiness: z.array(DataPointSchema),
});

export const TrendDataSchema = z.object({
  apiVersion: z.string().default('1.0'),
  series: TrendSeriesSchema,
});

export type Readiness = z.infer<typeof ReadinessSchema>;
export type KeyMetrics = z.infer<typeof KeyMetricsSchema>;
export type PrescriptionSummary = z.infer<typeof PrescriptionSummarySchema>;
export type DashboardSnapshot = z.infer<typeof DashboardSnapshotSchema>;
export type DataPoint = z.infer<typeof DataPointSchema>;
export type TrendSeries = z.infer<typeof TrendSeriesSchema>;
export type TrendData = z.infer<typeof TrendDataSchema>;