'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, FileText, Trash2 } from 'lucide-react';
import { formatDateToMM } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useHeader } from '@/context/HeaderContext';
import ComplianceScoreCard from '../../components/ComplianceScoreCard';
import MissingDocsCard from '../components/MissingDocsCard';
import RequirementsCard from '../../components/RequirementsCard';
import AddDocModal from '../components/AddDocModal';
import { useGetCOmplianceStatus } from '../hooks/useGetCompliance';
import { ComplianceVaultData } from '../types/compliance';
import { Loading } from '@/components/loading';

export default function Compliance() {
  const { setHeader } = useHeader();
  const { data, isPending } = useGetCOmplianceStatus();
  const [open, setOpen] = useState(false);
  const complianceData: ComplianceVaultData = useMemo(() => {
    return data ? data : ({} as ComplianceVaultData);
  }, [data]);

  // ── Dynamic header with CTA button
  useEffect(() => {
    setHeader({
      title: 'Compliance Vault',
      kicker: 'Documents · Score · Alerts',
      action: (
        <button
          onClick={() => setOpen(true)}
          className="helix-btn-primary inline-flex items-center gap-2"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add document</span>
          <span className="sm:hidden">Add</span>
        </button>
      ),
    });

    return () => {
      setHeader(null);
    };
  }, [setHeader]);

  // ── Loading skeleton
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <article className="flex md:flex-row flex-col gap-6">
        {/* ── Left col: score + missing + guides ── */}
        <div className="w-full md:max-w-75 space-y-4 h-full">
          <ComplianceScoreCard score={complianceData} />
        </div>

        {/* ── Right col: document vault ── */}
        <div className="w-full border-border rounded  border">
          <div className=" overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1A7A6E]/20">
              <div className="helix-label">Document Vault</div>
              <div className="helix-h3 mt-1">
                {complianceData.documentCount} document(s)
              </div>
            </div>

            {complianceData.documents.length === 0 ? (
              <div className="p-10 space-y-5 text-center text-muted">
                <p>No documents uploaded yet.</p>
                <button
                  onClick={() => setOpen(true)}
                  className="helix-btn-primary inline-flex items-center gap-2"
                >
                  <Plus size={14} />
                  <span className="hidden sm:inline">Add document</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="helix-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Authority</th>
                        <th>Issued</th>
                        <th>Expiry</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceData.documents.map((d) => (
                        <tr key={d.id} data-testid={`doc-${d.id}`}>
                          <td>
                            <div className="flex items-center gap-2">
                              <FileText
                                size={16}
                                className="text-primary shrink-0"
                              />
                              <span>{d.documentType}</span>
                            </div>
                          </td>
                          <td className="text-[12px]">{d.issuingAuthority}</td>
                          <td className="font-mono text-[12px] text-muted">
                            {formatDateToMM(d.issuedDate)}
                          </td>
                          <td className="font-mono text-[12px]">
                            {formatDateToMM(d.expiryDate)}
                          </td>
                          <td>
                            <StatusPill status={d.status} />
                          </td>
                          <td>
                            <button className="text-[#E74C3C] hover:text-[#ff8e82] transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-[#1A7A6E]/10">
                  {complianceData.documents.map((d) => (
                    <div key={d.id} className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 min-w-0">
                          <FileText
                            size={16}
                            className="text-primary shrink-0 mt-0.5"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-[13px] truncate">
                              {d.documentType}
                            </div>
                            <div className="text-[11px] text-muted truncate">
                              {d.fileName}
                            </div>
                          </div>
                        </div>
                        <button className="text-[#E74C3C] hover:text-[#ff8e82] shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pl-6">
                        <div className="text-[12px] text-muted">
                          {d.issuingAuthority}
                        </div>
                        <StatusPill status={d.status} />
                      </div>

                      <div className="flex gap-4 pl-6 text-[11px] font-mono text-muted">
                        <span>
                          Issued:{' '}
                          <span className="text-text">
                            {formatDateToMM(d.issuedDate)}
                          </span>
                        </span>
                        <span>
                          Exp:{' '}
                          <span
                            className={
                              d.status === 'expired'
                                ? 'text-[#E74C3C]'
                                : d.status === 'expiring_soon'
                                  ? 'text-primary'
                                  : 'text-text'
                            }
                          >
                            {formatDateToMM(d.expiryDate)}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
      <article className="grid md:grid-cols-2 gap-5 mt-6">
        <MissingDocsCard score={complianceData?.missingDocuments ?? []} />
        {complianceData?.importGuides?.map((cat) => (
          <RequirementsCard key={cat.title} cat={cat} />
        ))}
      </article>

      {/* ── Add document modal ── */}
      {open && <AddDocModal onClose={() => setOpen(false)} />}
    </>
  );
}
