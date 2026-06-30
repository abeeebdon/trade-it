import { StatusPill } from '@/features/shops/components/StatusPill';
import Field from '../../exporter/components/Field';
import { ProfileStep2Props } from '../types/buyers';
import { ArrowRight, CheckCircle } from 'lucide-react';
const ProfileStep2 = ({ biz, kycForm, setKycForm }: ProfileStep2Props) => {
  const uploadDoc = () => {};
  const submitKyc = () => {};
  return (
    <div className="space-y-6">
      <div className="helix-card p-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="helix-label">{biz.business_name}</p>
            <p className="helix-h3 mt-1">
              {biz.sector.replace('-', ' ')} · {biz.country}
            </p>
            <div className="text-[12px] text-[#9CA3AF] font-mono mt-1">
              Anchor customer · {biz.anchor_customer_id}
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <p className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
                KYC
              </p>
              <StatusPill status={biz.kyc_status} />
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
                KYB
              </div>
              <StatusPill status={biz.kyb_status} />
            </div>
          </div>
        </div>
      </div>

      {biz.kyc_status !== 'approved' && biz.kyb_status !== 'approved' && (
        <div className="helix-card p-6 space-y-5">
          <h2 className="helix-h3">
            {biz.registration_type === 'business'
              ? 'KYB Documents'
              : 'KYC Documents'}
          </h2>
          <p className="text-[#9CA3AF] text-sm">
            Upload scans of{' '}
            {biz.registration_type === 'business'
              ? 'CAC certificate, TIN, director ID and proof of address'
              : 'government ID, BVN slip, proof of address'}
            . Jompshop will forward to Anchor for verification.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {biz.registration_type === 'business' ? (
              <>
                <Field label="CAC Number">
                  <input
                    className="helix-input"
                    value={kycForm.cac_number}
                    onChange={(e) =>
                      setKycForm({
                        ...kycForm,
                        cac_number: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="TIN">
                  <input
                    className="helix-input"
                    value={kycForm.tin}
                    onChange={(e) =>
                      setKycForm({ ...kycForm, tin: e.target.value })
                    }
                  />
                </Field>
                <Field label="Director Name">
                  <input
                    className="helix-input"
                    value={kycForm.director_name}
                    onChange={(e) =>
                      setKycForm({
                        ...kycForm,
                        director_name: e.target.value,
                      })
                    }
                  />
                </Field>
              </>
            ) : (
              <>
                <Field label="BVN">
                  <input
                    className="helix-input"
                    value={kycForm.bvn}
                    onChange={(e) =>
                      setKycForm({ ...kycForm, bvn: e.target.value })
                    }
                    maxLength={11}
                  />
                </Field>
                <Field label="NIN">
                  <input
                    className="helix-input"
                    value={kycForm.nin}
                    onChange={(e) =>
                      setKycForm({ ...kycForm, nin: e.target.value })
                    }
                  />
                </Field>
              </>
            )}
          </div>
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
          <button
            data-testid="kyc-submit"
            onClick={submitKyc}
            disabled={kycForm.docs.length === 0}
            className="helix-btn-primary inline-flex items-center gap-2"
          >
            Submit for review <ArrowRight size={14} />
          </button>
        </div>
      )}

      {(biz.kyc_status === 'approved' || biz.kyb_status === 'approved') && (
        <div className="helix-card p-6">
          <div className="flex items-start gap-4">
            <CheckCircle size={28} className="text-[#C9922A]" />
            <div>
              <h3 className="helix-h3">Verification approved</h3>
              <p className="text-[#9CA3AF] text-sm mt-1">
                Your NGN and USD deposit accounts are active.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 font-mono">
                <div>
                  <div className="text-[11px] text-[#9CA3AF] uppercase">
                    NGN Virtual Account
                  </div>
                  <div className="text-[15px] text-[#C9922A]">
                    {biz.anchor_ngn_virtual_account}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9CA3AF] uppercase">
                    USD Virtual Account
                  </div>
                  <div className="text-[15px] text-[#C9922A]">
                    {biz.anchor_usd_virtual_account}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStep2;
