import { z } from 'zod';

export const addComplianceDocSchema = z.object({
  DocumentType: z.string().min(1, 'Document type is required'),
  IssuingAuthority: z.string().min(1, 'Issuing authority is required'),
  IssuedDate: z.string(),
  ExpiryDate: z.string(),
  file_url: z.string(),
  original_filename: z.string().optional(),
});

export type AddComplianceDocType = z.infer<typeof addComplianceDocSchema>;
