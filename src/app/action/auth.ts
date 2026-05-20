'use server';

import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set('token', '', {
    path: '/',
    maxAge: 0,
  });
}
