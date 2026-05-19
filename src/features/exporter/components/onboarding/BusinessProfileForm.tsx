'use client';

import { ArrowRight } from 'lucide-react';
import type { BusinessForm } from '../../types/exporter';

const SECTORS = [
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

interface BusinessProfileFormProps {
  form: BusinessForm;
  onChange: (key: keyof BusinessForm, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="helix-label">{label}</label>
      {children}
    </div>
  );
}

export default function BusinessProfileForm({
  form,
  onChange,
  onSubmit,
}: BusinessProfileFormProps) {
  const upd =
    (k: keyof BusinessForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(k, e.target.value);

  const isNigeriaBusiness =
    form.country === 'Nigeria' && form.registration_type === 'business';
  const isNigeriaIndividual =
    form.country === 'Nigeria' && form.registration_type === 'individual';
  const isUS = form.country === 'United States';

  return (
    <form
      onSubmit={onSubmit}
      className="helix-card p-6 space-y-5 fade-up"
      data-testid="biz-create-form"
    >
      <h2 className="helix-h3">Create your business profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Business name */}
        <Field label="Business name">
          <input
            data-testid="biz-name"
            className="helix-input"
            value={form.business_name}
            onChange={upd('business_name')}
            required
          />
        </Field>

        {/* Registration type */}
        <Field label="Registration type">
          <select
            data-testid="biz-type"
            className="helix-input"
            value={form.registration_type}
            onChange={upd('registration_type')}
          >
            <option value="business">Business Entity</option>
            <option value="individual">Individual</option>
          </select>
        </Field>

        {/* Country */}
        <Field label="Country">
          <select
            data-testid="biz-country"
            className="helix-input"
            value={form.country}
            onChange={upd('country')}
          >
            <option>Nigeria</option>
            <option>United States</option>
            <option>Ghana</option>
            <option>Kenya</option>
            <option>South Africa</option>
          </select>
        </Field>

        {/* Sector */}
        <Field label="Sector">
          <select
            data-testid="biz-sector"
            className="helix-input"
            value={form.sector}
            onChange={upd('sector')}
          >
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        {/* Contact phone */}
        <Field label="Contact phone">
          <input
            className="helix-input"
            value={form.contact_phone}
            onChange={upd('contact_phone')}
            placeholder="+234 801 234 5678"
          />
        </Field>

        {/* Contact email */}
        <Field label="Contact email">
          <input
            type="email"
            className="helix-input"
            value={form.contact_email}
            onChange={upd('contact_email')}
          />
        </Field>

        {/* Address */}
        <Field label="Address" full>
          <input
            className="helix-input"
            value={form.address}
            onChange={upd('address')}
            placeholder="Street, City, State"
          />
        </Field>

        {/* Nigeria business fields */}
        {isNigeriaBusiness && (
          <>
            <Field label="CAC Number">
              <input
                className="helix-input"
                value={form.cac_number}
                onChange={upd('cac_number')}
                placeholder="RC-XXXXXXX"
              />
            </Field>
            <Field label="TIN">
              <input
                className="helix-input"
                value={form.tin}
                onChange={upd('tin')}
              />
            </Field>
            <Field label="Director Name">
              <input
                className="helix-input"
                value={form.director_name}
                onChange={upd('director_name')}
              />
            </Field>
          </>
        )}

        {/* Nigeria individual fields */}
        {isNigeriaIndividual && (
          <>
            <Field label="BVN (11 digits)">
              <input
                className="helix-input"
                value={form.bvn}
                onChange={upd('bvn')}
                maxLength={11}
              />
            </Field>
            <Field label="NIN">
              <input
                className="helix-input"
                value={form.nin}
                onChange={upd('nin')}
              />
            </Field>
          </>
        )}

        {/* US EIN */}
        {isUS && (
          <Field label="EIN (9 digits)">
            <input
              className="helix-input"
              value={form.ein}
              onChange={upd('ein')}
              placeholder="XX-XXXXXXX"
            />
          </Field>
        )}
      </div>

      <button
        data-testid="biz-submit"
        type="submit"
        className="helix-btn-primary inline-flex items-center gap-2"
      >
        Continue <ArrowRight size={14} />
      </button>
    </form>
  );
}
