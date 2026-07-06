import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  body?: string;
  cta?: string;
  to?: string;
}

export default function EmptyState({ title, body, cta, to }: EmptyStateProps) {
  return (
    <div className="helix-card p-8 text-center">
      <div className="helix-h3 mb-2">{title}</div>
      {body && (
        <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">{body}</p>
      )}
      {cta && to && (
        <Link href={to} className="helix-btn-primary text-sm inline-flex mt-4">
          {cta}
        </Link>
      )}
    </div>
  );
}
