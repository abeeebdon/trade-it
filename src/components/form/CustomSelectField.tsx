'use client';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type CustomSelectFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  error?: string;
  placeholder?: string;
  className?: string;
};

export default function CustomSelectField<T extends FieldValues>({
  label,
  name,
  control,
  options,
  error,
  placeholder,
  className,
}: CustomSelectFieldProps<T>) {
  return (
    <div>
      <label className="helix-label" htmlFor={String(name)}>
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id={String(name)}
            className={`helix-input ${className ?? ''}`}
            value={field.value ?? ''}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
