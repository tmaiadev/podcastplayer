import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, parseAcceptLanguage } from './lib/i18n/constants';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a language prefix
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect root to default language or detected language
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    const locale = acceptLanguage
      ? parseAcceptLanguage(acceptLanguage)
      : DEFAULT_LANGUAGE;

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Redirect other paths to include language prefix
  const acceptLanguage = request.headers.get('accept-language');
  const locale = acceptLanguage
    ? parseAcceptLanguage(acceptLanguage)
    : DEFAULT_LANGUAGE;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
