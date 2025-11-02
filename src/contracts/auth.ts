import { z } from 'zod';
import { Role, Sport } from '@prisma/client';

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  sport: z.nativeEnum(Sport),
  timezone: z.string().default('America/Los_Angeles'),
});

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.nativeEnum(Role),
  sport: z.nativeEnum(Sport),
  timezone: z.string(),
  teamId: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type User = z.infer<typeof UserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;