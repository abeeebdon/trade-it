'use client';

import { useEffect, ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 100,
      mirror: true,
    });
  }, []);

  return <>{children}</>;
}
