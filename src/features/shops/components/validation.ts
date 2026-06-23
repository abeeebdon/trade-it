import { z } from 'zod';

export const productOrderSchema = z.object({
  qty: z.string().min(1, 'Quantity must be at least 1'),
  shipping_name: z.string().min(1, 'Required'),
  shipping_address: z.string().min(5, 'Address too short'),
  shipping_email: z.string().email('Invalid email'),
  shipping_phone: z.string().min(7, 'Invalid phone'),
  quoteMsg: z.string().optional(),
});

export type ProductOrderForm = z.infer<typeof productOrderSchema>;
