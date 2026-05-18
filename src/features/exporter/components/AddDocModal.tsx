'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { AddDocForm } from '../types/exporter';

const DOC_TYPES = [
  'SON Certification',
  'NAFDAC',
  'Phytosanitary Certificate',
  'Fumigation Certificate',
  'FSSAI / FDA Equivalence',
  'Halal Certification',
  'Country of Origin Label',
  'Other',
];

interface AddDocModalProps {
  onClose: () => void;
  onSave: (doc: AddDocForm) => void;
}

export default function AddDocModal({ onClose, onSave }: AddDocModalProps) {
  const [form, setForm] = useState<AddDocForm>({
    document_type: DOC_TYPES[0],
    issuing_authority: '',
    issued_date: '',
    expiry_date: '',
    file_url: '',
    original_filename: '',
  });
  const [busy, setBusy] = useState(false);

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Mock upload — replace with real API call when backend is ready
    const mockUrl = URL.createObjectURL(file);
    setForm((f) => ({
      ...f,
      file_url: mockUrl,
      original_filename: file.name,
    }));
    toast.success('File selected');
  };

  const save = async () => {
    if (!form.document_type || !form.issuing_authority) {
      toast.error('Please fill in all required fields');
      return;
    }
    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      onSave(form);
      toast.success('Document added');
      onClose();
    } catch {
      toast.error('Failed to add document');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card p-6 w-full max-w-md"
        data-testid="add-doc-modal"
      >
        <h3 className="helix-h3">Add compliance document</h3>

        <div className="space-y-3 mt-4">
          {/* Type */}
          <div>
            <label className="helix-label">Document type</label>
            <select
              className="helix-input"
              value={form.document_type}
              onChange={(e) =>
                setForm({ ...form, document_type: e.target.value })
              }
              data-testid="doc-type"
            >
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Issuing authority */}
          <div>
            <label className="helix-label">Issuing authority</label>
            <input
              className="helix-input"
              placeholder="e.g. NAFDAC Nigeria"
              value={form.issuing_authority}
              onChange={(e) =>
                setForm({ ...form, issuing_authority: e.target.value })
              }
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="helix-label">Issued</label>
              <input
                type="date"
                className="helix-input"
                value={form.issued_date}
                onChange={(e) =>
                  setForm({ ...form, issued_date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="helix-label">Expires</label>
              <input
                type="date"
                className="helix-input"
                value={form.expiry_date}
                onChange={(e) =>
                  setForm({ ...form, expiry_date: e.target.value })
                }
              />
            </div>
          </div>

          {/* File upload */}
          <div>
            <label className="helix-label">File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="helix-input"
              onChange={upload}
              data-testid="doc-file"
            />
            {form.original_filename && (
              <div className="text-[11px] text-[#1A7A6E] font-mono mt-1">
                ✓ {form.original_filename}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="helix-btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={busy}
              className="helix-btn-primary flex-1"
              data-testid="doc-save"
            >
              {busy ? 'Saving…' : 'Save document'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
