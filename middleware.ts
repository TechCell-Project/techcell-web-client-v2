import { NextRequest, NextResponse } from 'next/server';
import { RootPath } from './constants';
import { apiAuthPrefix, authRoutes, needAuthRoutes } from './routes';

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;
  const haveSessionToken = !!sessionToken;
  const response = NextResponse.next();
  console.log(`ROUTE: ${pathname} - ${haveSessionToken ? 'Have session' : 'No session'}`);
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isNeedAuthRoute = needAuthRoutes.includes(pathname);

  // save current pathname to cookies for redirect after authenticate
  if (!isAuthRoute && !isApiAuthRoute) response.cookies.set('stored-pathname', pathname);

  // redirect previous route if already have session(is logged in) when accessing auth routes
  if (isAuthRoute && haveSessionToken) {
    const storedPathname = request.cookies.get('stored-pathname')?.value;

    return storedPathname
      ? NextResponse.redirect(new URL(storedPathname, request.nextUrl))
      : NextResponse.redirect(new URL(RootPath.Home, request.nextUrl));
  }

  // not allow access to private routes if not authenticated
  if (isNeedAuthRoute && !haveSessionToken) {
    let callbackUrl = pathname;
    if (search) {
      callbackUrl += search;
    }

    return NextResponse.redirect(
      new URL(`${RootPath.Login}?callbackUrl=${callbackUrl}`, request.nextUrl),
    );
  }

  return response;
}
