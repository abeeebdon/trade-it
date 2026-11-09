'use client';
import { toastProxyMessages } from '../components/constants';
import BenefitsSection from '../components/BenefitsSection';
import DashboardShowcaseSection from '../components/DashboardShowcaseSection';
import EcosystemSection from '../components/EcosystemSection';
import FaqSection from '../components/FaqSection';
import FinalCtaSection from '../components/FinalCtaSection';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TrustSection from '../components/TrustSection';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

const NewExporterLandingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const m = searchParams.get('m');
    if (m && [toastProxyMessages[parseInt(m)]]) {
      toast.error(toastProxyMessages[parseInt(m)] ?? 'Oops');

      // Remove the message from the URL after displaying it
      const url = new URL(window.location.href);
      url.searchParams.delete('m');

      router.replace(url.pathname + url.search, {
        scroll: false,
      });
    }
  }, [searchParams, router]);
  return (
    <main className="">
      <HeroSection />

      <BenefitsSection />

      <HowItWorksSection />

      <EcosystemSection />

      <DashboardShowcaseSection />

      <TrustSection />

      <FaqSection />

      <FinalCtaSection />
    </main>
  );
};

export default NewExporterLandingPage;
