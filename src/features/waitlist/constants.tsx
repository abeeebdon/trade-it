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

export const faqs: FAQItem[] = [
  {
    question: 'Will the textiles be of good quality?',
    answer:
      'That’s why we exist. Products already packaged go from producers and then shipped within days, not months in warehouses. We test packaging for heat or breakage because we know what “quality” should be.',
  },
  {
    question: 'How is this different from Amazon/Etsy African stores?',
    answer:
      'Most stores buy from 3-4 middlemen first. We connect you directly to the producer in Nigeria. Less handling, lower cost, and the maker gets respected. We just handle the shipping and customs stress for you.',
  },
  {
    question: 'When will you launch and how do I get early access?',
    answer:
      'We’re still setting up with producers now. Join the waitlist via link in bio and you’ll get first access and details before we open to everyone.',
  },
  {
    question:
      'I don’t know how to use the computer/internet. Can I still join?',
    answer:
      'Yes. No tech skills needed. We talk to you on WhatsApp/call. You focus on your craft. We’ll guide you through photos, pricing, everything. Many makers we’re speaking to are in the same situation.',
  },
  {
    question: 'How will I get paid? I don’t have a dollar account.',
    answer:
      'You get paid in Naira, straight to your Nigerian bank account. We handle dollars on our end. You see the price, agree, and get paid after delivery. Simple.',
  },
  {
    question: 'What if the buyer in America rejects my product?',
    answer:
      'We agree on quality and photos with you first. Only buyers who want that exact product see it. If there’s ever an issue, we sort it with you directly. Your craft won’t be wasted.',
  },
  {
    question: 'Who are you guys? Why should we trust you?',
    answer:
      'We’re Nigerians too, and we’re tired of seeing great products and great people disconnected. We started this because we kept watching buyers struggle to find real stuff, and makers struggle to reach buyers. We’re building the link slowly, talking to both sides first. No big company promises,we are just people trying to do it right.',
  },
  {
    question: 'What happens after I join the waitlist / send “TELL ME MORE”?',
    answer:
      'Nothing stressful. For buyers: we’ll share updates, tell you when the launch is close, ask what products you miss most. For producers: we’ll have a simple chat on WhatsApp, learn about your craft, explain how we’d work together. You can ask questions and leave anytime. No forms, no pressure.',
  },
  {
    question: 'How do you make sure quality stays high on both sides?',
    answer:
      'Small steps. For producers: we start with samples/photos so buyers know exactly what they’re getting. For buyers: we only list makers we’ve spoken to and tested packaging with. If quality drops, we pause and fix it. Reputation matters more to us than rushing.',
  },
  {
    question:
      'What if something goes wrong? Maybe a delay, broken item, misunderstanding, etc?',
    answer:
      'We own the middle. If a buyer’s package is delayed, we handle it. If a producer has an issue, we sort it without blaming. You won’t be left fighting someone in another country. That’s why we exist to take the stress so both sides can focus on what they do best.',
  },
  {
    question: 'When does this actually start?',
    answer:
      'Slowly. We’re still listening to buyers about what they miss, and talking to makers about how they work. Launch comes after we get those conversations right. Joining the waitlist now just means you’re part of that early conversation. You’ll know before anyone else. We are closer to launching sooner than you expect.',
  },
];
