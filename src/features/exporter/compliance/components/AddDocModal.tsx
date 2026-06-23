'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  addComplianceDocSchema,
  AddComplianceDocType,
} from '../types/validation';

import InputField from '@/components/form/InputFIeld';
import { useSubmitComplianceDoc } from '../hooks/useGetCompliance';

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
}

export default function AddDocModal({ onClose }: AddDocModalProps) {
  const { mutateAsync, isPending } = useSubmitComplianceDoc();
  const [File, setFile] = useState<File | null>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddComplianceDocType>({
    resolver: zodResolver(addComplianceDocSchema),
    defaultValues: {
      DocumentType: DOC_TYPES[0],
      IssuedDate: '',
      IssuingAuthority: '',
      ExpiryDate: '',
      file_url: '',
      original_filename: '',
    },
  });

  const fileName = watch('original_filename');

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue('original_filename', file.name, { shouldValidate: true });
    setFile(file);
    toast.success('File added successfully');
  };

  const save = async (form: AddComplianceDocType) => {
    if (!File) {
      toast.error('Please select a value');
      return;
    }
    const formData = {
      DocumentType: form.DocumentType,
      IssuingAuthority: form.IssuingAuthority,
      IssuedDate: new Date(form.IssuedDate).toISOString(),
      ExpiryDate: new Date(form.ExpiryDate).toISOString(),
      File: File,
    };
    try {
      await mutateAsync(formData, {
        onSuccess: () => {
          toast.success('Document uploaded');
          onClose();
        },
      });
    } catch (err) {
      toast.error('Failed to upload document');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card p-6 w-[90%] max-w-lg"
      >
        <h3 className="helix-h3">Add compliance document</h3>

        <form onSubmit={handleSubmit(save)} className="space-y-3 mt-4">
          {/* Document Type */}
          <div>
            <label className="helix-label">Document type</label>

            <select className="helix-input" {...register('DocumentType')}>
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {errors.DocumentType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.DocumentType.message}
              </p>
            )}
          </div>

          {/* Issuing Authority */}
          <InputField
            label="Issuing authority"
            placeholder="e.g. NAFDAC Nigeria"
            {...register('IssuingAuthority')}
            error={errors.IssuingAuthority?.message}
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Issued"
              type="date"
              {...register('IssuedDate')}
              error={errors.IssuedDate?.message}
            />

            <InputField
              label="Expires"
              type="date"
              {...register('ExpiryDate')}
              error={errors.ExpiryDate?.message}
            />
          </div>

          {/* File */}
          <div>
            <label className="helix-label">File</label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="helix-input"
              onChange={uploadFile}
            />

            {fileName && (
              <div className="text-[11px] text-[#1A7A6E] font-mono mt-1">
                ✓ {fileName}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="helix-btn-secondary flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="helix-btn-primary flex-1"
            >
              {isPending ? 'Saving…' : 'Save document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
