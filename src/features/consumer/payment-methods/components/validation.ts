import z from 'zod';

export const achSchema = z.object({
  isDefault: z.boolean().optional(),
  bankName: z.string().min(2, 'Bank name is required'),
  routingNumber: z
    .string()
    .regex(/^\d{9}$/, 'Enter a valid 9-digit routing number'),
  accountNumber: z.string().min(4, 'Account number is required'),
});

export type AchFormValues = z.infer<typeof achSchema>;

export const zelleSchema = z.object({
  is_default: z.boolean().optional(),
  zelleEmail: z.string().min(5, 'Enter a valid email address'),
});

export type ZelleFormValues = z.infer<typeof zelleSchema>;
