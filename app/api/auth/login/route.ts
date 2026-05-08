import { NextRequest, NextResponse } from 'next/server'
import { isValidPassword } from '@/lib/isValidPassword'
import { createSessionToken, SESSION_COOKIE } from '@/lib/session'

type Cred = { user: string; hash: string }

function getCredentials(): Cred[] {
  const creds: Cred[] = []
  if (process.env.ADMIN_USERNAME && process.env.HASHED_ADMIN_PASSWORD) {
    creds.push({ user: process.env.ADMIN_USERNAME, hash: process.env.HASHED_ADMIN_PASSWORD })
  }
  if (process.env.ADMIN_USERNAME_A && process.env.HASHED_ADMIN_PASSWORD_A) {
    creds.push({ user: process.env.ADMIN_USERNAME_A, hash: process.env.HASHED_ADMIN_PASSWORD_A })
  }
  if (process.env.ADMIN_USERNAME_B && process.env.HASHED_ADMIN_PASSWORD_A) {
    creds.push({ user: process.env.ADMIN_USERNAME_B, hash: process.env.HASHED_ADMIN_PASSWORD_A })
  }
  return creds
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const creds = getCredentials()
    const match = creds.find((c) => c.user === username)

    if (!match || !(await isValidPassword(password ?? '', match.hash))) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const { value, maxAge } = await createSessionToken(match.user)
    const res = NextResponse.json({ success: true })
    res.cookies.set(SESSION_COOKIE, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
    return res
  } catch {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
