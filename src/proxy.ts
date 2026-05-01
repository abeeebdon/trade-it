import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PROTECTED_ROUTES = ['/admin', '/dashboard', '/shop/orders'];
const AUTH_ROUTES = ['/login', '/register'];
// This function can be marked `async` if using `await` inside
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔐 get token (set this after login)
  const token = req.cookies.get('token');

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/shop/orders/:path*',
    '/login',
    '/register',
  ],
};
