'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppSelector } from '@/hooks/store/store';

interface ConsumerShellProps {
  children: ReactNode;
  title: ReactNode;
  kicker?: ReactNode;
  actions?: ReactNode;
}

export default function ConsumerShell({
  children,
  title,
  kicker,
  actions,
}: ConsumerShellProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [cart, setCart] = useState(0);
  const [orderBadge, setOrderBadge] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#F5F5F5] w-full flex">
      <Sidebar user={user} orderBadge={orderBadge} onSignOut={() => {}} />
      <div className="flex-1 min-w-0 bg-[#1E0038]">
        <Header
          title={title}
          kicker={kicker}
          actions={actions}
          cartCount={cart}
        />
        <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 fade-up">
          {children}
        </main>
      </div>
    </div>
  );
}
