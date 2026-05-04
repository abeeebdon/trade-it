'use client';

import { useAppSelector } from '@/hooks/store/store';
import { useRouter } from 'next/navigation';

const RedirectUser = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  if (user?.role == 'admin') {
    return router.push('/admin');
  } else if (user?.role == 'exporter') {
    return router.push('/exporter');
  }
  return router.push('/');
};

export default RedirectUser;
