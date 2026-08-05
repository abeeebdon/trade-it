import NavGroup from '@/components/nav/NavGroup';
import { shoppingMenu } from './data';

export default function ShoppingMenu() {
  return <NavGroup label="Shopping" items={shoppingMenu} />;
}
