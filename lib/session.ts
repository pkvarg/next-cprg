const SECRET = process.env.NEXTAUTH_SECRET
if (!SECRET) throw new Error('NEXTAUTH_SECRET is not set')

const COOKIE_NAME = 'admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

type Payload = { u: string; exp: number }

function b64urlEncode(bytes: Uint8Array): string {
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4))
  const s = atob(input.replace(/-/g, '+').replace(/_/g, '/') + pad)
  const out = new Uint8Array(s.length)
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i)
  return out
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

async function sign(payload: string): Promise<string> {
  const key = await getKey()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return b64urlEncode(new Uint8Array(sig))
}

async function verifySig(payload: string, signature: string): Promise<boolean> {
  const key = await getKey()
  return crypto.subtle.verify(
    'HMAC',
    key,
    b64urlDecode(signature),
    new TextEncoder().encode(payload)
  )
}

export async function createSessionToken(username: string): Promise<{ value: string; maxAge: number }> {
  const payload: Payload = { u: username, exp: Date.now() + MAX_AGE_SECONDS * 1000 }
  const payloadStr = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)))
  const signature = await sign(payloadStr)
  return { value: `${payloadStr}.${signature}`, maxAge: MAX_AGE_SECONDS }
}

export async function verifySessionToken(token: string | undefined | null): Promise<Payload | null> {
  if (!token) return null
  const [payloadStr, signature] = token.split('.')
  if (!payloadStr || !signature) return null
  const ok = await verifySig(payloadStr, signature)
  if (!ok) return null
  try {
    const json = new TextDecoder().decode(b64urlDecode(payloadStr))
    const payload = JSON.parse(json) as Payload
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export const SESSION_COOKIE = COOKIE_NAME
