'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Hero from './Hero';
import Marketplace from './MarketPlace';
import HowItWorks from './HowItWorks';
import DualCTA from './DualCTA';
import WaitlistFooter from './WaitlistFooter';
import ProductModal from './ProductModal';
import { useRouter } from 'next/navigation';
import { catWailtist, ProductType } from './constants';
import './waitlist.css';
import WaitlistNav from './WailtListNav';
import WaitlistModal from './WaitlistModal';
import FAQSection from './FAQs';

export default function ComingSoon() {
  const router = useRouter();
  const [funcEmail, setFuncEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<ProductType | null>(null); // active product or null
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [roleToSingFOr, setROleTOSIgnFOr] = useState<
    'exporter' | 'buyer' | null
  >(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Reveal-on-scroll
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ESC closes modal
  useEffect(() => {
    if (!modal) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: { key: string }) => {
      if (e.key === 'Escape') setModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal]);
  const text =
    '🇳🇬 Nigeria · Fashion & Textiles · 🇺🇸 United States · Agricultural Goods · Verified Suppliers · Staple Foods · 🌍 Africa → World · Secure Payments';
  return (
    <section className="js-root overflow-hidden">
      <WaitlistNav
        scrolled={scrolled}
        onCta={() =>
          document
            .getElementById('waitlist')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <div className="js-ticker">
        <div className="js-ticker-track">
          <span className="js-ticker-content">
            {text} · {text} · {text}
          </span>
        </div>
      </div>
      <Hero
        funcEmail={funcEmail}
        setFuncEmail={setFuncEmail}
        setShowWaitlistModal={setShowWaitlistModal}
      />
      <div className="js-cat-strip">
        <div className="js-cat-track">
          {[...catWailtist, ...catWailtist, ...catWailtist].map((c, i) => (
            <span key={i} className="js-cat-pill">
              {c}
            </span>
          ))}
        </div>
      </div>{' '}
      <Marketplace onOpen={setModal} />
      <HowItWorks />
      <DualCTA
        setRoleToSingFOr={setROleTOSIgnFOr}
        funcEmail={funcEmail}
        setFuncEmail={setFuncEmail}
        setShowWaitlistModal={setShowWaitlistModal}
      />
      <FAQSection />
      <section className="js-powered">
        <div className="js-container js-powered-inner">
          <span className="js-powered-label">Powered by</span>
          <span className="js-powered-name">JompStart Digital</span>
          <span className="js-powered-dot">·</span>
          <span className="js-powered-name">Riby Inc</span>
          <span className="js-powered-dot">·</span>
          <span className="js-powered-name">Anchor </span>
        </div>
      </section>
      <WaitlistFooter setShowWaitlistModal={setShowWaitlistModal} />
      {modal && (
        <ProductModal
          product={modal}
          onClose={() => setModal(null)}
          onCta={() => {
            setModal(null);
            setShowWaitlistModal(true);
          }}
        />
      )}
      {showWaitlistModal && (
        <WaitlistModal
          roleToSignFor={roleToSingFOr}
          email={funcEmail}
          setEmail={setFuncEmail}
          show={showWaitlistModal}
          onClose={() => setShowWaitlistModal(false)}
        />
      )}
      <button
        onClick={() => router.push('/login')}
        className="js-discreet-admin"
        data-testid="discreet-admin"
        aria-label="Admin login"
      >
        ·
      </button>
    </section>
  );
}
