import WaitlistForm from './WaitlistFOrm';

export default function DualCTA() {
  return (
    <section id="about" className="js-section">
      <div className="js-container">
        <div className="js-dual-grid">
          <div className="js-dual-card js-dual-gold reveal">
            <p className="js-eyebrow-dark">For Exporters · 🇳🇬</p>
            <h3 className="js-dual-title js-dual-title-dark">
              Ready to sell to the US?
            </h3>
            <p className="js-dual-desc-dark">
              List your products, reach verified US buyers, and get paid in USD
              — without needing a US bank account or physical presence.
            </p>
            <WaitlistForm
              type="exporter"
              testid="exporter-waitlist"
              dark
              ctaLabel="Join as Exporter"
            />
          </div>
          <div className="js-dual-card js-dual-purple reveal">
            <div className="js-eyebrow">For US Buyers · 🇺🇸</div>
            <h3 className="js-dual-title">Source direct from Africa.</h3>
            <p className="js-dual-desc">
              Discover verified African suppliers, browse products with
              compliance badges, and import with confidence — supported by Riby
              Inc on the US side.
            </p>
            <WaitlistForm
              type="buyer"
              testid="buyer-waitlist"
              ctaLabel="Join as Buyer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
