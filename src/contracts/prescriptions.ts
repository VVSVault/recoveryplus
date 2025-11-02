import { z } from 'zod';
import { DateStringSchema } from './common';

export const ProtocolDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  durationMin: z.number(),
  steps: z.array(z.string()),
  tags: z.array(z.string()),
  equipment: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
});

export const PrescriptionRationaleSchema = z.object({
  ruleIds: z.array(z.string()),
  keyInputs: z.record(z.any()),
});

export const PrescriptionResponseSchema = z.object({
  date: DateStringSchema,
  protocols: z.array(ProtocolDetailSchema),
  rationale: PrescriptionRationaleSchema,
});

export type ProtocolDetail = z.infer<typeof ProtocolDetailSchema>;
export type PrescriptionRationale = z.infer<typeof PrescriptionRationaleSchema>;
export type PrescriptionResponse = z.infer<typeof PrescriptionResponseSchema>;