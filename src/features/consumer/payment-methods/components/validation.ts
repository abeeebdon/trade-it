import { z } from 'zod';

const baseSchema = z.object({
  kind: z.enum(['card', 'zelle', 'ach']),
  is_default: z.boolean().optional(),
  card_number: z.string().optional(),
  exp_month: z.string().optional(),
  exp_year: z.string().optional(),
  zelle_target: z.string().optional(),
  bank_name: z.string().optional(),
  routing_number: z.string().optional(),
  account_number: z.string().optional(),
});

export const addPaymentSchema = baseSchema.superRefine((data, ctx) => {
  if (data.kind === 'card') {
    if (!data.card_number || data.card_number.trim().length < 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid card number',
        path: ['card_number'],
      });
    }
    if (!data.exp_month || !/^(0[1-9]|1[0-2])$/.test(data.exp_month)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid month (01-12)',
        path: ['exp_month'],
      });
    }
    if (!data.exp_year || !/^\d{4}$/.test(data.exp_year)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid year (e.g. 2029)',
        path: ['exp_year'],
      });
    }
  }
  if (data.kind === 'zelle') {
    if (!data.zelle_target || data.zelle_target.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid email or phone',
        path: ['zelle_target'],
      });
    }
  }
  if (data.kind === 'ach') {
    if (!data.bank_name || data.bank_name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bank name is required',
        path: ['bank_name'],
      });
    }
    if (!data.routing_number || !/^\d{9}$/.test(data.routing_number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid 9-digit routing number',
        path: ['routing_number'],
      });
    }
    if (!data.account_number || data.account_number.trim().length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Account number is required',
        path: ['account_number'],
      });
    }
  }
});

export type AddPaymentFormValues = z.infer<typeof addPaymentSchema>;
