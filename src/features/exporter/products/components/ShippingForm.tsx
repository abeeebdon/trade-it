'use client';

import { ChevronDown, Package } from 'lucide-react';
import { useState } from 'react';

import {
  shippingDefaults,
  type ShippingFormValues,
} from '@/features/authentication/components/validation';
import { cn } from '@/lib/utils';

type ShippingFormProps = {
  value?: ShippingFormValues;
  onChange?: (value: ShippingFormValues) => void;
  className?: string;
};

const PACKAGE_OPTIONS = [
  {
    value: 'store-default-sample-box',
    label: 'Store default • Sample box - 8.6 × 5.4 × 1.6 in, 0 lb',
  },
  {
    value: 'store-default-medium-box',
    label: 'Store default • Medium box - 12 × 10 × 6 in, 1 lb',
  },
  {
    value: 'store-default-large-box',
    label: 'Store default • Large box - 18 × 14 × 10 in, 2 lb',
  },
  { value: 'custom', label: 'Custom package' },
];

const DIMENSION_UNITS = ['in', 'cm', 'mm'];
const WEIGHT_UNITS = ['lb', 'kg', 'g'];

const toNumber = (raw: string) => {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

// Show the placeholder instead of a leading "0".
const numberValue = (value: number) => (value === 0 ? '' : String(value));

function SizeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">{label}</span>
      <div className="w-20">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step="0.1"
          placeholder="0.0"
          aria-label={`${label} size`}
          value={numberValue(value)}
          onChange={(event) => onChange(toNumber(event.target.value))}
          className="helix-input"
        />
      </div>
    </div>
  );
}

const ShippingForm = ({ value, onChange, className }: ShippingFormProps) => {
  const shipping = value ?? shippingDefaults;
  const [showDetails, setShowDetails] = useState(false);

  const update = (patch: Partial<ShippingFormValues>) => {
    onChange?.({ ...shipping, ...patch });
  };

  return (
    <section className={cn('rounded-lg border border-border p-4', className)}>
      {/* Header */}
      <h3 className="helix-h3">Shipping</h3>

      <fieldset
        disabled={!shipping.isPhysical}
        className={cn(
          'mt-4 flex flex-col gap-4 border-none transition-opacity',
          !shipping.isPhysical && 'opacity-50',
        )}
      >
        {/* Package when shipped alone */}
        <div>
          <label className="helix-label" htmlFor="shipping-package">
            Package when shipped alone
          </label>
          <div className="relative">
            <Package className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <select
              id="shipping-package"
              value={shipping.packageId}
              onChange={(event) => update({ packageId: event.target.value })}
              // Inline padding: `.helix-input` is unlayered and would beat
              // Tailwind's padding utilities (which live in a cascade layer).
              style={{ paddingLeft: '2.25rem', paddingRight: '2.25rem' }}
              className="helix-input appearance-none"
            >
              {PACKAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {/* Packed product size */}
        <div>
          <span className="helix-label">Packed product size</span>
          <div className="flex flex-wrap items-center gap-2">
            <SizeInput
              label="L"
              value={shipping.length}
              onChange={(length) => update({ length })}
            />
            <span className="text-muted">×</span>
            <SizeInput
              label="W"
              value={shipping.width}
              onChange={(width) => update({ width })}
            />
            <span className="text-muted">×</span>
            <SizeInput
              label="H"
              value={shipping.height}
              onChange={(height) => update({ height })}
            />
            <div className="w-20">
              <select
                aria-label="Dimension unit"
                value={shipping.dimensionUnit}
                onChange={(event) =>
                  update({ dimensionUnit: event.target.value })
                }
                className="helix-input"
              >
                {DIMENSION_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="helix-label" htmlFor="shipping-weight">
            Weight
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <input
                id="shipping-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                placeholder="0.0"
                value={numberValue(shipping.weight)}
                onChange={(event) =>
                  update({ weight: toNumber(event.target.value) })
                }
                className="helix-input"
              />
            </div>
            <div className="w-20">
              <select
                aria-label="Weight unit"
                value={shipping.weightUnit}
                onChange={(event) => update({ weightUnit: event.target.value })}
                className="helix-input"
              >
                {WEIGHT_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible customs details */}
        <div className="border-t border-border pt-3">
          <button
            type="button"
            onClick={() => setShowDetails((previous) => !previous)}
            aria-expanded={showDetails}
            className="flex w-full cursor-pointer items-center justify-between gap-3"
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text">
                Country of origin
                {shipping.countryOfOrigin
                  ? `: ${shipping.countryOfOrigin}`
                  : ''}
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text">
                HS Code{shipping.hsCode ? `: ${shipping.hsCode}` : ''}
              </span>
            </span>
            <ChevronDown
              className={cn(
                'size-4 shrink-0 text-muted transition-transform',
                showDetails && 'rotate-180',
              )}
            />
          </button>

          {showDetails ? (
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <label className="helix-label" htmlFor="shipping-origin">
                  Country of origin
                </label>
                <input
                  id="shipping-origin"
                  type="text"
                  placeholder="e.g. Nigeria"
                  value={shipping.countryOfOrigin}
                  onChange={(event) =>
                    update({ countryOfOrigin: event.target.value })
                  }
                  className="helix-input"
                />
              </div>
              <div>
                <label className="helix-label" htmlFor="shipping-hs-code">
                  HS Code
                </label>
                <input
                  id="shipping-hs-code"
                  type="text"
                  placeholder="e.g. 1207.40"
                  value={shipping.hsCode}
                  onChange={(event) => update({ hsCode: event.target.value })}
                  className="helix-input"
                />
              </div>
            </div>
          ) : null}
        </div>
      </fieldset>
    </section>
  );
};

export default ShippingForm;
