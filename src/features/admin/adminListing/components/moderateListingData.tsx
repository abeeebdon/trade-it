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
      'border-success/40 text-success hover:bg-success/10 data-[active=true]:bg-success data-[active=true]:text-bg data-[active=true]:border-success',
  },
  {
    label: 'draft',
    icon: FileText,
    className:
      'border-muted/40 text-muted hover:bg-muted/10 data-[active=true]:bg-muted data-[active=true]:text-bg data-[active=true]:border-muted',
  },
  {
    label: 'archived',
    icon: Archive,
    className:
      'border-danger/40 text-danger hover:bg-danger/10 data-[active=true]:bg-danger data-[active=true]:text-bg data-[active=true]:border-danger',
  },
];
