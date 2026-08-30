'use client';

interface ExporterOrderSearchFilterProps {
  productName: string;
  status: string;
  onProductNameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'pending_payment', label: 'Pending payment' },
  { value: 'paid', label: 'Paid' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function ExporterOrderSearchFilter({
  productName,
  status,
  onProductNameChange,
  onStatusChange,
  onClear,
}: ExporterOrderSearchFilterProps) {
  return (
    <article className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        value={productName}
        onChange={(event) => onProductNameChange(event.target.value)}
        placeholder="Search ..."
        className="w-full max-w-sm rounded-xl border border-border/90  px-3 py-2.5 text-sm text-text placeholder:text-[#9CA3AF] outline-none transition focus:border-[#C9922A]"
      />
      <section className="flex items-center gap-4">
        <div className="md:w-52">
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full rounded-xl border border-border/90  px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
          >
            {statusOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:self-end">
          <button
            type="button"
            onClick={onClear}
            className="w-full md:w-auto rounded-xl border border-[#C9922A]/40 bg-[#C9922A]/10 px-3 py-2.5 text-sm text-[#F5C96B] transition hover:bg-[#C9922A]/20"
          >
            Clear filters
          </button>
        </div>
      </section>
    </article>
  );
}
