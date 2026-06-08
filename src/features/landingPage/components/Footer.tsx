import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-[#1A7A6E]/15 py-10 mt-16">
      <div className="max-w-350 mx-auto px-6 lg:px-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/jomp-icon.png"
              alt="Jomp Shop logo"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="font-bold tracking-[0.22em] text-sm">
              JOMP SHOP
            </span>
          </div>

          <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
            Africa&apos;s direct-to-shopper marketplace. Buy direct from
            verified makers. Escrow-protected by Riby Inc.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#1A7A6E] mb-3">
            Shop
          </div>

          <ul className="space-y-2 text-[12px] text-[#9CA3AF]">
            <li>
              <Link href="/?category=fashion" className="hover:text-[#F5F5F5]">
                Fashion &amp; Textiles
              </Link>
            </li>

            <li>
              <Link
                href="/?category=staple-foods"
                className="hover:text-[#F5F5F5]"
              >
                Staple Foods
              </Link>
            </li>

            <li>
              <Link href="/?category=beauty" className="hover:text-[#F5F5F5]">
                Beauty &amp; Cosmetics
              </Link>
            </li>

            <li>
              <Link
                href="/?category=home-decor"
                className="hover:text-[#F5F5F5]"
              >
                Home &amp; Decor
              </Link>
            </li>

            <li>
              <Link
                href="/?category=accessories"
                className="hover:text-[#F5F5F5]"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* SELLERS */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#1A7A6E] mb-3">
            Sellers
          </div>

          <ul className="space-y-2 text-[12px] text-[#9CA3AF]">
            <li>
              <Link
                href="/register?role=exporter"
                className="hover:text-[#F5F5F5]"
              >
                Become an exporter
              </Link>
            </li>

            <li>
              <Link
                href="/register?role=buyer"
                className="hover:text-[#F5F5F5]"
              >
                Become a reseller / importer
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-[#F5F5F5]">
                For African brands
              </Link>
            </li>

            <li>
              <Link href="/about#modules" className="hover:text-[#F5F5F5]">
                Trade platform
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#1A7A6E] mb-3">
            Company
          </div>

          <ul className="space-y-2 text-[12px] text-[#9CA3AF]">
            <li>
              <Link href="/about" className="hover:text-[#F5F5F5]">
                About Jomp Shop
              </Link>
            </li>

            <li>
              <Link href="/about#partners" className="hover:text-[#F5F5F5]">
                Partners
              </Link>
            </li>

            <li>
              <Link href="/login" className="hover:text-[#F5F5F5]">
                Sign in
              </Link>
            </li>

            <li>
              <Link href="/getstarted" className="hover:text-[#F5F5F5]">
                Create account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-6 lg:px-10 mt-8 pt-6 border-t border-[#1A7A6E]/15 text-center">
        <div className="text-[11px] text-[#1A7A6E] font-mono tracking-widest flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>JOMP SHOP · POWERED BY</span>
          <span>·</span>
          <span>RIBY INC</span>
          <span>·</span>
          <span>JOMPSTART DIGITAL</span>
          <span>·</span>
          <span>ANCHOR</span>
        </div>

        <div className="text-[10px] text-[#9CA3AF] mt-2">
          © {new Date().getFullYear()} Jomp Shop. Africa to the world.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
