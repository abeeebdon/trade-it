export interface ProductType {
  id: number;
  name: string;
  seller: string;
  city: string;
  price: string;
  unit: string;
  moq: string;
  image: string;
  category: string;
  desc: string;
  specs: {
    [key: string]: string;
  };
  grad: string;
}
export const PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: 'Ankara Ready-to-Wear Collection',
    seller: 'Adaeze Fashions',
    city: 'Lagos, NG',
    price: '$42.00',
    unit: '/unit',
    moq: '50 units',
    image: 'ankara.avif',
    category: 'Fashion & Textiles',
    desc: 'Bespoke ready-to-wear Ankara designs by Lagos-based artisans. Sized XS–XXL. Fabric sourced from licensed Nigerian textile mills, sewn in-house.',
    specs: {
      'Lead Time': '3 weeks',
      Compliance: 'SON · Country-of-Origin Label',
      Material: '100% wax-print cotton',
    },
    grad: 'linear-gradient(135deg,#7B2CBF,#EFA005)',
  },
  {
    id: 2,
    name: 'Premium Sesame Seeds (Hulled)',
    seller: 'Emeka Agro Exports',
    city: 'Kano, NG',
    price: '$2,400',
    unit: '/MT',
    moq: '1 MT',
    image: 'sesame.jpg',
    category: 'Agricultural Products',
    desc: 'Pure white hulled sesame from Benue cooperatives. Export-grade, vacuum-sealed.',
    specs: {
      'Lead Time': '4 weeks',
      Grade: 'Premium A',
      Origin: 'Benue State',
    },
    grad: 'linear-gradient(135deg,#1A7A6E,#C9922A)',
  },
  {
    id: 3,
    name: 'Dried Hibiscus Flowers (Zobo)',
    seller: 'Zobo Naturals Ltd',
    city: 'Sokoto, NG',
    price: '$7.56',
    unit: '/kg',
    moq: '100 kg',
    image: 'hibiscus.jpg',
    category: 'Botanicals & Herbs',
    desc: 'Sun-dried Sudanese hibiscus calyces — vibrant red, aromatic. For teas, syrups, juice.',
    specs: {
      'Lead Time': '2 weeks',
      Compliance: 'NAFDAC · Phytosanitary',
      Pack: '10kg cartons',
    },
    grad: 'linear-gradient(135deg,#EFA005,#4A2E8A)',
  },
  {
    id: 4,
    name: 'Raw Shea Butter (Unrefined)',
    seller: 'Heritage Naturals',
    city: 'Abuja, NG',
    price: '$3.80',
    unit: '/kg',
    moq: '50 kg',
    image: 'shea-butter.jpg',
    category: 'Beauty & Wellness',
    desc: "Grade A unrefined shea butter, hand-whipped by women's cooperatives in Northern Nigeria.",
    specs: {
      'Lead Time': '2 weeks',
      Compliance: 'NAFDAC',
      Packaging: '25kg drums',
    },
    grad: 'linear-gradient(135deg,#F5BE47,#4A2E8A)',
  },
  {
    id: 5,
    name: 'Kente-Weave Table Runners',
    seller: 'Okafor Textiles',
    city: 'Ibadan, NG',
    price: '$18.00',
    unit: '/piece',
    moq: '30 pieces',
    image: 'kente.webp',
    category: 'Fashion & Textiles',
    desc: 'Hand-loomed Kente-inspired table runners. 200x35cm. Fade-resistant cotton.',
    specs: {
      'Lead Time': '3 weeks',
      Material: 'Cotton',
      Dimensions: '200 × 35 cm',
    },
    grad: 'linear-gradient(135deg,#7B2CBF,#F5BE47)',
  },
  {
    id: 6,
    name: 'Ground Uziza Pepper (Organic)',
    seller: 'CrossRiver Spice Co.',
    city: 'Calabar, NG',
    price: '$12.50',
    unit: '/kg',
    moq: '20 kg',
    image: 'uzaza.jfif',
    category: 'Staple Foods',
    desc: 'Stone-ground West African Uziza pepper. Organic, aromatic, slightly bitter.',
    specs: {
      'Lead Time': '2 weeks',
      Certification: 'Organic · NAFDAC',
      Pack: '5kg pouches',
    },
    grad: 'linear-gradient(135deg,#C9922A,#1E0038)',
  },
  {
    id: 7,
    name: 'Hand-Carved Igbo Wooden Masks',
    seller: 'Artisan Collective NG',
    city: 'Enugu, NG',
    price: '$65.00',
    unit: '/piece',
    moq: '10 pieces',
    image: 'mask.jfif',
    category: 'Arts & Crafts',
    desc: 'Hand-carved iroko wood Igbo masks — each piece individually signed and unique.',
    specs: {
      'Lead Time': '5 weeks',
      Material: 'Iroko wood',
      Finish: 'Natural oil',
    },
    grad: 'linear-gradient(135deg,#4A2E8A,#EFA005)',
  },
  {
    id: 8,
    name: 'Cold-Pressed Black Seed Oil',
    seller: 'Ondo Wellness Farm',
    city: 'Ondo, NG',
    price: '$22.00',
    unit: '/L',
    moq: '10 L',
    image: 'seed_oil.png',
    category: 'Beauty & Wellness',
    desc: 'Cold-pressed Nigella sativa oil. Therapeutic grade, glass-bottled.',
    specs: {
      'Lead Time': '3 weeks',
      Compliance: 'NAFDAC',
      Bottle: '1L glass amber',
    },
    grad: 'linear-gradient(135deg,#1A7A6E,#F5BE47)',
  },
];
export const steps = [
  {
    n: '01',
    icon: '🛂',
    title: 'Get Verified',
    desc: 'Exporters complete CAC/KYB verification. US buyers confirm their business identity. Every seller on JompShop is authenticated before they can list.',
  },
  {
    n: '02',
    icon: '🔍',
    title: 'Discover & Order',
    desc: 'US buyers browse verified African products with real pricing, compliance badges, and supplier profiles. Submit an RFQ or order directly from the marketplace.',
  },
  {
    n: '03',
    icon: '🔒',
    title: 'Pay Securely',
    desc: 'Payments are held in escrow by Riby Inc. Exporters receive USD directly to their JompShop account via Anchor Systems. Transparent, traceable, protected.',
  },
];
export const waitListItems = [
  { num: '60M+', label: 'African SMEs Ready to Export' },
  { num: '$400B', label: 'Africa–US Trade Opportunity' },
  { num: '3', label: 'Trusted Platform Partners' },
  { num: '12 wks', label: 'To Launch' },
];
export const catWailtist = [
  '👗 Fashion & Textiles',
  '🌿 Agricultural Products',
  '🍲 Staple Foods',
  '🌺 Botanicals & Herbs',
  '✨ Beauty & Wellness',
  '🏺 Arts & Crafts',
  '🫚 Natural Oils',
  '🌾 Grains & Seeds',
];
