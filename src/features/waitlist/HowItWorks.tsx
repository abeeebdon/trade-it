import { steps } from './constants';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="js-section">
      <div className="js-container">
        <div className="js-section-head reveal">
          <div className="js-eyebrow">How It Works</div>
          <h2 className="js-h2">Trade made simple.</h2>
        </div>
        <div className="js-steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="js-step-card reveal">
              <p className="js-step-number">{s.n}</p>
              <p className="js-step-icon">{s.icon}</p>
              <h3 className="js-step-title">{s.title}</h3>
              <p className="js-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
