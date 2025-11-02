import { z } from 'zod';

export const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const DateTimeStringSchema = z.string().datetime();

export const PaginationSchema = z.object({
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

export const DateRangeSchema = z.object({
  from: DateStringSchema,
  to: DateStringSchema,
});

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    apiVersion: z.string().default('1.0'),
    data: dataSchema,
    meta: z.object({
      timestamp: DateTimeStringSchema,
    }).optional(),
  });

export const ErrorResponseSchema = z.object({
  error: z.string(),
  details: z.record(z.any()).optional(),
  code: z.string().optional(),
});

export type DateString = z.infer<typeof DateStringSchema>;
export type DateTimeString = z.infer<typeof DateTimeStringSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;