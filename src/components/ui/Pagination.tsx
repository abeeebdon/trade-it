type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  testid?: string;
};
export interface PaginateResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
  start: number;
  end: number;
}

export function paginate<T>(arr: T[] = [], page: number, perPage: number) {
  const total = Array.isArray(arr) ? arr.length : 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const slice = arr.slice(start, start + perPage);

  return {
    items: slice,
    page: safePage,
    totalPages,
    total,
    start,
    end: start + slice.length,
  };
}
export default function Pagination({
  page,
  totalPages,
  onChange,
  testid = 'pagination',
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = [];
  const window = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= window)
      pages.push(i);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return (
    <div
      className="flex items-center justify-center gap-1.5 mt-8 mb-2 flex-wrap"
      data-testid={testid}
    >
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1.5 text-[12px] rounded border border-secondary/30 text-muted hover:border-secondary disabled:opacity-40"
      >
        ‹ Prev
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-2 text-[12px] text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`min-w-8.5 px-2.5 py-1.5 text-[12px] rounded border ${p === page ? 'bg-primary text-bg border-primary font-semibold' : 'border-secondary/30 text-muted hover:border-secondary'}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1.5 text-[12px] rounded border border-secondary/30 text-muted hover:border-secondary disabled:opacity-40"
      >
        Next ›
      </button>
    </div>
  );
}
