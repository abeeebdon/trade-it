import { z } from 'zod';

export const createListSchema = z.object({
  name: z.string().min(1, 'List name is required').max(100, 'Name is too long'),
});

export type CreateListFormValues = z.infer<typeof createListSchema>;
