import NavGroup from '@/components/nav/NavGroup';
import MobileNavGroup from '@/components/nav/MobileNavGroup';
import { shoppingMenu } from './data';

interface ShoppingMenuProps {
  /** 'desktop' renders the hover dropdown; 'mobile' renders the collapsible sidebar variant. */
  variant?: 'desktop' | 'mobile';
  /** Called after a link is selected — e.g. to close a mobile sidebar. */
  onNavigate?: () => void;
}

export default function ShoppingMenu({
  variant = 'desktop',
  onNavigate,
}: ShoppingMenuProps) {
  if (variant === 'mobile') {
    return (
      <MobileNavGroup
        label="Shopping"
        items={shoppingMenu}
        onNavigate={onNavigate}
      />
    );
  }
  return <NavGroup label="Shopping" items={shoppingMenu} />;
}
