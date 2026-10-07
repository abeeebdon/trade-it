import { CircleHelp, Mail, MessageCircle } from 'lucide-react';
import FAQComponent from '../components/FAQComponent';

const WA_NUMBER = '+2349039357065';
const SUPPORT_EMAIL = 'support@jompshop.com';
const PREFILL_BODY = 'Hi JompShop,%0A%0AI%20am%20';

export default function Help() {
  return (
    <main className="grid md:grid-cols-3  gap-6 w-full">
      <FAQComponent />
      <div className="space-y-4 ">
        <div className="helix-card p-5">
          <CircleHelp size={22} className="text-[#C9922A] mb-2" />
          <div className="font-semibold text-[14px] mb-1">Still stuck?</div>
          <p className="text-[12px] text-[#9CA3AF] mb-4">
            We reply within one business day.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Help%20Request&body=${PREFILL_BODY}`}
            target="_blank"
            className="helix-btn-primary text-sm inline-flex items-center gap-1.5"
          >
            <Mail size={13} /> Email support
          </a>
        </div>
        <div className="helix-card p-5">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${PREFILL_BODY}`}
            target="_blank"
          >
            <MessageCircle size={22} className="text-[#C9922A] mb-2" />
            <div className="font-semibold text-[14px] mb-1">
              WhatsApp / Chat
            </div>
            <p className="text-[12px] text-[#9CA3AF]">
              Mon–Fri · 9am–6pm ET
              <br />
              <span className="font-mono">+1 (202) 555 0100</span>
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
