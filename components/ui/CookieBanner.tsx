'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ConsentState = {
  necessary: true // always true — cannot be declined
  analytics: boolean
  decided: boolean
  decidedAt: string
}

const STORAGE_KEY = 'dmgweb_cookie_consent'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // No decision yet — show banner after short delay
        setTimeout(() => setShow(true), 1200)
      }
    } catch {
      setShow(true)
    }
  }, [])

  function save(analyticsAccepted: boolean) {
    const consent: ConsentState = {
      necessary: true,
      analytics: analyticsAccepted,
      decided: true,
      decidedAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {}
    applyAnalyticsConsent(analyticsAccepted)
    setShow(false)
  }

  function applyAnalyticsConsent(granted: boolean) {
    if (typeof window === 'undefined') return
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (!gaId || !(window as any).gtag) return
    ;(window as any).gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    })
  }

  function acceptAll() { save(true) }
  function acceptNecessary() { save(false) }
  function savePreferences() { save(analytics) }

  if (!show) return null

  return (
    <>
      {/* Backdrop blur on mobile */}
      <div
        className="fixed inset-0 z-[499] lg:hidden"
        style={{
          background: 'rgba(9,17,31,0.5)',
          backdropFilter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        className="fixed bottom-0 inset-x-0 z-[500]
          lg:bottom-6 lg:left-auto lg:right-6
          lg:max-w-[420px] lg:inset-x-auto"
        style={{
          background: 'var(--clr-surface)',
          border: '1px solid var(--clr-border-soft)',
          borderBottom: 'none',
          borderRadius: '14px 14px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: '20px' }} aria-hidden="true">🍪</span>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--clr-text)', margin: 0 }}>
              Cookie preferences
            </h2>
          </div>
          {/* Security badge */}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--clr-accent)',
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
              padding: '3px 8px',
              borderRadius: '20px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            GDPR
          </span>
        </div>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--clr-text-muted)',
            lineHeight: 1.65,
            marginBottom: '16px',
          }}
        >
          We use strictly necessary cookies to make this site work. With your consent we may also use analytics cookies to improve your experience. We never use advertising or tracking cookies.
        </p>

        {/* Expandable preferences */}
        {expanded && (
          <div
            style={{
              background: 'var(--clr-surface-2)',
              border: '1px solid var(--clr-border)',
              borderRadius: '8px',
              padding: '14px',
              marginBottom: '16px',
            }}
          >
            {/* Necessary — locked on */}
            <div
              className="flex items-center justify-between mb-3 pb-3"
              style={{ borderBottom: '1px solid var(--clr-border)' }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--clr-text)' }}>
                  Strictly necessary
                </div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '2px' }}>
                  Session, security, form functionality
                </div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--clr-green)',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                }}
              >
                Always on
              </div>
            </div>

            {/* Cloudflare Turnstile — locked on */}
            <div
              className="flex items-center justify-between mb-3 pb-3"
              style={{ borderBottom: '1px solid var(--clr-border)' }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--clr-text)' }}>
                  Security (Cloudflare Turnstile)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '2px' }}>
                  Bot protection on contact form. Privacy-first — no ad tracking.
                </div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--clr-green)',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                }}
              >
                Always on
              </div>
            </div>

            {/* Analytics — toggleable */}
            <div className="flex items-center justify-between">
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--clr-text)' }}>
                  Analytics
                </div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '2px' }}>
                  Anonymous page views. No personal data.
                </div>
              </div>
              <button
                onClick={() => setAnalytics(!analytics)}
                role="switch"
                aria-checked={analytics}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                  background: analytics ? 'var(--clr-accent)' : 'var(--clr-surface-3)',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '3px',
                    left: analytics ? '23px' : '3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left 0.2s',
                  }}
                />
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={acceptAll}
            style={{
              width: '100%',
              minHeight: '44px',
              background: 'var(--clr-accent)',
              color: '#07111f',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            Accept all cookies
          </button>

          <div className="flex gap-2">
            <button
              onClick={acceptNecessary}
              style={{
                flex: 1,
                minHeight: '40px',
                background: 'transparent',
                color: 'var(--clr-text-soft)',
                fontWeight: 600,
                fontSize: '13px',
                borderRadius: '6px',
                cursor: 'pointer',
                border: '1px solid var(--clr-border-soft)',
                transition: 'border-color 0.15s',
              }}
            >
              Necessary only
            </button>

            {expanded ? (
              <button
                onClick={savePreferences}
                style={{
                  flex: 1,
                  minHeight: '40px',
                  background: 'transparent',
                  color: 'var(--clr-accent)',
                  fontWeight: 600,
                  fontSize: '13px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: '1px solid rgba(6,182,212,0.4)',
                }}
              >
                Save preferences
              </button>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                style={{
                  flex: 1,
                  minHeight: '40px',
                  background: 'transparent',
                  color: 'var(--clr-text-muted)',
                  fontWeight: 500,
                  fontSize: '13px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: '1px solid var(--clr-border)',
                }}
              >
                Manage preferences
              </button>
            )}
          </div>
        </div>

        {/* Footer links */}
        <p
          style={{
            fontSize: '11px',
            color: 'var(--clr-text-muted)',
            textAlign: 'center',
            marginTop: '12px',
          }}
        >
          <Link
            href="/privacy"
            style={{
              color: 'var(--clr-accent)',
              textDecoration: 'none',
            }}
          >
            Privacy Policy
          </Link>
          {' · '}
          <Link
            href="/terms"
            style={{
              color: 'var(--clr-accent)',
              textDecoration: 'none',
            }}
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </>
  )
}

