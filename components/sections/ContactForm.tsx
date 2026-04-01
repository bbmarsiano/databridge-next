'use client'

import { useState } from 'react'
import TurnstileWidget from '@/components/ui/TurnstileWidget'

interface ContactFormProps {
  compact?: boolean
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Turnstile state
  const [turnstileToken,   setTurnstileToken]   = useState<string>('')
  const [turnstileExpired, setTurnstileExpired] = useState(false)
  const [turnstileError,   setTurnstileError]   = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // ── Field validation ──────────────────────────────
    const newErrors: Record<string, string> = {}
    if (!data.name?.toString().trim())
      newErrors.name = 'Please enter your name'
    if (!data.email?.toString().trim())
      newErrors.email = 'Please enter your email'
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string))
      newErrors.email = 'Please enter a valid email address'

    // ── Turnstile validation ──────────────────────────
    // Only enforce if site key is configured (production)
    const siteKeyConfigured = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (siteKeyConfigured && !turnstileToken) {
      newErrors.captcha = 'Please complete the security check before sending.'
    }
    if (siteKeyConfigured && turnstileExpired) {
      newErrors.captcha = 'Security check expired — please verify again.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to first error
      return
    }

    setStatus('loading')
    setErrors({})

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, turnstileToken }),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
        setTurnstileToken('')
        // Fire GA4 conversion event
        if (typeof window !== 'undefined' &&
            (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submit', {
            event_category: 'engagement',
            event_label:    'contact_form',
            value:          1,
          })
        }
      } else {
        const body = await res.json().catch(() => ({}))
        // Surface the server-side error message if available
        if (body?.error) {
          setErrors({ captcha: body.error })
          setStatus('idle')
        } else {
          setStatus('error')
        }
      }
    } catch {
      setStatus('error')
    }
  }

  // ── Success state ─────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="text-center py-16 px-6 rounded-[14px]"
        style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
      >
        <div className="text-[48px] mb-4">✉️</div>
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontSize: '24px',
          fontWeight: 400, marginBottom: '12px', color: 'var(--clr-text)',
        }}>
          Message received.
        </h3>
        <p className="text-[15px] text-[var(--clr-text-soft)] max-w-[340px] mx-auto leading-[1.75]">
          Nikolay or Maria will be in touch within one business day.
          If it&apos;s urgent, call us on +359 892 738 290.
        </p>
      </div>
    )
  }

  const inputCls = `w-full rounded-[8px] px-4 py-3.5 text-[16px] text-[var(--clr-text)] transition-all outline-none`
  const inputStyle = { background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border-soft)', minHeight: '44px' }
  const focusStyle = 'focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(6,182,212,.12)]'

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">

      {/* Name + Email */}
      <div className={`grid gap-4 mb-4 ${compact ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div>
          <label htmlFor="name"
            className="block text-[13px] font-medium text-[var(--clr-text-soft)] mb-1.5">
            Name <abbr title="required" className="text-[var(--clr-accent)] no-underline">*</abbr>
          </label>
          <input
            type="text" id="name" name="name"
            placeholder="Your full name"
            required autoComplete="name"
            className={`${inputCls} ${focusStyle} ${errors.name ? 'border-red-500' : ''}`}
            style={inputStyle}
          />
          {errors.name && (
            <p className="text-[12px] text-red-400 mt-1" role="alert">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email"
            className="block text-[13px] font-medium text-[var(--clr-text-soft)] mb-1.5">
            Work email <abbr title="required" className="text-[var(--clr-accent)] no-underline">*</abbr>
          </label>
          <input
            type="email" id="email" name="email"
            placeholder="your-email@your-company.com"
            required autoComplete="email"
            className={`${inputCls} ${focusStyle} ${errors.email ? 'border-red-500' : ''}`}
            style={inputStyle}
          />
          {errors.email && (
            <p className="text-[12px] text-red-400 mt-1" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="mb-4">
        <label htmlFor="company"
          className="block text-[13px] font-medium text-[var(--clr-text-soft)] mb-1.5">
          Company
        </label>
        <input
          type="text" id="company" name="company"
          placeholder="Your company name"
          autoComplete="organization"
          className={`${inputCls} ${focusStyle}`}
          style={inputStyle}
        />
      </div>

      {/* Service */}
      <div className="mb-4">
        <label htmlFor="service"
          className="block text-[13px] font-medium text-[var(--clr-text-soft)] mb-1.5">
          I&apos;m interested in…
        </label>
        <select
          id="service" name="service"
          className={`${inputCls} ${focusStyle} cursor-pointer`}
          style={{
            ...inputStyle,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238094aa' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            paddingRight: '38px',
            WebkitAppearance: 'none',
          }}
        >
          <option value="">— Choose a service —</option>
          <option value="edifact">EDIFACT Integration</option>
          <option value="erp">ERP Implementation</option>
          <option value="software">Custom Software Development</option>
          <option value="cyber">Cybersecurity Assessment</option>
          <option value="consulting">IT Consulting</option>
          <option value="other">Not sure yet</option>
        </select>
      </div>

      {/* Message */}
      <div className="mb-4">
        <label htmlFor="message"
          className="block text-[13px] font-medium text-[var(--clr-text-soft)] mb-1.5">
          Tell us about your project
        </label>
        <textarea
          id="message" name="message"
          placeholder="Your business domain for EDI, current ERP, trading partners, what you're trying to automate…"
          rows={4}
          className={`${inputCls} ${focusStyle} resize-y`}
          style={{ ...inputStyle, minHeight: '120px', lineHeight: '1.65' }}
        />
      </div>

      {/* ── Cloudflare Turnstile ───────────────────── */}
      <TurnstileWidget
        action="contact"
        onVerify={(token) => {
          setTurnstileToken(token)
          setTurnstileExpired(false)
          setTurnstileError(false)
          // Clear captcha error as soon as verified
          setErrors((prev) => {
            const next = { ...prev }
            delete next.captcha
            return next
          })
        }}
        onExpire={() => {
          setTurnstileToken('')
          setTurnstileExpired(true)
        }}
        onError={() => {
          setTurnstileToken('')
          setTurnstileError(true)
        }}
      />

      {/* Captcha error message */}
      {errors.captcha && (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-[6px] mb-3"
          style={{ background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)' }}
          role="alert"
        >
          <span className="text-red-400 flex-shrink-0">⚠</span>
          <p className="text-[12px] text-red-400">{errors.captcha}</p>
        </div>
      )}

      {/* Turnstile error (widget failed to load) */}
      {turnstileError && !errors.captcha && (
        <p className="text-[12px] text-[var(--clr-text-muted)] mb-3">
          Security check unavailable. Your message will still be reviewed manually.
        </p>
      )}

      {/* GDPR notice */}
      <p className="text-[12px] text-[var(--clr-text-muted)] mb-4 leading-[1.7]">
        <a href="/privacy" className="text-[var(--clr-accent)] hover:underline">
          GDPR compliant
        </a>
        {' · We never share your data · Reply within 1 business day'}
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 font-semibold text-[15px] rounded-[5px] transition-all"
        style={{
          minHeight: '44px',
          background: status === 'loading' ? 'var(--clr-surface-3)' : 'var(--clr-accent)',
          color: '#07111f',
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message →'}
      </button>

      {/* Generic error */}
      {status === 'error' && (
        <p className="mt-3 text-[13px] text-red-400 text-center" role="alert">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:contact@dmg-web.net"
            className="underline hover:text-red-300">
            contact@dmg-web.net
          </a>
        </p>
      )}
    </form>
  )
}
