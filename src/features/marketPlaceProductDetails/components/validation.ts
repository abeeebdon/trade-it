import { z } from 'zod';

export const requestQuotationSchema = z.object({
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  delivery_address: z.string().min(5, 'Please enter a valid delivery address'),
  target_delivery_date: z.string().optional(),
  message: z.string().optional(),
});

export type RequestQuotationFormData = z.infer<typeof requestQuotationSchema>;
