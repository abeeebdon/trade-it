'use client';

import { useState } from 'react';
import { CircleHelp, Mail, MessageCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does shipping from Nigeria to the US take?',
    a: 'Direct-from-Africa orders typically arrive in 10–14 business days once they clear US customs. Locally stocked items ship within 48 hours.',
  },
  {
    q: "What's the Journey Tracker?",
    a: "It's our signature 6-step live tracker that shows your order's status from Lagos → Packed → Left Nigeria → In Transit → US Customs → Delivered to You.",
  },
  {
    q: 'How does escrow protect me?',
    a: "Your payment is held by Riby Inc until you confirm delivery. If something's wrong, we mediate a refund from the seller.",
  },
  {
    q: 'Can I return an item?',
    a: 'Yes — you have 14 days from delivery to open a return request. Perishable and custom-made items are non-returnable.',
  },
  {
    q: 'Which payment methods can I use?',
    a: 'Credit / debit cards, Zelle, and US ACH transfers. All payments are held in escrow until delivery.',
  },
];

const WA_NUMBER = '+2349039357065';
const SUPPORT_EMAIL = 'support@jompshop.com';
const PREFILL_BODY = 'Hi JompShop,%0A%0AI%20am%20';

export default function Help() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <main>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          <div className="helix-h3 mb-2">Frequently asked questions</div>
          {FAQS.map((f, i) => (
            <div key={i} className="helix-card p-0 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-[14px]">{f.q}</span>
                <ChevronDown
                  size={14}
                  className={`text-[#C9922A] transition-transform ${
                    openIdx === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4 text-[13px] text-[#9CA3AF] leading-6">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-4">
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
      </div>
    </main>
  );
}
