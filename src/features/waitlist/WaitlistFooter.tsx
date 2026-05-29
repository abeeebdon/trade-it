import JompShopLogo from '@/assets/JompShopIcon';

export default function WaitlistFooter() {
  return (
    <footer className="js-footer">
      <div className="js-container">
        <div className="js-footer-top">
          <div>
            <div className="js-footer-brand">
              <div className="w-10 h-10">
                <JompShopLogo primaryColor="white" className="w-full h-full" />
              </div>
            </div>
            <p className="js-footer-tag">
              Africa&apos;s Global Marketplace. Launching soon.
            </p>
          </div>
          <div className="js-footer-cols">
            <div>
              <div className="js-footer-h">Platform</div>
              <a href="#how-it-works">How It Works</a>
              <a href="#marketplace">Marketplace Preview</a>
              <a href="#waitlist">Join Waitlist</a>
            </div>
            <div>
              <div className="js-footer-h">Partners</div>
              <span>JompStart Digital</span>
              <span>Riby Inc</span>
              <span>Anchor </span>
            </div>
            <div>
              <div className="js-footer-h">Connect</div>
              <a href="mailto:hello@jompshop.co">hello@jompshop.com</a>
              <span>ig@JompShop</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="js-footer-bottom">
          <span>
            © 2025 JompShop. A product of JompStart Digital &amp; Riby Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
