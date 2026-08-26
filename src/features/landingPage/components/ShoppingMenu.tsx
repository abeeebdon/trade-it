import NavGroup from '@/components/nav/NavGroup';
import MobileNavGroup from '@/components/nav/MobileNavGroup';
import { shoppingMenu } from './data';

interface ShoppingMenuProps {
  variant?: 'desktop' | 'mobile';
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
