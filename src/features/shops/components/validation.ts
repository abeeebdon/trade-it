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
export const prepayOrderSchema = z.object({
  qty: z.string(),
  shipping_name: z
    .string()
    .min(4, 'Shipping name should not be less than 4 letters'),
  shipping_address: z
    .string()
    .min(4, 'Shipping address should not be less than 4 letters'),
  shipping_email: z.string().email(),
  shipping_phone: z
    .string()
    .min(9, 'Shipping number should not be less than 9 numbers'),
});
export type PrepayOrderForm = z.infer<typeof prepayOrderSchema>;

export const quoteOrderSchema = z.object({
  qty: z.string(),
  quoteMsg: z.string().optional(),
});
export type QuoteOrderForm = z.infer<typeof quoteOrderSchema>;
