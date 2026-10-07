import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FormSectionProps = {
  title: string;
  /** Optional helper text shown under the title. */
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Bordered form section — visually matches the Shipping panel
 * (`ShippingForm`) so grouped fields stay consistent.
 */
export default function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <section className={cn('rounded-lg border border-border p-4', className)}>
      <h3 className="helix-h3">{title}</h3>

      {description ? (
        <p className="mt-1 text-xs text-muted">{description}</p>
      ) : null}

      <div className="mt-4">{children}</div>
    </section>
  );
}
