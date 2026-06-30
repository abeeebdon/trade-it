import z from 'zod';

export const profileSchema = z
  .object({
    business_name: z
      .string()
      .min(2, 'Business name must be at least 2 characters'),

    registration_type: z.enum(['business', 'individual']),

    country: z.string().min(1, 'Country is required'),

    sector: z.string().min(1, 'Sector is required'),

    contact_phone: z.string().min(10, 'Enter a valid phone number'),

    contact_email: z.email('Enter a valid email'),

    address: z.string().min(5, 'Address is required'),

    cac_number: z.string().optional(),

    tin: z.string().optional(),

    director_name: z.string().optional(),

    bvn: z.string().optional(),

    nin: z.string().optional(),

    ein: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.country === 'Nigeria' && data.registration_type === 'business') {
      if (!data.cac_number) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cac_number'],
          message: 'CAC Number is required',
        });
      }

      if (!data.tin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['tin'],
          message: 'TIN is required',
        });
      }

      if (!data.director_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['director_name'],
          message: 'Director name is required',
        });
      }
    }

    if (data.country === 'Nigeria' && data.registration_type === 'individual') {
      if (!data.bvn || data.bvn.length !== 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['bvn'],
          message: 'BVN must be 11 digits',
        });
      }

      if (!data.nin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['nin'],
          message: 'NIN is required',
        });
      }
    }

    if (data.country === 'United States' && !data.ein) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ein'],
        message: 'EIN is required',
      });
    }
  });

export type ProfileFormData = z.infer<typeof profileSchema>;
