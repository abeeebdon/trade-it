'use client';
import HomePage from '@/features/landingPage/HomePage';
import ComingSoon from '@/features/waitlist/COmingSOon';
import { getSavedCookie } from '@/store/auth/cookies';
import Footer from '@/features/landingPage/components/Footer';
import Header from '@/features/landingPage/components/Header';

const page = () => {
  const modeLive = false;
  const token = getSavedCookie('token');
  return modeLive || token ? (
    <main>
      <Header />
      <div className="pt-36 px-6 lg:px-10 pb-24">
        <HomePage />
      </div>
      <Footer />
    </main>
  ) : (
    <ComingSoon />
  );
};

export default page;
