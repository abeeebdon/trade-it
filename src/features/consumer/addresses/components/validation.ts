import { z } from 'zod';

export const addAddressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  recipientName: z.string().min(1, 'Recipient name is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(20),
  postalCode: z.string().min(5, 'Valid postal code is required'),
  phoneNumber: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type AddAddressFormValues = z.infer<typeof addAddressSchema>;
