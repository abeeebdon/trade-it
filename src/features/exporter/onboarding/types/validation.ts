import z from 'zod';

export const businessSchema = z
  .object({
    businessName: z.string().min(1, 'Business name is required'),
    businessType: z.enum(['business', 'individual']),
    country: z.string(),
    sector: z.string(),
    contact_phone: z.string().optional(),
    contact_email: z
      .string()
      .email('Invalid email')
      .optional()
      .or(z.literal('')),
    address: z.string().optional(),

    cacNumber: z.string().optional(),
    tin: z.string().optional(),
    director_name: z.string().optional(),

    bvn: z.string().optional(),
    nin: z.string().optional(),

    ein: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.country === 'Nigeria' && data.businessType === 'business') {
      if (!data.cacNumber) {
        ctx.addIssue({
          path: ['cac_number'],
          code: z.ZodIssueCode.custom,
          message: 'CAC number is required',
        });
      }

      if (!data.tin) {
        ctx.addIssue({
          path: ['tin'],
          code: z.ZodIssueCode.custom,
          message: 'TIN is required',
        });
      }

      if (!data.director_name) {
        ctx.addIssue({
          path: ['director_name'],
          code: z.ZodIssueCode.custom,
          message: 'Director name is required',
        });
      }
    }

    if (data.country === 'Nigeria' && data.businessType === 'individual') {
      if (!data.bvn || data.bvn.length !== 11) {
        ctx.addIssue({
          path: ['bvn'],
          code: z.ZodIssueCode.custom,
          message: 'BVN must be 11 digits',
        });
      }

      if (!data.nin) {
        ctx.addIssue({
          path: ['nin'],
          code: z.ZodIssueCode.custom,
          message: 'NIN is required',
        });
      }
    }

    if (data.country === 'United States' && !data.ein) {
      ctx.addIssue({
        path: ['ein'],
        code: z.ZodIssueCode.custom,
        message: 'EIN is required',
      });
    }
  });

export type BusinessFormValues = z.infer<typeof businessSchema>;
