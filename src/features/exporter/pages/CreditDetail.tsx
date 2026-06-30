'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useHeader } from '@/context/HeaderContext';
import { formatUSD, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import type { CreditApplication } from '../types/exporter';
import { mockCreditApplications } from '../components/data';

export default function CreditDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { setHeader } = useHeader();

  const found = useMemo(
    () =>
      (mockCreditApplications as CreditApplication[]).find(
        (item) => item.id === id,
      ) || null,
    [id],
  );

  const [application, setApplication] = useState<CreditApplication | null>(
    found,
  );

  useEffect(() => {
    if (!application) return;

    setHeader({
      title: application.application_number,
      kicker: 'JompStart Digital · Credit Application',
      action: <StatusPill status={application.status} />,
    });

    return () => setHeader(null);
  }, [application, setHeader]);

  const acceptOffer = async () => {
    if (!application) return;

    try {
      await new Promise((res) => setTimeout(res, 800));

      setApplication({
        ...application,
        status: 'disbursed',
        timeline: [
          ...(application.timeline || []),
          {
            event: 'decision:disbursed',
            at: new Date().toISOString(),
          },
        ],
      });

      toast.success(
        `Disbursed ${formatUSD(application.offered_amount_usd || 0)}`,
      );
    } catch {
      toast.error('Failed to process offer');
    }
  };

  const timeline = useMemo(() => {
    return application?.timeline ? [...application.timeline].reverse() : [];
  }, [application]);

  if (!application) {
    return (
      <div className="py-20 text-center text-[#9CA3AF]">
        Loading application...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/exporter/credit"
        className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#C9922A] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to applications
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* APPLICATION CARD */}
          <div className="helix-card p-6">
            <div className="helix-label mb-4">Application</div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Requested Amount"
                value={formatUSD(application.amount_usd)}
              />

              <Field
                label="Requested Term"
                value={`${application.term_months} months`}
              />

              <Field
                label="Indicative APR"
                value={
                  application.indicative_apr
                    ? `${application.indicative_apr}%`
                    : '—'
                }
              />

              <Field
                label="Risk Score"
                value={
                  application.risk_score != null
                    ? `${application.risk_score}/100`
                    : '—'
                }
              />

              <Field label="Purpose" value={application.purpose} full />
            </div>
          </div>

          {/* ACTIVE REVENUE OFFER */}
          {application.status === 'offered' && (
            <div className="helix-card p-6 border border-[#C9922A]/40 bg-[#C9922A]/5">
              <div className="helix-kicker mb-2">JompStart Offer</div>
              <h3 className="helix-h3">Your application has been approved</h3>

              <div className="grid sm:grid-cols-3 gap-5 mt-5">
                <OfferMetric
                  label="Offered Amount"
                  value={formatUSD(application.offered_amount_usd || 0)}
                  accent
                />
                <OfferMetric
                  label="APR"
                  value={
                    application.offered_apr != null
                      ? `${application.offered_apr}%`
                      : '—'
                  }
                />
                <OfferMetric
                  label="Term"
                  value={
                    application.offered_term_months != null
                      ? `${application.offered_term_months}mo`
                      : '—'
                  }
                />
              </div>

              {application.decision_note && (
                <p className="mt-4 text-[13px] leading-relaxed text-[#9CA3AF]">
                  {application.decision_note}
                </p>
              )}

              <button
                onClick={acceptOffer}
                className="helix-btn-primary mt-6"
                data-testid="accept-offer-btn"
              >
                Accept & receive disbursement
              </button>

              <div className="text-[11px] text-[#9CA3AF] mt-2">
                Funds credit to your Jompshop USD wallet instantly.
              </div>
            </div>
          )}

          {/* DISBURSED NOTIFICATION */}
          {application.status === 'disbursed' && (
            <div className="helix-card p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={28} className="text-[#1A7A6E] shrink-0" />
                <div>
                  <h3 className="helix-h3">Disbursed</h3>
                  <p className="text-[13px] text-[#9CA3AF] mt-1 leading-relaxed">
                    Funds have been credited to your USD balance. You can view
                    the transaction in Finance → Transactions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REJECTED OVERVIEW */}
          {application.status === 'rejected' && application.decision_note && (
            <div className="helix-card p-6 border border-[#E74C3C]/40">
              <div className="helix-kicker text-[#E74C3C]">Not Approved</div>
              <p className="mt-3 text-[14px] leading-relaxed">
                {application.decision_note}
              </p>
            </div>
          )}

          {/* HISTORICAL TIMELINE */}
          <div className="helix-card p-6">
            <div className="helix-label mb-4">Timeline</div>

            {timeline.length === 0 ? (
              <div className="text-[12px] text-[#9CA3AF]">
                No historical milestones logged.
              </div>
            ) : (
              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1A7A6E] mt-2 shrink-0" />
                    <div>
                      <div className="text-[13px] capitalize">
                        {item.event
                          ?.replaceAll('_', ' ')
                          ?.replace('decision:', '→ ')}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF] font-mono mt-1">
                        {formatDateTime(item.at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* SNAPSHOT HISTORY */}
          <div className="helix-card p-6">
            <div className="helix-label">Sales snapshot at application</div>

            <div className="mt-4 space-y-3 text-[13px]">
              <Row
                label="Paid orders"
                value={application.snapshot_sales?.paid_order_count || 0}
              />
              <Row
                label="Total volume"
                value={formatUSD(
                  application.snapshot_sales?.total_volume_usd || 0,
                )}
              />
              <Row
                label="Average order"
                value={formatUSD(
                  application.snapshot_sales?.average_order_usd || 0,
                )}
              />
            </div>
          </div>

          {/* PARTNER COMPONENT */}
          <div className="helix-card p-6">
            <div className="helix-label">Partner</div>
            <div className="mt-4">
              <div className="font-semibold tracking-wide text-[#C9922A]">
                JompStart Digital Limited
              </div>
              <div className="text-[12px] text-[#9CA3AF] mt-2 leading-relaxed">
                Business credit &amp; technology partner of the Jompshop
                platform.
              </div>
            </div>
          </div>

          {/* SUBMISSION BLOCK */}
          <div className="helix-card p-6">
            <div className="helix-label">Submitted</div>
            <div className="mt-2 font-mono text-sm">
              {formatDateTime(application.created_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value?: React.ReactNode;
  full?: boolean;
}

function Field({ label, value, full }: FieldProps) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <div className="helix-label">{label}</div>
      <div className="text-[14px] mt-1 leading-relaxed">{value || '—'}</div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: React.ReactNode;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[#9CA3AF] text-[12px]">{label}</span>
      <span className="font-mono text-right">{value}</span>
    </div>
  );
}

interface OfferMetricProps {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}

function OfferMetric({ label, value, accent }: OfferMetricProps) {
  return (
    <div>
      <div className="text-[10px] tracking-widest uppercase text-[#9CA3AF]">
        {label}
      </div>
      <div
        className={`font-mono text-2xl font-bold mt-1 ${
          accent ? 'text-[#C9922A]' : ''
        }`}
      >
        {value}
      </div>
    </div>
  );
}
