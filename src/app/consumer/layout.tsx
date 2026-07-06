import { ReactNode } from 'react';
import ConsumerShell from '@/features/consumer/layout/ConsumerShell';

export default function ConsumerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ConsumerShell
      title="Consumer Dashboard"
      kicker="Welcome to the consumer dashboard"
      actions={<div>Actions</div>}
    >
      {children}
    </ConsumerShell>
  );
}
