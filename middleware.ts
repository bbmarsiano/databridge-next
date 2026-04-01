import { NextRequest, NextResponse } from 'next/server'

const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD ?? 'dmgweb2025'
const UNDER_CONSTRUCTION = process.env.UNDER_CONSTRUCTION === 'true'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  // Always allow these paths through
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/logos/') ||
    pathname.startsWith('/images/') ||
    pathname === '/under-construction' ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next()
  }

  // If not under construction — serve normally
  if (!UNDER_CONSTRUCTION) {
    return NextResponse.next()
  }

  // Under construction — check for preview cookie or param
  const cookie = req.cookies.get('preview')?.value
  const param  = searchParams.get('preview')

  if (cookie === PREVIEW_PASSWORD || param === PREVIEW_PASSWORD) {
    const res = NextResponse.next()
    if (param === PREVIEW_PASSWORD) {
      // Set cookie so subsequent requests don't need the param
      res.cookies.set('preview', PREVIEW_PASSWORD, {
        httpOnly: true,
        maxAge:   60 * 60 * 24 * 7, // 7 days
        path:     '/',
        sameSite: 'lax',
      })
    }
    return res
  }

  // Redirect to under-construction page
  const url = req.nextUrl.clone()
  url.pathname = '/under-construction'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

