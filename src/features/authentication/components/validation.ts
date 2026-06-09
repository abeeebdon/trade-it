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
  role: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Product validation schema

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  category: z.string().min(1, 'Please select a category'),

  unitId: z.number({ error: 'Please select a unit' }),

  price_usd: z
    .number({ error: 'Price is required' })
    .positive('Price must be greater than 0'),

  moq: z
    .number({ error: 'MOQ is required' })
    .int()
    .positive('MOQ must be at least 1'),

  description: z.string().min(10, 'Description must be at least 10 characters'),

  currencyId: z.number(),
  statusId: z.number(),
  thumbnail: z.instanceof(File).nullable().optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, 'At least one product image is required'),
  thumbnailPreview: z.string().nullable().optional(),
  imagePreviews: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
