import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { isValidPassword } from './lib/isValidPassword'

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'cz'],
  defaultLocale: 'cz',
})

export async function middleware(req: NextRequest) {
  // Check if the request is for the admin route
  if (req.nextUrl.pathname.match(/^\/(en|cz)?\/admin/)) {
    if (!(await isAuthenticated(req))) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
      })
    }
  }

  // Apply internationalization middleware
  return intlMiddleware(req)
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get('authorization') || req.headers.get('Authorization')

  if (authHeader == null) return false

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':')

  return (
    username === process.env.ADMIN_USERNAME ||
    username === process.env.ADMIN_USERNAME_A ||
    (username === process.env.ADMIN_USERNAME_B &&
      (await isValidPassword(
        password,
        process.env.HASHED_ADMIN_PASSWORD_A as string
      )))
  )
}

export const config = {
  matcher: ['/', '/(cz|en)/:path*', '/admin/:path*', '/(cz|en)/admin/:path*'],
}
