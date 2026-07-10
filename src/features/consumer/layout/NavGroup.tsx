import NavItem from './NavItem';
import type { NavGroupConfig } from './nav-config';

interface NavGroupProps {
  group: NavGroupConfig;
  orderBadge: number;
  showLabel?: boolean;
}

export default function NavGroup({
  group,
  orderBadge,
  showLabel,
}: NavGroupProps) {
  return (
    <div>
      <div
        className={
          showLabel == true
            ? 'px-4 pb-2 text-sm font-mono uppercase tracking-widest'
            : showLabel == false
              ? ' px-4 pb-2 text-sm hidden font-mono tracking-widest'
              : 'hidden lg:block px-4 pb-2 text-sm font-mono uppercase tracking-widest '
        }
      >
        {group.label}
      </div>
      <div className="space-y-0.5">
        {group.items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            badge={item.badgeKey === 'orders' ? orderBadge : 0}
            showLabel={showLabel}
          />
        ))}
      </div>
    </div>
  );
}
