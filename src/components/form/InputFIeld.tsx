'use client';

import { forwardRef } from 'react';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type = 'text', placeholder, error, ...rest }, ref) => {
    return (
      <div>
        <label className="helix-label" htmlFor={name}>
          {label}
        </label>

        <input
          id={name}
          name={name}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="helix-input"
          {...rest}
        />

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
