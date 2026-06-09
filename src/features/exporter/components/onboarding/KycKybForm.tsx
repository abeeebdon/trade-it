'use client';

import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { Business, KycForm } from '../../types/exporter';

interface KycKybFormProps {
  biz: Business;
  kycForm: KycForm;
  onChange: (form: KycForm) => void;
  onSubmit: () => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="helix-label">{label}</label>
      {children}
    </div>
  );
}

export default function KycKybForm({
  biz,
  kycForm,
  onChange,
  onSubmit,
}: KycKybFormProps) {
  const isBusiness = biz.registration_type === 'business';

  const uploadDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const f of files) {
      try {
        // Mock upload — replace with real API call when backend is ready
        const mockPath = `uploads/kyc/${Date.now()}-${f.name}`;
        onChange({ ...kycForm, docs: [...kycForm.docs, mockPath] });
        toast.success(`Uploaded ${f.name}`);
      } catch {
        toast.error(`Failed to upload ${f.name}`);
      }
    }
  };

  return (
    <div className="helix-card p-6 space-y-5">
      <h2 className="helix-h3">
        {isBusiness ? 'KYB Documents' : 'KYC Documents'}
      </h2>
      <p className="text-[#9CA3AF] text-sm leading-relaxed">
        Upload scans of{' '}
        {isBusiness
          ? 'CAC certificate, TIN, director ID and proof of address'
          : 'government ID, BVN slip, proof of address'}
        . Helix will forward to Anchor for verification.
      </p>

      {/* Form fields */}
      <div className="grid md:grid-cols-2 gap-4">
        {isBusiness ? (
          <>
            <Field label="CAC Number">
              <input
                className="helix-input"
                value={kycForm.cac_number}
                onChange={(e) =>
                  onChange({ ...kycForm, cac_number: e.target.value })
                }
              />
            </Field>
            <Field label="TIN">
              <input
                className="helix-input"
                value={kycForm.tin}
                onChange={(e) => onChange({ ...kycForm, tin: e.target.value })}
              />
            </Field>
            <Field label="Director Name">
              <input
                className="helix-input"
                value={kycForm.director_name}
                onChange={(e) =>
                  onChange({ ...kycForm, director_name: e.target.value })
                }
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="BVN (11 digits)">
              <input
                className="helix-input"
                value={kycForm.bvn}
                onChange={(e) => onChange({ ...kycForm, bvn: e.target.value })}
                maxLength={11}
              />
            </Field>
            <Field label="NIN">
              <input
                className="helix-input"
                value={kycForm.nin}
                onChange={(e) => onChange({ ...kycForm, nin: e.target.value })}
              />
            </Field>
          </>
        )}
      </div>

      {/* File upload */}
      <div>
        <label className="helix-label">Upload documents (PDF, image)</label>
        <input
          data-testid="kyc-upload"
          type="file"
          multiple
          accept=".pdf,image/*"
          onChange={uploadDoc}
          className="helix-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#C9922A]/20 file:text-[#C9922A] file:font-medium"
        />
        <div className="mt-2 text-[12px] text-[#9CA3AF]">
          {kycForm.docs.length} file(s) staged.
        </div>
      </div>

      {/* Submit */}
      <button
        data-testid="kyc-submit"
        onClick={onSubmit}
        disabled={kycForm.docs.length === 0}
        className="helix-btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit for review <ArrowRight size={14} />
      </button>
    </div>
  );
}
