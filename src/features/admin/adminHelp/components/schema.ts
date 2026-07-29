import z from 'zod';

export const helpSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  displayOrder: z.number().min(0, 'Display order is required'),
});

export type HelpFormValues = z.infer<typeof helpSchema>;
