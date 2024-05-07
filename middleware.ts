import { NextRequest, NextResponse } from 'next/server';
import { RootPath } from './constants';
import { apiAuthPrefix, authRoutes, needAuthRoutes } from './routes';

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const haveAccessToken = !!accessToken;
  const response = NextResponse.next();
  console.log(`ROUTE: ${pathname} - ${haveAccessToken ? 'Have access' : 'No access'}`);
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isNeedAuthRoute = needAuthRoutes.includes(pathname);

  // save current pathname to cookies for redirect after authenticate
  if (!isAuthRoute && !isApiAuthRoute) response.cookies.set('stored-pathname', pathname);

  // redirect previous route if already have accessToken(is logged in) when accessing auth routes
  if (isAuthRoute && haveAccessToken) {
    const storedPathname = request.cookies.get('stored-pathname')?.value;

    return storedPathname
      ? NextResponse.redirect(new URL(storedPathname, request.nextUrl))
      : NextResponse.redirect(new URL(RootPath.Home, request.nextUrl));
  }

  // not allow access to private routes if not authenticated
  if (isNeedAuthRoute && !haveAccessToken) {
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
