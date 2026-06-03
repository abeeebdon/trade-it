import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserRole = 'admin' | 'super_admin' | 'reseller' | 'exporter' | 'consumer';

const AUTH_ROUTES = ['/login', '/register', '/getstarted'];

const ROLE_ROUTES: Record<string, UserRole[]> = {
  '/admin': ['admin', 'super_admin'],
  '/buyer': ['reseller'],
  '/exporter': ['exporter'],
  '/shop/orders': ['consumer'],
};

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
    const role = req.cookies.get('role')?.value as UserRole | undefined;

    // Invalid/expired token

    if (!role) {
      const response = NextResponse.redirect(new URL('/login', req.url));

      response.cookies.delete('token');

      return response;
    }

    const allowedRoles = ROLE_ROUTES[matchedRoute];

    const hasAccess = allowedRoles.includes(role);

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
    '/getstarted',
  ],
};
