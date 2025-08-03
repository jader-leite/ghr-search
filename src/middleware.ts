import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const { searchParams } = request.nextUrl;
  const errorStatus = searchParams.get('error');
  const errorMessage = searchParams.get('message');

  if (errorStatus) {
    const status = parseInt(errorStatus);
    
    switch (status) {
      case 404:
        return NextResponse.redirect(new URL('/not-found', request.url));
      case 429:
        return NextResponse.redirect(new URL('/429', request.url));
      case 500:
        return NextResponse.redirect(new URL('/500', request.url));
      default:
        const errorUrl = new URL('/error-page', request.url);
        errorUrl.searchParams.set('status', errorStatus);
        if (errorMessage) {
          errorUrl.searchParams.set('message', errorMessage);
        }
        return NextResponse.redirect(errorUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 