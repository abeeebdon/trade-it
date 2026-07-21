import { z } from 'zod';
import { ShieldCheck, FileText, Archive, LucideIcon } from 'lucide-react';

// ── Zod schema ──────────────────────────────────────
export const moderateSchema = z.object({
  action: z.string().min(1, 'Please select an action'),
  notes: z
    .string()
    .min(5, 'Notes must be at least 5 characters')
    .max(500, 'Notes must be at most 500 characters'),
});

export type ModerateFormData = z.infer<typeof moderateSchema>;

// ── Modal props ─────────────────────────────────────
export interface ModerateListingModalProps {
  listingId: number;
  listingTitle: string;
  currentStatus: string;
  onClose: () => void;
}

// ── Action button config ────────────────────────────
export interface ActionConfigItem {
  label: string;
  icon: LucideIcon;
  className: string;
}

export const actionConfig: ActionConfigItem[] = [
  {
    label: 'active',
    icon: ShieldCheck,
    className:
      'border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E]/10 data-[active=true]:bg-[#22C55E] data-[active=true]:text-white data-[active=true]:border-[#22C55E]',
  },
  {
    label: 'draft',
    icon: FileText,
    className:
      'border-[#9CA3AF]/40 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 data-[active=true]:bg-[#9CA3AF] data-[active=true]:text-white data-[active=true]:border-[#9CA3AF]',
  },
  {
    label: 'archived',
    icon: Archive,
    className:
      'border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/10 data-[active=true]:bg-[#EF4444] data-[active=true]:text-white data-[active=true]:border-[#EF4444]',
  },
];
