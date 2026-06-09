'use client';
import HomePage from '@/features/landingPage/HomePage';
import ComingSoon from '@/features/waitlist/COmingSOon';
import { getSavedCookie } from '@/store/auth/cookies';
import Footer from '@/features/landingPage/components/Footer';
import Header from '@/features/landingPage/components/Header';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const Homepage = () => {
  const modeLive = false;
  const token = getSavedCookie('token');
  const [isBetaPreview, setIsBetaPreview] = useState(false);
  const exitBeta = () => {
    setIsBetaPreview(false);
  };
  console.log(isBetaPreview);
  return modeLive || token || isBetaPreview ? (
    <main>
      {isBetaPreview && (
        <div className="bg-[#EFA005]  w-full text-[#1E0038] text-[12px] font-mono tracking-wider uppercase">
          <div className="max-w-350 mx-auto px-6 lg:px-10 py-2 flex items-center justify-between gap-4 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E0038] animate-pulse" />
              Beta Preview · Marketplace launching soon
            </span>
            <button
              onClick={exitBeta}
              className="inline-flex cursor-pointer items-center gap-1.5 underline underline-offset-2 hover:text-[#31005C]"
            >
              <ArrowLeft size={12} /> Back to Waitlist
            </button>
          </div>
        </div>
      )}
      <Header className="relative!" />
      <div className="pt-36 px-6 lg:px-10 pb-24">
        <HomePage />
      </div>
      <Footer />
    </main>
  ) : (
    <ComingSoon setIsBetaPreview={setIsBetaPreview} />
  );
};

export default Homepage;
