import Image from 'next/image';
import Link from 'next/link';

export function AuthShell() {
  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden border-r border-secondary/20">
      <div className="absolute inset-0 helix-dot-bg" />
      <div className="relative z-10 flex flex-col justify-between p-10 w-full">
        <Link
          href="/"
          className="flex items-center gap-3"
          data-testid="brand-auth"
        >
          <Image
            width={36}
            height={36}
            src="/jomp-icon.png"
            alt="Jomp"
            className="w-9 h-9 rounded-full"
          />
          <div className="leading-tight">
            <div className="font-bold text-text tracking-[0.22em] text-sm">
              JOMP SHOP
            </div>

            <p className="text-[10px] tracking-[0.3em] dark:text-[#1A7A6E] text-[#4a2e8a] font-mono">
              DIRECT · FROM AFRICA
            </p>
          </div>
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
            One login. Four roles. Every trade in one command center.
          </h2>
          <p
            className="text-[#9CA3AF] mt-4 text-sm max-w-md"
            data-aos="zoom-up"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            Riby Inc · JompStart Digital Limited · Anchor.
          </p>
        </div>
        <div className="font-mono text-[11px] text-[#1A7A6E] tracking-widest">
          © 2026 · JOMP TRADE v1.1
        </div>
      </div>
    </div>
  );
}
