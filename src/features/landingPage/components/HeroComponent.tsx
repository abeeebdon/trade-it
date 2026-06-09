import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CARGO_IMG, heroText } from './data';
import Image from 'next/image';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useRouter } from 'next/navigation';

const HeroComponent = () => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden">
      <div className="helix-dot-bg absolute inset-0 opacity-70 pointer-events-none" />
      <div className="max-w-350 mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center relative">
        <article className="lg:col-span-7 fade-up">
          <p className="helix-kicker mb-5">
            Africa → United States · Export Operating System
          </p>
          <h1
            className="helix-h1 max-w-3xl"
            data-aos="zoom-down"
            data-aos-delay="400"
          >
            The <span className="text-[#C9922A]">command center</span> for
            cross-border trade out of Nigeria &amp; Africa.
          </h1>
          <p
            className="mt-6 text-[17px] text-[#9CA3AF] leading-relaxed max-w-xl"
            data-aos="fade-up"
          >
            Jomp Trade unifies exporter onboarding, US-compliant product
            listings, full order lifecycle, document automation, and USD/NGN
            banking &mdash; with Riby Inc escrow and JompStart credit under the
            hood &mdash; so one trade doesn&rsquo;t take ten tools.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PressableBtn
              title="Open an account"
              handleClick={() => router.push('/register')}
              rightComponent={<ArrowRight size={16} />}
              helix-btn-primary
              data-testid="hero-cta-primary"
              className="helix-btn-primary"
            />
            <Link
              href="/shop"
              data-testid="hero-cta-browse"
              className="helix-btn-secondary inline-flex items-center gap-2"
            >
              Browse marketplace
            </Link>
            <Link
              href="/shop"
              data-testid="hero-cta-shop"
              className="text-[13px] text-[#C9922A] font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all pl-2"
            >
              Or shop direct from Africa →
            </Link>
          </div>

          <div
            className="mt-12 grid grid-cols-3 gap-6 max-w-xl"
            data-aos="fade-up"
          >
            {heroText.map((s) => (
              <div key={s.v}>
                <div className="font-mono text-3xl text-[#C9922A] font-bold tracking-tight">
                  {s.k}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF] mt-1 leading-snug">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="lg:col-span-5 relative fade-up-delay-2">
          <div className="relative aspect-4/5 w-full rounded overflow-hidden border border-secondary/30">
            <Image
              src={CARGO_IMG}
              alt="Cargo ship"
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,22,40,0.25) 0%, rgba(10,22,40,0.78) 100%)',
              }}
            />
            <div className="absolute bottom-5 left-5 right-5 helix-card bg-[#0A1628]/85! p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#1A7A6E]">
                  LIVE · ESCROW BY RIBY INC
                </span>
                <span className="helix-status helix-status-ok">ONLINE</span>
              </div>
              <div className="font-mono text-[11px] text-[#F5F5F5] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">VA · NGN</span>
                  <span>016-228-3094</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">VA · USD</span>
                  <span>HLX-USD-A1F8C22E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Latest Tx</span>
                  <span className="text-[#C9922A]">+USD 15,600.00</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HeroComponent;
