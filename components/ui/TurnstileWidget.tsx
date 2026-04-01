'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Props {
  onVerify:  (token: string) => void
  onExpire?: () => void
  onError?:  () => void
  action?:   string
}

declare global {
  interface Window {
    turnstile?: {
      render:  (el: HTMLElement, opts: object) => string
      reset:   (id: string) => void
      remove:  (id: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

export default function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  action = 'form',
}: Props) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const widgetIdRef    = useRef<string | null>(null)
  const renderedRef    = useRef(false)   // prevents double-render
  const widgetReadyRef = useRef(false)   // prevents auto-submit

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

  const renderWidget = useCallback(() => {
    // Guard: only render once per mount
    if (renderedRef.current) return
    if (!containerRef.current || !window.turnstile || !siteKey) return

    renderedRef.current = true

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme:   'dark',
      size:    'flexible',
      action,
      callback: (token: string) => {
        // Only accept token after widget has had
        // 800ms to render — prevents auto-submit on load
        if (widgetReadyRef.current) {
          onVerify(token)
        }
      },
      'expired-callback': () => {
        widgetReadyRef.current = false
        onExpire?.()
      },
      'error-callback': () => {
        onError?.()
      },
    })

    // Mark widget as ready after 800ms
    // Any auto-verification before this is ignored
    setTimeout(() => {
      widgetReadyRef.current = true
    }, 800)
  }, [siteKey, action, onVerify, onExpire, onError])

  useEffect(() => {
    // No site key — dev bypass
    if (!siteKey) {
      setTimeout(() => onVerify('dev-bypass-token'), 100)
      return
    }

    // Script already in DOM
    const existing = document.getElementById('cf-turnstile-script')
    if (existing) {
      if (window.turnstile) renderWidget()
      else window.onTurnstileLoad = renderWidget
      return
    }

    // First load — inject script
    window.onTurnstileLoad = renderWidget

    const script    = document.createElement('script')
    script.id       = 'cf-turnstile-script'
    script.src      = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit'
    script.async    = true
    script.defer    = true
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {}
        widgetIdRef.current = null
      }
      renderedRef.current    = false
      widgetReadyRef.current = false
    }
  }, [siteKey, renderWidget])

  // Nothing to render if no site key configured
  if (!siteKey) return null

  return (
    <div
      ref={containerRef}
      style={{
        margin:       '8px 0',
        borderRadius: '8px',
        overflow:     'hidden',
        border:       '1px solid rgba(148,163,184,.15)',
        background:   'var(--clr-surface-2)',
        minHeight:    '65px',
        display:      'flex',
        alignItems:   'center',
      }}
      aria-label="Security verification"
    />
  )
}

