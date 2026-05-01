'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Check, X } from '@phosphor-icons/react';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { VerificationItem } from '../types/admin';
import { VerificationField } from '../components/VerificationFIeld';
import { sampleVerifications } from '../components/data';

export default function AdminVerifications() {
  const [items, setItems] = useState<VerificationItem[]>(sampleVerifications);
  const [note, setNote] = useState('');

  //   const load = async () => {
  //     const { data } = await api.get('/admin/verifications');
  //     setItems(data);
  //   };
  //   useEffect(() => {
  //     load();
  //   }, []);

  //   const decide = async (bid, decision) => {
  //     try {
  //       await api.post(`/admin/verifications/${bid}/decide`, { decision, note });
  //       toast.success(`Marked ${decision}`);
  //       setNote('');
  //       load();
  //     } catch (err) {
  //       toast.error(err.response?.data?.detail || 'Failed');
  //     }
  //   };

  return (
    <main>
      {items.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No pending verifications.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((b) => (
            <div
              key={b.id}
              className="helix-card p-6"
              data-testid={`verify-${b.id}`}
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="helix-h3">{b.business_name}</p>
                  <p className="text-[12px] text-[#9CA3AF] mt-1">
                    {b.registration_type} · {b.country} · {b.sector}
                  </p>
                  <div className="text-[11px] font-mono text-[#1A7A6E] mt-2">
                    Anchor: {b.anchor_customer_id}
                  </div>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
                    {b.cac_number && (
                      <VerificationField label="CAC" value={b.cac_number} />
                    )}
                    {b.bvn && <VerificationField label="BVN" value={b.bvn} />}
                    {b.tin && <VerificationField label="TIN" value={b.tin} />}
                    {b.ein && <VerificationField label="EIN" value={b.ein} />}
                    {b.director_name && (
                      <VerificationField
                        label="Director"
                        value={b.director_name}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <StatusPill status={b.kyc_status} />
                  <StatusPill status={b.kyb_status} />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <input
                  placeholder="Optional note to applicant..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="helix-input flex-1 min-w-[200px]"
                  data-testid={`note-${b.id}`}
                />
                <button
                  //   onClick={() => decide(b.id, 'approved')}
                  className="helix-btn-primary inline-flex items-center gap-2"
                  data-testid={`approve-${b.id}`}
                >
                  <Check size={14} /> Approve & Provision
                </button>
                <button
                  //   onClick={() => decide(b.id, 'rejected')}
                  className="helix-btn-secondary border-[#E74C3C]! text-[#E74C3C]! inline-flex items-center gap-2"
                  data-testid={`reject-${b.id}`}
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
