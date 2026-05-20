'use client';

import { useAppSelector } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const RedirectUser = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return;

  if (user.role === 'admin') {
    return router.push('/admin');
  } else if (user.role === 'exporter') {
    return router.push('/exporter');
  } else if (user.role === 'shopper') {
    return router.push('/exporter');
  } else {
    toast.error('You are logged in');
    router.push('/');
    return;
  }
};

export default RedirectUser;
