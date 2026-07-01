export interface FAQItem {
  question: string;
  answer: string;
}
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
    price: '$30.00',
    unit: '/unit',
    moq: '50 units',
    image: 'ankara2.jpg',
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
    price: '$1.80',
    unit: '/kg',
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
    price: '$2.00',
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
    price: '$2.58',
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
    price: '$2.80',
    unit: '/kg',
    moq: '20 kg',
    image: 'uzaza2.jpg',
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
    name: 'Snail - Deshelled/Frozen',
    seller: 'LA Exporters',
    city: 'Osun, NG',
    price: '$3.09',
    unit: '/piece',
    moq: '10 pieces',
    image: 'snail.jpg',
    category: 'Agricultural Products',
    desc: 'Snail - Deshelled/Frozen — each piece individually signed and unique.',
    specs: {
      'Lead Time': '3 weeks',
      Compliance: 'SON · Country-of-Origin Label',
      Material: '100% wax-print cotton',
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
    desc: 'Exporters complete CAC/KYB verification. Retailers confirm their business identity. Every seller on JompShop is authenticated and verified before thier list goes active.',
  },
  {
    n: '02',
    icon: '🔍',
    title: 'Discover & Order',
    desc: 'US Buyers browse verified African products with real pricing, compliance badges, and supplier profiles. Submit an RFQ or order directly from the marketplace.',
  },
  {
    n: '03',
    icon: '🔒',
    title: 'Pay Securely',
    desc: 'Payments are held in escrow by Riby Inc. Exporters receive USD directly to their JompShop account via Anchor Systems. Transparent, traceable, protected.',
  },
];
export const waitListItems = [
  { num: '3M+', label: 'African SMEs Ready to Export' },
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
export const faqData = [
  {
    section: 'General',
    items: [
      {
        question: 'What is JompShop?',
        answer:
          'JompShop enables Nigerian and African producers to market, sell, ship, and collect payments from US-based customers without needing to be physically present in the United States. The platform provides a US correspondence address, payment collection, compliance support, marketplace setup, warehousing, shipping options, and last-mile delivery. It also enables Africans in the US and customers seeking African products to safely buy, pay, and receive products at their doorstep.',
      },
      {
        question: 'Is JompShop a shipping company or a marketplace?',
        answer:
          'JompShop is a marketplace, not a shipping company. It connects sellers and buyers while coordinating logistics, payments, and compliance through trusted operating partners. International shipping partners and local logistics providers ensure products move smoothly across borders and to customers.',
      },
      {
        question: 'Who runs JompShop?',
        answer:
          'JompShop is powered by three operating partners: JompStart Digital, which manages the platform, exporter onboarding, African operations, compliance, and logistics support; Riby Inc., which manages US and global operations and serves as the Delivery Partner of Record for direct-to-consumer shipments; and Anchor, which provides the global multi-currency banking and payment infrastructure.',
      },
      {
        question: 'Where is JompShop available?',
        answer:
          'JompShop currently serves producers and exporters in Nigeria, with buyers located in the United States. Expansion into additional African countries is planned in the future.',
      },
    ],
  },
  {
    section: 'For Sellers',
    items: [
      {
        question: 'Who can sell on JompShop?',
        answer:
          'Registered Nigerian producers, exporters, and small-to-medium businesses with export-ready products can sell on JompShop. Supported categories include fashion, beauty, cosmetics, food products, home goods, art, and handmade products.',
      },
      {
        question: 'How do I become a seller on JompShop?',
        answer:
          'JompShop is currently in private beta with selected exporters. Interested businesses can join the waitlist. Once public registration opens, sellers can sign up, complete business verification, set up their storefront, and list products with guidance from the onboarding team.',
      },
      {
        question: 'What does it cost to list on JompShop?',
        answer:
          'Listing products on JompShop is free. The platform earns a commission only on completed sales, with full fee details shared during seller onboarding.',
      },
      {
        question: 'Do I need to handle shipping alone?',
        answer:
          'No. JompShop coordinates logistics together with international shipping partners. For direct-to-customer shipments, the Delivery Partner of Record manages payment collection and last-mile delivery, while sellers receive clear shipment preparation and hand-off instructions.',
      },
      {
        question: 'How do I get paid?',
        answer:
          "Payments are processed through Anchor and Stripe. Sellers receive payouts in their local currency through Anchor's multi-currency infrastructure after order confirmation and delivery according to the payout schedule.",
      },
      {
        question: 'What currencies does JompShop support?',
        answer:
          'JompShop currently supports multiple currencies through Anchor, including USD and NGN, with more currencies planned as the platform expands.',
      },
      {
        question: 'What locations can I ship from?',
        answer:
          "Sellers can ship from anywhere in Nigeria to JompShop's shipping pickup centers in Lagos and Ibadan.",
      },
    ],
  },
  {
    section: 'For Buyers',
    items: [
      {
        question: 'Who can buy on JompShop?',
        answer:
          'Anyone in the United States, and selected parts of Canada, can shop on JompShop. The platform supports individual consumers, retailers purchasing wholesale inventory, and business buyers seeking supplier relationships.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          "Delivery typically ranges from a few days to a couple of weeks depending on the seller's location, product category, and delivery destination. Estimated delivery dates are shown during checkout, and shipment tracking is provided.",
      },
      {
        question: 'How are buyer payments handled?',
        answer:
          "Payments are securely processed through JompShop's payment partners. Buyers pay in USD or NGN, while the platform handles currency conversion for sellers. Sellers are paid only after successful delivery.",
      },
      {
        question: "What happens if my order doesn't arrive or arrives damaged?",
        answer:
          'JompShop provides a dispute resolution process for delayed, damaged, missing, or incorrect orders. The operations team works with customers to resolve issues, including returns and refunds where applicable.',
      },
      {
        question: 'Can I buy in bulk or place wholesale orders?',
        answer:
          'Yes. JompShop supports both direct-to-consumer purchases and wholesale orders. Retailers can request quotations and place bulk orders directly with verified suppliers.',
      },
    ],
  },
  {
    section: 'Trust, Payments & Compliance',
    items: [
      {
        question: 'Is JompShop safe to use?',
        answer:
          "Yes. JompShop operates on vetted infrastructure managed by experienced operating partners. Sellers are verified during onboarding, payments are secured through Anchor's licensed banking infrastructure, and deliveries are managed by Riby Inc.",
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Yes. All payment processing is handled securely by Anchor. JompShop does not store sensitive payment credentials on its own servers.',
      },
      {
        question: 'Does JompShop comply with US import and export regulations?',
        answer:
          'Yes. Export compliance is managed by JompStart Digital, while US import requirements and delivery compliance are handled by Riby Inc. Sellers receive guidance throughout the onboarding process.',
      },
    ],
  },
  {
    section: 'Getting in Touch',
    items: [
      {
        question: 'How do I contact JompShop support?',
        answer:
          "If you've joined the waitlist, the team will reach out to you. You can also contact support via email, social media, or WhatsApp. Seller support is available in Nigeria, while the US team handles buyer support and delivery correspondence.",
      },
      {
        question: 'How do I stay updated about JompShop?',
        answer:
          'Follow JompShop on social media and subscribe to the newsletter for updates on products, sellers, and platform announcements.',
      },
    ],
  },
];
