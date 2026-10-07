import z from 'zod';

export const businessSchema = z.object({
  businessName: z.string().min(3, 'Business name is required'),
  businessType: z.enum(['business', 'individual'], 'Select a business type'),
  country: z.string().min(1, 'Please select your country'),
  sector: z.string().min(1, 'Please select a sector'),
  contact_phone: z.string().min(1, 'Contact phone is required'),
  contact_email: z
    .string()
    .min(1, 'Contact email is required')
    .email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),

  cacNumber: z.string().optional(),
  tin: z.string().optional(),
  director_name: z.string().optional(),

  bvn: z.string().optional(),
  nin: z.string().optional(),

  ein: z.string().optional(),
});

export type BusinessFormValues = z.infer<typeof businessSchema>;
