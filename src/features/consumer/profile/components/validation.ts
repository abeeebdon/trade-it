import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Full name is required').max(100),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, 'Enter a valid phone number')
    .or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
