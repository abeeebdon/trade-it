import { z } from 'zod';

export const addAddressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  recipient_name: z.string().min(1, 'Recipient name is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2),
  postal_code: z.string().min(5, 'Valid postal code is required'),
  phone: z.string().optional(),
  is_default: z.boolean().optional(),
});

export type AddAddressFormValues = z.infer<typeof addAddressSchema>;
