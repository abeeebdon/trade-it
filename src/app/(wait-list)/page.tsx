'use client';
import HomePage from '@/features/landingPage/HomePage';
import ComingSoon from '@/features/waitlist/COmingSOon';
import { getSavedCookie } from '@/store/auth/cookies';
import Footer from '@/features/landingPage/components/Footer';
import Header from '@/features/landingPage/components/Header';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { setBeta } from '@/store/waitlist/waitlist.slice';

const Homepage = () => {
  const modeLive = false;
  const token = getSavedCookie('token');
  const dispatch = useAppDispatch();

  const isBetaPreview = useAppSelector((state) => state.wait.beta);
  const exitBeta = () => {
    dispatch(setBeta(false));
  };
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
      <Header className="overflow-hidden w-full dark:bg-[#0A1628]/85 bg-[#ffffffee] backdrop-blur border-b border-[#1A7A6E]/15 sticky! top-0 z-30" />
      <div className="pt-6 sm:px-6 min-[500]:px-4 px-2 lg:px-10 pb-24">
        <HomePage />
      </div>
      <Footer />
    </main>
  ) : (
    <ComingSoon />
  );
};

export default Homepage;
