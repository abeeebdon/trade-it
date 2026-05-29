import JompShopLogo from '@/assets/JompShopIcon';

interface WaitlistNavProps {
  scrolled: boolean;
  onCta: () => void;
}
export default function WaitlistNav({ scrolled, onCta }: WaitlistNavProps) {
  return (
    <nav className={`js-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="js-container js-nav-inner">
        <a href="#top" className="js-logo block" data-testid="js-logo">
          <div className="w-10 h-10">
            <JompShopLogo primaryColor="white" className="w-full h-full" />
          </div>
          <span className="js-wordmark hidden min-[400px]:block">JompShop</span>

          {/* <Image
            src="/icons/jompshop_logo.svg"
            alt="JompShop Logo"
            width={100}
            height={32}
          /> */}
        </a>
        <div className="js-nav-right">
          <a href="#how-it-works" className="js-nav-link">
            How It Works
          </a>
          <a href="#marketplace" className="js-nav-link">
            Marketplace
          </a>

          <button
            onClick={onCta}
            className="js-btn js-btn-gold"
            data-testid="nav-join-waitlist"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
