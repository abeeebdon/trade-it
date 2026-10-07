import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <article className="flex items-center justify-center gap-2">
      <button
        onClick={() => page > 1 && onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded border border-secondary/40 cursor-pointer text-muted hover:border-secondary hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 rounded text-[12px] font-mono border transition ${
            p === page
              ? 'bg-primary text-text border-primary font-bold'
              : 'bg-transparent text-muted border-secondary/40 hover:border-text hover:text-text cursor-pointer'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => page < totalPages && onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded border border-secondary/40 text-muted hover:border-secondary hover:text-text disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={14} />
      </button>
    </article>
  );
}

export default Pagination;
