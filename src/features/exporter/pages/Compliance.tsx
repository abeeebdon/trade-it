'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, FileText, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useHeader } from '@/context/HeaderContext';
import type {
  ComplianceDocument,
  ComplianceScore,
  AddDocForm,
} from '../types/exporter';
import {
  mockComplianceDocuments,
  mockComplianceScore,
  mockRequirements,
} from '../components/data';
import ComplianceScoreCard from '../components/ComplianceScoreCard';
import MissingDocsCard from '../components/MissingDocsCard';
import RequirementsCard from '../components/RequirementsCard';
import AddDocModal from '../components/AddDocModal';

// ─── Compliance ───────────────────────────────────────────────────────────────────

export default function Compliance() {
  const { setHeader } = useHeader();

  const [docs, setDocs] = useState<ComplianceDocument[]>([]);
  const [score, setScore] = useState<ComplianceScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const load = () => {
    setTimeout(() => {
      setDocs(mockComplianceDocuments);
      setScore(mockComplianceScore);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    load();
  }, []);

  // ── Dynamic header with CTA button
  useEffect(() => {
    setHeader({
      title: 'Compliance Vault',
      kicker: 'Documents · Score · Alerts',
      action: (
        <button
          onClick={() => setOpen(true)}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="add-doc-btn"
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

  const del = (id: string) => {
    if (!window.confirm('Remove this document?')) return;
    setDocs((prev) => prev.filter((d) => d.id !== id));
    // Recalculate score mock — bump score up slightly when a doc is removed
    setScore((prev) =>
      prev ? { ...prev, score: Math.max(0, prev.score - 5) } : prev,
    );
    toast.success('Removed');
  };

  const handleSave = (form: AddDocForm) => {
    const newDoc: ComplianceDocument = {
      id: `doc-${Date.now()}`,
      ...form,
      status: 'pending',
    };
    setDocs((prev) => [newDoc, ...prev]);
    // Bump score when a new doc is added
    setScore((prev) =>
      prev
        ? {
            ...prev,
            score: Math.min(100, prev.score + 5),
            missing: prev.missing.filter((m) => m !== form.document_type),
          }
        : prev,
    );
  };

  // ── Loading skeleton
  if (loading) {
    return (
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="helix-card p-6 h-48 animate-pulse opacity-40" />
          <div className="helix-card p-6 h-32 animate-pulse opacity-40" />
        </div>
        <div className="lg:col-span-2">
          <div className="helix-card h-64 animate-pulse opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left col: score + missing + guides ── */}
        <div className="lg:col-span-1 space-y-4">
          <ComplianceScoreCard score={score} />
          <MissingDocsCard score={score} />
          {Object.entries(mockRequirements).map(([cat, req]) => (
            <RequirementsCard key={cat} category={cat} requirement={req} />
          ))}
        </div>

        {/* ── Right col: document vault ── */}
        <div className="lg:col-span-2">
          <div className="helix-card overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1A7A6E]/20">
              <div className="helix-label">Document Vault</div>
              <div className="helix-h3 mt-1">{docs.length} document(s)</div>
            </div>

            {docs.length === 0 ? (
              <div className="p-10 text-center text-[#9CA3AF]">
                No documents uploaded yet.
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
                      {docs.map((d) => (
                        <tr key={d.id} data-testid={`doc-${d.id}`}>
                          <td>
                            <div className="flex items-center gap-2">
                              <FileText
                                size={16}
                                className="text-[#C9922A] shrink-0"
                              />
                              <span>{d.document_type}</span>
                            </div>
                            <div className="text-[11px] text-[#9CA3AF] mt-0.5 pl-6">
                              {d.original_filename}
                            </div>
                          </td>
                          <td className="text-[12px]">{d.issuing_authority}</td>
                          <td className="font-mono text-[12px] text-[#9CA3AF]">
                            {formatDateTime(d.issued_date)}
                          </td>
                          <td className="font-mono text-[12px]">
                            {formatDateTime(d.expiry_date)}
                          </td>
                          <td>
                            <StatusPill status={d.status} />
                          </td>
                          <td>
                            <button
                              onClick={() => del(d.id)}
                              className="text-[#E74C3C] hover:text-[#ff8e82] transition-colors"
                              data-testid={`del-doc-${d.id}`}
                            >
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
                  {docs.map((d) => (
                    <div
                      key={d.id}
                      className="p-4 space-y-2"
                      data-testid={`doc-${d.id}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 min-w-0">
                          <FileText
                            size={16}
                            className="text-[#C9922A] shrink-0 mt-0.5"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-[13px] truncate">
                              {d.document_type}
                            </div>
                            <div className="text-[11px] text-[#9CA3AF] truncate">
                              {d.original_filename}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => del(d.id)}
                          className="text-[#E74C3C] hover:text-[#ff8e82] shrink-0"
                          data-testid={`del-doc-${d.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pl-6">
                        <div className="text-[12px] text-[#9CA3AF]">
                          {d.issuing_authority}
                        </div>
                        <StatusPill status={d.status} />
                      </div>

                      <div className="flex gap-4 pl-6 text-[11px] font-mono text-[#9CA3AF]">
                        <span>
                          Issued:{' '}
                          <span className="text-[#F5F5F5]">
                            {formatDateTime(d.issued_date)}
                          </span>
                        </span>
                        <span>
                          Exp:{' '}
                          <span
                            className={
                              d.status === 'expired'
                                ? 'text-[#E74C3C]'
                                : d.status === 'expiring_soon'
                                  ? 'text-[#C9922A]'
                                  : 'text-[#F5F5F5]'
                            }
                          >
                            {formatDateTime(d.expiry_date)}
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
      </div>

      {/* ── Add document modal ── */}
      {open && (
        <AddDocModal
          onClose={() => setOpen(false)}
          onSave={(form) => {
            handleSave(form);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
