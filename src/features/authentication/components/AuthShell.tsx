'use client';
import JompsShopLogo from '@/assets/jompshop_logo';
import JompsShopLogoDark from '@/assets/JompshopLogoDark';
import useColorScheme from '@/hooks/useColorScheme';
import Link from 'next/link';

export function AuthShell() {
  const isDark: boolean = useColorScheme();

  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden border-r border-secondary/20">
      <div className="absolute inset-0 helix-dot-bg" />
      <div className="relative z-10 flex flex-col justify-between p-10 py-5  w-full">
        <Link href="/" className="" data-testid="brand-auth">
          {isDark ? (
            <JompsShopLogoDark width={140} />
          ) : (
            <JompsShopLogo width={140} />
          )}
          <p className="text-[10px] mt-2 tracking-[0.3em] dark:text-[#1A7A6E] text-[#4a2e8a] font-mono">
            DIRECT · FROM AFRICA
          </p>
        </Link>
        <div>
          <div className="helix-kicker mb-3" data-aos="fade-down">
            Export Operating System
          </div>
          <h2
            className="helix-h2 max-w-md"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            One login. Every trade in one command center.
          </h2>
          <p
            className="text-[#9CA3AF] mt-4 text-sm max-w-md"
            data-aos="zoom-up"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            JompStart Digital Limited · Riby Inc · Anchor.
          </p>
        </div>
        <div className="font-mono text-[11px] text-[#1A7A6E] tracking-widest">
          © {new Date().getFullYear()} · JOMP TRADE v1.1
        </div>
      </div>
    </div>
  );
}
