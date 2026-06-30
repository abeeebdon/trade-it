import z from 'zod';

export const listingSchema = z.object({
  Title: z.string().min(1, 'Title is required'),
  Category: z.string().min(1, 'Category is required'),
  RetailPriceUsd: z.string().min(1, 'Retail price is required'),
  StockQty: z.string().min(0, 'Stock quantity cannot be negative'),
  ShipsFrom: z.string().min(1, 'Ships from is required'),
  Description: z.string().min(1, 'Description is required'),
  LocalListingStatusId: z.string(),
});
