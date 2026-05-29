import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

type UserRole = 'admin' | 'super_admin' | 'buyer' | 'exporter' | 'consumer';

const AUTH_ROUTES = ['/login', '/register'];

const ROLE_ROUTES: Record<string, UserRole[]> = {
  '/admin': ['admin', 'super_admin'],
  '/buyer': ['buyer'],
  '/exporter': ['exporter'],
  '/shop/orders': ['consumer'],
};
const JWT_SECRET = 'jompTrade';

const secret = new TextEncoder().encode(JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload as {
      id: string;
      email: string;
      role: UserRole;
    };
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('token')?.value;

  const matchedRoute = Object.keys(ROLE_ROUTES).find((route) =>
    pathname.startsWith(route),
  );

  const isProtected = !!matchedRoute;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // No token → protected route
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logged in user → auth page
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/user', req.url));
  }

  // Protected route role check
  if (token && matchedRoute) {
    const user = await verifyToken(token);

    // Invalid/expired token
    if (!user) {
      const response = NextResponse.redirect(new URL('/login', req.url));

      response.cookies.delete('token');

      return response;
    }

    const allowedRoles = ROLE_ROUTES[matchedRoute];

    const hasAccess = allowedRoles.includes(user.role);

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/buyer/:path*',
    '/exporter/:path*',
    '/dashboard/:path*',
    '/shop/orders/:path*',
    '/login',
    '/user',
    '/register',
  ],
};
