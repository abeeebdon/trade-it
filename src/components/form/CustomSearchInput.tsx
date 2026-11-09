import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CustomSearchInputProps {
  /** Controlled value. Omit to use `defaultValue` (uncontrolled). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function CustomSearchInput({
  value,
  defaultValue,
  onChange,
  placeholder = 'Search...',
  className = '',
  inputClassName = '',
  id,
  name,
  disabled = false,
  ariaLabel,
}: CustomSearchInputProps) {
  const valueProps = value === undefined ? { defaultValue } : { value };

  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 rounded-lg border border-border/60 bg-bg-soft px-3.5 py-2.5 text-sm text-text transition-colors',
        'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <Search size={15} className="shrink-0 text-muted pointer-events-none" />

      <input
        {...valueProps}
        id={id}
        name={name}
        type="search"
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={cn(
          'w-full border-none bg-transparent text-sm text-text outline-none placeholder:text-muted',
          inputClassName,
        )}
      />
    </div>
  );
}

export default CustomSearchInput;
