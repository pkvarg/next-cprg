'use client'

import { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Lock, User, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()
  const params = useParams()
  const search = useSearchParams()
  const locale = (params?.locale as string) || 'cz'
  const next = search.get('next') || `/${locale}/admin`

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.message || 'Sign in failed')
        return
      }
      router.replace(next)
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sacred-dark px-4 py-12 relative overflow-hidden font-lato">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sacred-gold/15 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sacred-terracotta/15 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-sm border border-white/10 bg-sacred-deep/80 backdrop-blur-sm shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 rounded-full bg-gradient-to-br from-sacred-gold/15 to-sacred-terracotta/15 border border-sacred-gold/30 mb-4">
              <ShieldCheck className="w-8 h-8 text-sacred-gold" />
            </div>
            <p className="font-cormorant text-[0.8rem] uppercase tracking-[0.3em] text-sacred-gold mb-3 italic">
              Admin
            </p>
            <h1 className="font-cormorant font-semibold italic text-[2rem] text-sacred-cream tracking-wide">
              Sign In
            </h1>
            <p className="text-sm text-sacred-cream/60 mt-2 font-lato">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label
                htmlFor="username"
                className="block text-xs uppercase tracking-wider text-sacred-cream/60 mb-2 font-lato"
              >
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sacred-cream/40">
                  <User size={18} />
                </span>
                <input
                  id="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-sm bg-sacred-dark/60 border border-white/15 text-sacred-cream placeholder-sacred-cream/30 focus:outline-none focus:border-sacred-gold/60 focus:ring-2 focus:ring-sacred-gold/20 transition"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider text-sacred-cream/60 mb-2 font-lato"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sacred-cream/40">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-sm bg-sacred-dark/60 border border-white/15 text-sacred-cream placeholder-sacred-cream/30 focus:outline-none focus:border-sacred-gold/60 focus:ring-2 focus:ring-sacred-gold/20 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sacred-cream/40 hover:text-sacred-cream transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-sm border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-rose-300 font-lato"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-sacred-gold text-sacred-dark font-cormorant font-semibold uppercase tracking-[0.2em] text-sm hover:bg-sacred-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-sacred-gold/20"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-sacred-cream/40 mt-6 font-lato italic">
          Protected area · authorized personnel only
        </p>
      </div>
    </div>
  )
}
