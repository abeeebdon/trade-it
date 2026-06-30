import { z } from 'zod';

export const listingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  retail_price_usd: z.coerce
    .number()
    .positive('Retail price must be greater than zero'),
  stock_qty: z.coerce.number().min(1, 'Stock quantity is required'),
  ships_from: z.string().min(1, 'Ships from is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['active', 'out_of_stock', 'archived']),
});

export type ListingFormValues = z.infer<typeof listingSchema>;
