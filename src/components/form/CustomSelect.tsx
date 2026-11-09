'use client';

import { useId } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/cn';

export type CustomSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type CustomSelectSize = 'sm' | 'default';

type CustomSelectBaseProps = {
  /** Options rendered inside the dropdown. */
  options: CustomSelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  /** Control height — `sm` for compact toolbars/filters. */
  size?: CustomSelectSize;
  /** Class applied to the wrapping element. */
  className?: string;
  /** Class applied to the trigger button. */
  triggerClassName?: string;
  /** Class applied to the dropdown popup. */
  contentClassName?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Convert the value to a number when bound to a numeric form field. */
  valueType?: 'string' | 'number';
};

export type CustomSelectProps<T extends FieldValues = FieldValues> =
  CustomSelectBaseProps & {
    /** Controlled value (standalone usage). */
    value?: string | null;
    /** Uncontrolled initial value (standalone usage). */
    defaultValue?: string;
    /** Called with the newly selected value (standalone usage). */
    onValueChange?: (value: string) => void;
    /** Field name used for form submission or react-hook-form binding. */
    name?: Path<T>;
    /** Pass a react-hook-form control to bind this select to a form field. */
    control?: Control<T>;
  };

type SelectBaseProps = CustomSelectBaseProps & {
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
};

function SelectBase({
  options,
  placeholder,
  label,
  error,
  disabled,
  required,
  id,
  size = 'default',
  className,
  triggerClassName,
  contentClassName,
  align = 'start',
  side = 'bottom',
  value,
  defaultValue,
  onValueChange,
  name,
}: SelectBaseProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const isControlled = value !== undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="helix-label" htmlFor={selectId}>
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}

      <Select
        items={options}
        value={isControlled ? (value ?? null) : undefined}
        defaultValue={defaultValue}
        onValueChange={(nextValue) => onValueChange?.(nextValue ?? '')}
        name={name}
        required={required}
        disabled={disabled}
      >
        <SelectTrigger
          id={selectId}
          size={size}
          aria-invalid={Boolean(error)}
          className={cn(
            // Base look, aligned with the app's helix/form styling.
            'flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-bg-soft px-3.5 py-2.5 text-sm text-text outline-none transition-colors',
            'hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
            'data-[size=default]:h-auto data-[size=sm]:h-auto data-[size=sm]:px-3 data-[size=sm]:py-1.5',
            'data-placeholder:text-muted data-disabled:cursor-not-allowed data-disabled:opacity-50',
            'aria-invalid:border-danger',
            '[&_svg]:shrink-0 [&_svg]:text-muted',
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          align={align}
          side={side}
          sideOffset={6}
          alignItemWithTrigger={false}
          className={cn(
            'rounded-md border border-border bg-bg-soft p-1 text-text shadow-2xl',
            contentClassName,
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                'cursor-pointer rounded-sm px-2.5 py-2 text-sm text-text outline-none transition-colors',
                'data-highlighted:bg-surface data-highlighted:text-primary',
                'data-disabled:cursor-not-allowed data-disabled:opacity-50',
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}

/**
 * Single select component for the whole app.
 *
 * - Standalone: `<CustomSelect options={...} value={v} onValueChange={setV} />`
 * - React Hook Form: `<CustomSelect control={control} name="category" options={...} />`
 */
export default function CustomSelect<T extends FieldValues = FieldValues>({
  control,
  name,
  valueType = 'string',
  error,
  ...rest
}: CustomSelectProps<T>) {
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <SelectBase
            {...rest}
            name={undefined}
            value={field.value == null ? null : String(field.value)}
            onValueChange={(nextValue) =>
              field.onChange(
                valueType === 'number' ? Number(nextValue) : nextValue,
              )
            }
            error={error ?? fieldState.error?.message}
          />
        )}
      />
    );
  }

  return (
    <SelectBase {...rest} name={name as string | undefined} error={error} />
  );
}
