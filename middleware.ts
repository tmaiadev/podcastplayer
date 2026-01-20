import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, parseAcceptLanguage } from './lib/i18n/constants';

const isPublicRoute = createRouteMatcher([
  '/',
  '/:lang',
  '/:lang/(.*)',
]);

function handleI18nRouting(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;

  // Check if pathname has API
  if (pathname.startsWith('/api/')) {
    return null;
  }

  // Check if pathname already has a language prefix
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return null;
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

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const i18nResponse = handleI18nRouting(request);
  if (i18nResponse) {
    return i18nResponse;
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
