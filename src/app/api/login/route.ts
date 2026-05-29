import api from '@/configs/api-config';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = 'jompTrade';

export async function POST(req: Request) {
  const body = await req.json();
  const resp = await api.get('/authentication');

  const { email } = body;

  let role: string;

  if (email === 'admin@jomptrade.com') {
    role = 'admin';
  } else if (email === 'buyer@jomptrade.com') {
    role = 'buyer';
  } else if (email === 'shopper@jomptrade.com') {
    role = 'consumer';
  } else {
    role = 'exporter';
  }

  const token = jwt.sign(
    {
      id: email,
      email,
      role,
    },
    JWT_SECRET,
    { expiresIn: '2d' },
  );

  const response = NextResponse.json({
    role,
    email,
    resp,
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
