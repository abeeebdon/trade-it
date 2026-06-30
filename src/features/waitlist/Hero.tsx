import { Dispatch, SetStateAction } from 'react';
import { waitListItems } from './constants';
import WaitlistForm from './WaitlistFOrm';
export interface HeroProps {
  funcEmail: string;
  setFuncEmail: (email: string) => void;
  setShowWaitlistModal: Dispatch<SetStateAction<boolean>>;
}

export default function Hero({
  funcEmail,
  setFuncEmail,
  setShowWaitlistModal,
}: HeroProps) {
  return (
    <section id="waitlist" className="js-hero">
      <div className="js-hero-glow" />
      <div className="js-container js-hero-inner">
        <div className="js-badge fade-up-1" data-testid="hero-badge">
          <span className="js-dot" /> Coming Soon · Join the Waitlist
        </div>
        <h1 className="js-h1 fade-up-2">
          Africa&apos;s goods.
          <br />
          <span className="js-h1-gold">The world&apos;s market.</span>
        </h1>
        <p className="js-sub fade-up-3">
          JompShop connects verified Nigerian and African exporters directly
          with US buyers — with embedded payments, compliance, and trade finance
          built in.
        </p>
        <div className="fade-up-4">
          <WaitlistForm
            setOpenModal={setShowWaitlistModal}
            funcEMail={funcEmail}
            setFuncEmail={setFuncEmail}
            type="hero"
          />
          <div className="js-form-note">
            No spam. Just a heads-up when we go live.
          </div>
        </div>
        <div className="js-stats fade-up-5">
          {waitListItems.map((s, i) => (
            <div key={i} className="js-stat">
              <div className="js-stat-num">{s.num}</div>
              <div className="js-stat-label">{s.label}</div>
            </div>
          ))}
        </div>{' '}
      </div>
    </section>
  );
}
