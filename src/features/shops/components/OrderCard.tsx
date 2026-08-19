import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface OrderCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  iconClassName?: string;
  children: ReactNode;
}

const OrderCard = ({
  icon: Icon,
  title,
  subtitle,
  iconClassName = 'bg-[#1A7A6E]/10 text-[#1A7A6E]',
  children,
}: OrderCardProps) => {
  return (
    <section className="helix-card w-full p-6">
      <article className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClassName}`}
        >
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-text">{title}</h2>
          {subtitle && <p className="text-[13px] text-muted">{subtitle}</p>}
        </div>
      </article>
      {children}
    </section>
  );
};

export default OrderCard;
