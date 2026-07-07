import type { LucideIcon } from 'lucide-react';
import {
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  ShoppingBasket,
  BookOpen,
  Dumbbell,
  Baby,
  Gamepad2,
  Wrench,
  Car,
  PawPrint,
  Gem,
  Tag,
  ShoppingBag,
  Coffee,
  House,
  Cuboid,
} from 'lucide-react';

/**
 * Exact slug matches, checked first. Keep keys as slugified category names
 * (lowercase, hyphenated) so lookups are stable regardless of how the
 * category name is capitalized/spaced in the admin panel.
 */
const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  fashion: ShoppingBag,
  clothing: Shirt,
  electronics: Smartphone,
  'phones-tablets': Smartphone,
  'home-furniture': Sofa,
  furniture: Sofa,
  'beauty-personal-care': Sparkles,
  beauty: Sparkles,
  groceries: ShoppingBasket,
  food: ShoppingBasket,
  'books-media': BookOpen,
  books: BookOpen,
  'sports-outdoors': Dumbbell,
  fitness: Dumbbell,
  'baby-kids': Baby,
  'toys-games': Gamepad2,
  agriculture: Coffee,
  'tools-hardware': Wrench,
  automotive: Car,
  decor: House,
  accessories: Cuboid,
  pets: PawPrint,
  'jewelry-accessories': Gem,
};

/**
 * Fallback keyword matching for categories that don't hit an exact slug,
 * e.g. an admin adds "Men's Fashion" or "Kitchen Appliances". First matching
 * keyword wins, so order roughly from most to least specific.
 */
const CATEGORY_ICON_KEYWORDS: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ['fashion', 'clothing', 'wear', 'apparel'], icon: Shirt },
  {
    keywords: ['phone', 'tablet', 'electronic', 'gadget', 'laptop', 'computer'],
    icon: Smartphone,
  },
  { keywords: ['furniture', 'home', 'kitchen', 'decor'], icon: Sofa },
  {
    keywords: ['beauty', 'cosmetic', 'skincare', 'personal care'],
    icon: Sparkles,
  },
  { keywords: ['grocery', 'food', 'supermarket'], icon: ShoppingBasket },
  { keywords: ['book', 'media', 'stationery'], icon: BookOpen },
  { keywords: ['sport', 'fitness', 'gym', 'outdoor'], icon: Dumbbell },
  { keywords: ['baby', 'kid', 'child'], icon: Baby },
  { keywords: ['toy', 'game'], icon: Gamepad2 },
  { keywords: ['tool', 'hardware'], icon: Wrench },
  { keywords: ['auto', 'car', 'vehicle'], icon: Car },
  { keywords: ['pet', 'animal'], icon: PawPrint },
  { keywords: ['jewelry', 'jewellery', 'accessor', 'watch'], icon: Gem },
];

const DEFAULT_CATEGORY_ICON: LucideIcon = Tag;

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resolve a category's icon purely from its name/slug — nothing is stored
 * or sent to the backend for this. Falls back to keyword matching, then a
 * generic tag icon if nothing matches.
 */
export function getCategoryIcon(categoryName: string): LucideIcon {
  const slug = slugify(categoryName);

  if (CATEGORY_ICON_MAP[slug]) return CATEGORY_ICON_MAP[slug];

  const match = CATEGORY_ICON_KEYWORDS.find(({ keywords }) =>
    keywords.some((kw) => slug.includes(slugify(kw))),
  );

  return match?.icon ?? DEFAULT_CATEGORY_ICON;
}
