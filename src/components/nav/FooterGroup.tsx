import Link from 'next/link';

export interface FooterGroupItem {
  label: string;
  href: string;
}

interface FooterGroupProps {
  title: string;
  items: FooterGroupItem[];
  isLoading?: boolean;
}

const FooterGroup = ({ title, items, isLoading }: FooterGroupProps) => {
  return (
    <div>
      <h3 className="font-mono uppercase tracking-wider text-secondary text-lg mb-3">
        {title}
      </h3>

      <ul className="space-y-2 text-[12px] text-muted">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <span className="inline-block h-3 w-24 rounded bg-white/10 animate-pulse" />
              </li>
            ))
          : items.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-text text-md">
                  {label}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default FooterGroup;
