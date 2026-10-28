'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  GripVertical,
  Minus,
  PackagePlus,
  Plus,
  Trash2,
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */

export type VariantOptionValue = {
  id: string;
  value: string;
};

export type VariantOption = {
  id: string;
  name: string;
  values: VariantOptionValue[];
};

export type ProductVariant = {
  /** Stable key built from the option combination. */
  id: string;
  /** option name -> selected value, e.g. `{ size: 'sm', color: 'red' }` */
  combination: Record<string, string>;
  price: number;
  available: number;
};

export type VariantFormValues = {
  options: VariantOption[];
  variants: ProductVariant[];
};

type VariantComponentProps = {
  /** Pass together with `onChange` to control the component from a form. */
  value?: VariantFormValues;
  onChange?: (value: VariantFormValues) => void;
  currencySymbol?: string;
  className?: string;
};

type VariantPatch = { price?: number; available?: number };

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */

let idCounter = 0;
const uid = (prefix: string) => `${prefix}-${++idCounter}`;

const variantKey = (combination: Record<string, string>) =>
  Object.keys(combination)
    .sort()
    .map((name) => `${name}:${combination[name]}`)
    .join('|');

/** Builds the cartesian product of every option value pair. */
const buildVariants = (
  options: VariantOption[],
  previous: ProductVariant[],
): ProductVariant[] => {
  const usable = options.filter(
    (option) => option.name.trim() && option.values.length > 0,
  );

  if (!usable.length) return [];

  let combinations: Record<string, string>[] = [{}];

  for (const option of usable) {
    const name = option.name.trim();
    const next: Record<string, string>[] = [];

    for (const combination of combinations) {
      for (const value of option.values) {
        next.push({ ...combination, [name]: value.value });
      }
    }

    combinations = next;
  }

  const previousByKey = new Map(
    previous.map((variant) => [variantKey(variant.combination), variant]),
  );

  return combinations.map((combination) => {
    const key = variantKey(combination);
    const existing = previousByKey.get(key);

    return {
      id: key,
      combination,
      price: existing?.price ?? 0,
      available: existing?.available ?? 0,
    };
  });
};

const toNumber = (raw: string) => {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

// Show the placeholder instead of a leading "0".
const numberValue = (value: number) => (value === 0 ? '' : String(value));

/** The only option types an exporter can add. */
const OPTION_PRESETS = [
  { name: 'color', label: 'Color' },
  { name: 'size', label: 'Size' },
] as const;

/** Nothing is pre-selected — variants only exist once options are added. */
export const variantDefaults = (): VariantFormValues => ({
  options: [],
  variants: [],
});

/* ─────────────────────────────────────────────────────────────
   Selection box
   ───────────────────────────────────────────────────────────── */

function SelectionBox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  const active = checked || indeterminate;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'grid size-4 shrink-0 place-items-center rounded-[3px] border transition-colors',
        active
          ? 'border-[var(--helix-gold)] bg-[var(--helix-gold)] text-[var(--helix-navy)]'
          : 'border-border text-transparent hover:border-[var(--helix-gold)]',
      )}
    >
      {indeterminate ? (
        <Minus className="size-3" />
      ) : checked ? (
        <Check className="size-3" />
      ) : null}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Add option dropdown
   ───────────────────────────────────────────────────────────── */

function AddOptionMenu({
  label,
  addedNames,
  onAdd,
}: {
  label: string;
  addedNames: string[];
  onAdd: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const available = OPTION_PRESETS.filter(
    (preset) => !addedNames.includes(preset.name),
  );

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--helix-hover)]"
      >
        <Plus className="size-3.5" />
        {label}
        <ChevronDown
          className={cn('size-3 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-30 mt-1 w-40 overflow-hidden rounded-md border border-border bg-[var(--helix-surface)] py-1 text-left shadow-xl"
        >
          {available.length === 0 ? (
            <p className="px-3 py-2 text-[11px] text-muted">
              Color and size already added
            </p>
          ) : (
            available.map((preset) => (
              <button
                key={preset.name}
                type="button"
                role="menuitem"
                onClick={() => {
                  onAdd(preset.name);
                  setOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-[var(--helix-hover)]"
              >
                <Plus className="size-3.5 text-muted" />
                {preset.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */

const VariantComponent = ({
  value,
  onChange,
  currencySymbol = '$',
  className,
}: VariantComponentProps) => {
  const [internal, setInternal] = useState<VariantFormValues>(variantDefaults);

  const form = value ?? internal;
  const { options, variants } = form;

  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [valueEditorFor, setValueEditorFor] = useState<Record<string, boolean>>(
    {},
  );
  const [groupById, setGroupById] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkPrice, setBulkPrice] = useState('');
  const [bulkAvailable, setBulkAvailable] = useState('');

  const commit = (next: VariantFormValues) => {
    if (!value) setInternal(next);
    onChange?.(next);
  };

  const commitOptions = (nextOptions: VariantOption[]) =>
    commit({
      options: nextOptions,
      variants: buildVariants(nextOptions, variants),
    });

  /* Option handlers */

  const addOption = (name: string) => {
    const normalized = name.trim().toLowerCase();
    const exists = options.some(
      (option) => option.name.trim().toLowerCase() === normalized,
    );
    if (exists) return;

    commitOptions([
      ...options,
      { id: uid('opt'), name: normalized, values: [] },
    ]);
  };

  const renameOption = (id: string, name: string) => {
    commitOptions(
      options.map((option) =>
        option.id === id ? { ...option, name } : option,
      ),
    );
  };

  const removeOption = (id: string) => {
    commitOptions(options.filter((option) => option.id !== id));
  };

  const addValue = (optionId: string) => {
    const raw = (drafts[optionId] ?? '').trim();
    if (!raw) return;

    commitOptions(
      options.map((option) => {
        if (option.id !== optionId) return option;

        const exists = option.values.some(
          (entry) => entry.value.toLowerCase() === raw.toLowerCase(),
        );
        if (exists) return option;

        return {
          ...option,
          values: [...option.values, { id: uid('val'), value: raw }],
        };
      }),
    );

    setDrafts((current) => ({ ...current, [optionId]: '' }));
    setValueEditorFor((current) => ({ ...current, [optionId]: false }));
  };

  const removeValue = (optionId: string, valueId: string) => {
    commitOptions(
      options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.filter((entry) => entry.id !== valueId),
            }
          : option,
      ),
    );
  };

  /* Variant handlers */

  const updateVariants = (ids: string[], patch: VariantPatch) => {
    const idSet = new Set(ids);

    commit({
      options,
      variants: variants.map((variant) =>
        idSet.has(variant.id) ? { ...variant, ...patch } : variant,
      ),
    });
  };

  const toggleSelected = (ids: string[]) => {
    setSelected((current) => {
      const allSelected = ids.every((id) => current.includes(id));

      if (allSelected) return current.filter((id) => !ids.includes(id));
      return Array.from(new Set([...current, ...ids]));
    });
  };

  const applyBulk = () => {
    const patch: VariantPatch = {};

    if (bulkPrice.trim() !== '') {
      patch.price = Math.max(0, toNumber(bulkPrice));
    }
    if (bulkAvailable.trim() !== '') {
      patch.available = Math.max(0, Math.floor(toNumber(bulkAvailable)));
    }
    if (!Object.keys(patch).length) return;

    updateVariants(selected, patch);
    setBulkPrice('');
    setBulkAvailable('');
  };

  /* Grouping + filtering */

  const optionNames = useMemo(
    () => options.map((option) => option.name.trim().toLowerCase()),
    [options],
  );

  const canAddMore = OPTION_PRESETS.some(
    (preset) => !optionNames.includes(preset.name),
  );

  const groupOptions = useMemo(
    () =>
      options.filter((option) => option.name.trim() && option.values.length),
    [options],
  );

  const groupOption =
    groupOptions.find((option) => option.id === groupById) ??
    groupOptions[0] ??
    null;

  const groups = useMemo(() => {
    const map = new Map<string, ProductVariant[]>();

    for (const variant of variants) {
      const key = groupOption
        ? (variant.combination[groupOption.name.trim()] ?? '—')
        : 'All variants';

      const bucket = map.get(key);
      if (bucket) bucket.push(variant);
      else map.set(key, [variant]);
    }

    return Array.from(map, ([key, items]) => ({ key, variants: items }));
  }, [variants, groupOption]);

  const totalAvailable = useMemo(
    () => variants.reduce((sum, variant) => sum + variant.available, 0),
    [variants],
  );

  const isSelected = (id: string) => selected.includes(id);

  const commonPrice = (items: ProductVariant[]) => {
    if (!items.length) return 0;
    return items.every((item) => item.price === items[0].price)
      ? items[0].price
      : null;
  };

  const variantLabel = (variant: ProductVariant) => {
    const entries = Object.entries(variant.combination).filter(
      ([name]) => !groupOption || name !== groupOption.name.trim(),
    );

    const parts = entries.length
      ? entries.map(([, val]) => val)
      : Object.values(variant.combination);

    return parts.join(' / ');
  };

  const allVariantIds = useMemo(
    () => variants.map((variant) => variant.id),
    [variants],
  );

  return (
    <section className={cn('rounded-lg border border-border', className)}>
      <article className="border-b border-border px-4 py-3">
        <h3 className="helix-h3">Variants</h3>
        <p className="mt-1 text-xs text-muted">
          Pick the options customers can choose from, colors and size
        </p>
      </article>

      <div className="p-4">
        <div className="rounded-lg border border-border">
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                className="flex flex-wrap items-center gap-3 border-b border-border-soft p-3"
              >
                <div className="max-w-28 w-full border text-sm text-center rounded shrink-0">
                  <p>{option.name}</p>
                </div>

                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  {option.values.map((entry, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-text"
                    >
                      {entry.value}
                      <button
                        type="button"
                        onClick={() => removeValue(option.id, entry.id)}
                        aria-label={`Remove ${entry.value}`}
                        className="text-muted transition-colors hover:text-danger"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1">
                    {option.values.length === 0 || valueEditorFor[option.id] ? (
                      <div className="flex items-center gap-1">
                        <div className="w-28">
                          <input
                            autoFocus={valueEditorFor[option.id] === true}
                            value={drafts[option.id] ?? ''}
                            onChange={(event) =>
                              setDrafts((current) => ({
                                ...current,
                                [option.id]: event.target.value,
                              }))
                            }
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                                addValue(option.id);
                              }

                              if (event.key === 'Escape') {
                                setDrafts((current) => ({
                                  ...current,
                                  [option.id]: '',
                                }));
                                setValueEditorFor((current) => ({
                                  ...current,
                                  [option.id]: false,
                                }));
                              }
                            }}
                            placeholder="Add value"
                            aria-label={`Add value to ${option.name || 'option'}`}
                            className="helix-input text-xs"
                          />
                        </div>
                        {!valueEditorFor[option.id] && (
                          <button
                            type="button"
                            onClick={() => addValue(option.id)}
                            className="grid size-7 shrink-0 place-items-center rounded border border-border text-muted transition-colors "
                          >
                            <Plus className="size-3.5" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setValueEditorFor((current) => ({
                            ...current,
                            [option.id]: true,
                          }))
                        }
                        aria-label={`Add another value to ${
                          option.name || 'option'
                        }`}
                        className="grid size-7 shrink-0 place-items-center rounded border border-dashed border-border text-muted transition-colors "
                      >
                        <Plus className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  aria-label={`Remove ${option.name || 'option'}`}
                  className="ml-auto grid size-7 place-items-center rounded text-muted transition-colors hover:text-danger"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}

            {options.length === 0 ? (
              <li className="border-b border-border-soft px-3 py-4 text-center text-xs text-muted">
                <div className="flex justify-center">
                  <AddOptionMenu
                    label="Add options like size and color"
                    addedNames={optionNames}
                    onAdd={addOption}
                  />
                </div>
                <p>You can add options of color and size </p>
              </li>
            ) : canAddMore ? (
              <li className="p-2">
                <AddOptionMenu
                  label="Add another option"
                  addedNames={optionNames}
                  onAdd={addOption}
                />
              </li>
            ) : null}
          </ul>
        </div>

        {/* Step 2 — set price & availability per variant */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-text">
              Price &amp; availability
            </h4>
            <span className="text-[11px] text-muted">
              {variants.length} variant{variants.length === 1 ? '' : 's'}
            </span>
          </div>

          {variants.length === 0 ? (
            <div className="mt-3 rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted">
              Add at least one value to your options to generate variants.
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted">Group by</span>
                  <div className="relative w-32">
                    <select
                      value={groupOption?.id ?? ''}
                      onChange={(event) => setGroupById(event.target.value)}
                      aria-label="Group variants by"
                      className="helix-input appearance-none text-xs"
                      style={{ paddingRight: '1.9rem' }}
                    >
                      {groupOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted" />
                  </div>
                </div>
              </div>

              {/* Bulk edit bar */}
              {selected.length > 0 && (
                <article className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2">
                  <span className="text-xs font-medium text-text">
                    {selected.length} selected
                  </span>

                  <div className="w-24">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="0.01"
                      value={bulkPrice}
                      onChange={(event) => setBulkPrice(event.target.value)}
                      placeholder="Price"
                      aria-label="Bulk price"
                      className="helix-input text-xs"
                    />
                  </div>

                  <div className="w-24">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step="1"
                      value={bulkAvailable}
                      onChange={(event) => setBulkAvailable(event.target.value)}
                      placeholder="Available"
                      aria-label="Bulk available"
                      className="helix-input text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={applyBulk}
                    className="rounded bg-[var(--helix-gold)] px-3 py-1.5 text-xs font-semibold text-[var(--helix-navy)] transition-colors hover:bg-[var(--helix-gold-dim)]"
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="text-xs text-muted transition-colors hover:text-text"
                  >
                    Clear
                  </button>
                </article>
              )}

              {/* Table */}
              <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                <div className="min-w-[34rem]">
                  {/* Head */}
                  <div className="grid grid-cols-[auto_1fr_7rem_7rem_2rem] items-center gap-3 border-b border-border bg-[var(--helix-navy)] px-3 py-2 text-[10px] tracking-[0.12em] text-muted uppercase">
                    <SelectionBox
                      checked={
                        allVariantIds.length > 0 &&
                        allVariantIds.every(isSelected)
                      }
                      indeterminate={
                        selected.length > 0 && !allVariantIds.every(isSelected)
                      }
                      onChange={() => toggleSelected(allVariantIds)}
                      label="Select all variants"
                    />
                    <span>Variant</span>
                    <span>Price</span>
                    <span>Available</span>
                    <span />
                  </div>

                  {groups.map((group) => {
                    const groupIds = group.variants.map(
                      (variant) => variant.id,
                    );
                    const groupTotal = group.variants.reduce(
                      (sum, variant) => sum + variant.available,
                      0,
                    );
                    const price = commonPrice(group.variants);
                    const isOpen = !!expanded[group.key];
                    const allSelected = groupIds.every(isSelected);
                    const someSelected = groupIds.some(isSelected);

                    return (
                      <div
                        key={group.key}
                        className="border-b border-border-soft last:border-b-0"
                      >
                        {/* Group row */}
                        <div className="grid grid-cols-[auto_1fr_7rem_7rem_2rem] items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[var(--helix-hover)]">
                          <SelectionBox
                            checked={allSelected}
                            indeterminate={someSelected && !allSelected}
                            onChange={() => toggleSelected(groupIds)}
                            label={`Select ${group.key} variants`}
                          />

                          <div className="flex min-w-0 items-center gap-2">
                            <PackagePlus
                              className="size-4 shrink-0 text-muted"
                              aria-hidden
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="truncate text-sm text-text">
                                  {group.key}
                                </span>
                                <span
                                  className="size-1.5 shrink-0 rounded-full bg-[var(--helix-teal)]"
                                  aria-hidden
                                />
                              </div>
                              <p className="text-[11px] text-muted">
                                {group.variants.length} variant
                                {group.variants.length === 1 ? '' : 's'}
                              </p>
                            </div>
                          </div>

                          {/* Bulk price for the whole group */}
                          <div className="relative">
                            <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-muted">
                              {currencySymbol}
                            </span>
                            <input
                              type="number"
                              inputMode="decimal"
                              min={0}
                              step="0.01"
                              value={numberValue(price ?? 0)}
                              placeholder={price === null ? 'Mixed' : '0.00'}
                              aria-label={`Price for ${group.key}`}
                              onChange={(event) =>
                                updateVariants(groupIds, {
                                  price: Math.max(
                                    0,
                                    toNumber(event.target.value),
                                  ),
                                })
                              }
                              className="helix-input text-xs"
                              style={{ paddingLeft: '1.75rem' }}
                            />
                          </div>

                          <div className="helix-input flex items-center text-xs text-text opacity-80">
                            {groupTotal}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setExpanded((current) => ({
                                ...current,
                                [group.key]: !current[group.key],
                              }))
                            }
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${group.key} variants`}
                            className="grid size-7 place-items-center rounded text-muted transition-colors hover:text-text"
                          >
                            <ChevronDown
                              className={cn(
                                'size-4 transition-transform',
                                isOpen && 'rotate-180',
                              )}
                            />
                          </button>
                        </div>

                        {/* Individual variants */}
                        {isOpen &&
                          group.variants.map((variant) => (
                            <div
                              key={variant.id}
                              className="grid grid-cols-[auto_1fr_7rem_7rem_2rem] items-center gap-3 border-t border-border-soft py-2 pr-3 pl-6"
                            >
                              <SelectionBox
                                checked={isSelected(variant.id)}
                                onChange={() => toggleSelected([variant.id])}
                                label={`Select ${variantLabel(variant)}`}
                              />

                              <span className="truncate text-xs text-muted">
                                {variantLabel(variant)}
                              </span>

                              <div className="relative">
                                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-muted">
                                  {currencySymbol}
                                </span>
                                <input
                                  type="number"
                                  inputMode="decimal"
                                  min={0}
                                  step="0.01"
                                  value={numberValue(variant.price)}
                                  placeholder="0.00"
                                  aria-label={`Price for ${variantLabel(
                                    variant,
                                  )}`}
                                  onChange={(event) =>
                                    updateVariants([variant.id], {
                                      price: Math.max(
                                        0,
                                        toNumber(event.target.value),
                                      ),
                                    })
                                  }
                                  className="helix-input text-xs"
                                  style={{ paddingLeft: '1.75rem' }}
                                />
                              </div>

                              <input
                                type="number"
                                inputMode="numeric"
                                min={0}
                                step="1"
                                value={numberValue(variant.available)}
                                placeholder="0"
                                aria-label={`Available for ${variantLabel(
                                  variant,
                                )}`}
                                onChange={(event) =>
                                  updateVariants([variant.id], {
                                    available: Math.max(
                                      0,
                                      Math.floor(toNumber(event.target.value)),
                                    ),
                                  })
                                }
                                className="helix-input text-xs"
                              />

                              <span />
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-3 text-xs text-muted">
                Total inventory across all locations:{' '}
                <span className="font-medium text-text">
                  {totalAvailable} available
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VariantComponent;
