import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(64, 'Password must not exceed 64 characters')
  .regex(/[a-z]/, 'Must include at least one lowercase letter')
  .regex(/[A-Z]/, 'Must include at least one uppercase letter')
  .regex(/[0-9]/, 'Must include at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character');
export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Enter a valid email'),
  password: passwordSchema,
  role: z.enum(['exporter', 'buyer', 'consumer']),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
