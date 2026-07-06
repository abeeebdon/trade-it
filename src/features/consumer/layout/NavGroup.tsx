import NavItem from './NavItem';
import type { NavGroupConfig } from './nav-config';

interface NavGroupProps {
  group: NavGroupConfig;
  orderBadge: number;
}

export default function NavGroup({ group, orderBadge }: NavGroupProps) {
  return (
    <div>
      <div className="hidden lg:block px-4 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#B0A4C0]">
        {group.label}
      </div>
      <div className="space-y-0.5">
        {group.items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            badge={item.badgeKey === 'orders' ? orderBadge : 0}
          />
        ))}
      </div>
    </div>
  );
}
