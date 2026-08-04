import NavGroup from '@/components/nav/NavGroup';
import { NAV_LINKS } from './data';

export default function ShopMenu() {
  return <NavGroup label="Shop" items={NAV_LINKS} />;
}
