import JompShopLogo from '@/assets/JompShopIcon';
import { useAppDispatch } from '@/hooks/store/store';
import { setBeta } from '@/store/waitlist/waitlist.slice';
import { Dispatch, SetStateAction } from 'react';
interface Props {
  setShowWaitlistModal: Dispatch<SetStateAction<boolean>>;
}
export default function WaitlistFooter({ setShowWaitlistModal }: Props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const dispatch = useAppDispatch();
  const handleToggleBeta = () => {
    dispatch(setBeta(true));
    scrollToTop();
  };
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
              <button
                className="text-xs text-[#b8aec8] hover:text-white"
                onClick={() => setShowWaitlistModal(true)}
              >
                Join Waitlist
              </button>
            </div>
            <div>
              <div className="js-footer-h">Partners</div>
              <span>JompStart Digital</span>
              <span>Riby Inc</span>
              <span>Anchor </span>
            </div>
            <div>
              <div className="js-footer-h">Connect</div>
              <a href="mailto:hello@jompshop.com">hello@jompshop.com</a>
              <a href="https://www.instagram.com/jompshop_/" target="blank">
                IG@Jompshop
              </a>
              <a href="https://www.instagram.com/jompshop_/" target="blank">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="js-footer-bottom">
          <p className="text-center ">
            © {new Date().getFullYear()} JompShop. A product of JompStart
            Digital &amp; Riby Inc.
          </p>
          <button onClick={handleToggleBeta} className="js-beta-link">
            🔒 Beta Access
          </button>
        </div>
      </div>
    </footer>
  );
}
