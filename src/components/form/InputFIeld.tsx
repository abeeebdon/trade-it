'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type = 'text', placeholder, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';

    return (
      <div>
        <label className="helix-label" htmlFor={name}>
          {label}
        </label>

        <div className="relative">
          <input
            id={name}
            name={name}
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            placeholder={placeholder}
            className="helix-input pr-10"
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
