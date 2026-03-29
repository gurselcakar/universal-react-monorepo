import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const proxy = (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
};

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /sign-in, /sign-up (public auth pages)
     * - /api/auth/* (Better Auth endpoints)
     * - /_next/* (Next.js internals)
     * - /favicon.ico, static files
     */
    '/((?!sign-in|sign-up|api/auth|_next|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
  ],
}
