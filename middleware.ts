import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { verifySessionToken, SESSION_COOKIE } from './lib/session'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'cz'],
  defaultLocale: 'cz',
})

const ADMIN_PATH = /^\/(en|cz)?\/admin(\/|$)/
const LOGIN_PATH = /^\/(en|cz)\/admin\/login(\/|$)/

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (ADMIN_PATH.test(pathname) && !LOGIN_PATH.test(pathname)) {
    const token = req.cookies.get(SESSION_COOKIE)?.value
    const session = await verifySessionToken(token)
    if (!session) {
      const localeMatch = pathname.match(/^\/(en|cz)\b/)
      const locale = localeMatch?.[1] ?? 'cz'
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = `/${locale}/admin/login`
      loginUrl.search = `?next=${encodeURIComponent(pathname + search)}`
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/', '/(cz|en)/:path*', '/admin/:path*', '/(cz|en)/admin/:path*'],
}
