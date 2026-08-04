'use client';
import { useGetProductCategories } from '@/features/exporter/hooks/useProducts';
import JompFullLogo from '@/features/authentication/components/JompFullLogo';
import FooterGroup from '@/components/nav/FooterGroup';

const SELLER_LINKS = [
  { label: 'Become an exporter', href: '/register?role=exporter' },
  { label: 'Become a retailer / importer', href: '/register?role=retailer' },
  { label: 'For African brands', href: '/about' },
  { label: 'Trade platform', href: '/about#modules' },
];

const COMPANY_LINKS = [
  { label: 'About Jompshop', href: '/about' },
  { label: 'Partners', href: '/about#partners' },
  { label: 'Sign in', href: '/login' },
  { label: 'Create account', href: '/getstarted' },
];

const Footer = () => {
  const { data, isPending } = useGetProductCategories();

  const categories = data?.data ?? [];
  const categoryLinks = categories.map((cat) => ({
    label: cat.name,
    href: `/?category=${encodeURIComponent(cat.name)}`,
  }));

  return (
    <footer className="border-t border-[#1A7A6E]/15 py-10 mt-16">
      <div className="max-w-350 mx-auto px-6 lg:px-10 grid md:grid-cols-5 lg:grid-cols-6  gap-8">
        <div className="col-span-2">
          <JompFullLogo />

          <p className="text-[12px] mt-2 text-muted leading-relaxed">
            Africa&apos;s direct-to-shopper marketplace. Buy direct from
            verified makers. Escrow-protected by Riby Inc.
          </p>
        </div>

        {/* SHOP */}
        <FooterGroup title="Shop" items={categoryLinks} isLoading={isPending} />

        {/* SELLERS */}
        <FooterGroup title="Sellers" items={SELLER_LINKS} />

        {/* COMPANY */}
        <FooterGroup title="Company" items={COMPANY_LINKS} />
        <div>
          <h3 className="font-mono uppercase tracking-wider text-secondary text-lg mb-3">
            Connect
          </h3>
          <div className="space-y-2 flex flex-col text-[12px] text-muted">
            <a href="mailto:hello@jompshop.com" className="hover:text-text">
              hello@jompshop.com
            </a>

            <a
              href="https://www.instagram.com/jompshop_/"
              target="blank"
              className="hover:text-text"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61578300267978"
              target="blank"
              className="hover:text-text"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-6 lg:px-10 mt-8 pt-6 border-t border-[#1A7A6E]/15 text-center">
        <div className="text-[11px] text-[#1A7A6E] font-mono tracking-widest flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>JOMPSHOP · POWERED BY</span>
          <span>·</span>
          <span>RIBY INC</span>
          <span>·</span>
          <span>JOMPSTART DIGITAL</span>
          <span>·</span>
          <span>ANCHOR</span>
        </div>

        <div className="text-[10px] text-[#9CA3AF] mt-2">
          © {new Date().getFullYear()} JompShop. Africa to the world.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
