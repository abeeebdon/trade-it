'use client';

import { forwardRef } from 'react';

type SelectFieldProps = {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
};

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, name, error, children, ...rest }, ref) => {
    return (
      <div>
        <label className="helix-label" htmlFor={name}>
          {label}
        </label>

        <select
          id={name}
          name={name}
          ref={ref}
          className="helix-input"
          {...rest}
        >
          {children}
        </select>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';

export default SelectField;
