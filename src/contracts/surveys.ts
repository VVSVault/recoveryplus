import { z } from 'zod';
import { DateTimeStringSchema } from './common';

export const SessionSurveyRequestSchema = z.object({
  sessionAt: DateTimeStringSchema,
  stiffness: z.number().int().min(1).max(10),
  soreness: z.number().int().min(1).max(10),
  mentalReset: z.number().int().min(1).max(10),
  notes: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
});

export const SessionSurveyResponseSchema = z.object({
  id: z.string(),
  createdAt: DateTimeStringSchema,
  triggeredRecompute: z.boolean(),
});

export const SessionSurveySchema = SessionSurveyRequestSchema.extend({
  id: z.string(),
  userId: z.string(),
  createdAt: DateTimeStringSchema,
});

export type SessionSurveyRequest = z.infer<typeof SessionSurveyRequestSchema>;
export type SessionSurveyResponse = z.infer<typeof SessionSurveyResponseSchema>;
export type SessionSurvey = z.infer<typeof SessionSurveySchema>;