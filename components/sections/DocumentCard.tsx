'use client'

import { useState } from 'react'
import type { Document } from '@/lib/types'

const categoryIcons: Record<string, string> = {
  guide: '📘',
  whitepaper: '📄',
  template: '📋',
  checklist: '✅',
  default: '📎',
}

export default function DocumentCard({ doc }: { doc: Document }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [showGate, setShowGate] = useState(false)

  const icon = categoryIcons[doc.category ?? ''] ?? categoryIcons.default
  const size = doc.file_size_kb
    ? doc.file_size_kb > 1024
      ? `${(doc.file_size_kb / 1024).toFixed(1)} MB`
      : `${doc.file_size_kb} KB`
    : null

  async function handleDownload() {
    if (doc.requires_email && !showGate) {
      setShowGate(true)
      return
    }
    if (doc.requires_email && !email) {
      setError('Please enter your email to download.')
      return
    }

    setLoading(true)
    setError('')

    let win: Window | null = null

    try {
      // Open window immediately (user gesture context)
      win = window.open('', '_blank')
      if (!win) {
        // Popup blocked — fallback to same tab
        const res = await fetch('/api/documents/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: doc.id, email: email || undefined }),
        })
        const data = await res.json()
        if (data.url) window.location.href = data.url
        return
      }

      // Show loading state in the new window
      win.document.write(
        '<html><body style="background:#09111f;color:#cbd5e1;' +
        'font-family:sans-serif;display:flex;align-items:center;' +
        'justify-content:center;height:100vh;margin:0;">' +
        '<p>Preparing your download...</p></body></html>'
      )

      try {
        const res = await fetch('/api/documents/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: doc.id, email: email || undefined }),
        })
        const data = await res.json()
        if (!res.ok || !data.url) {
          win.close()
          setError(data.error ?? 'Download failed. Please try again.')
          return
        }
        // Redirect the already-open window to the PDF
        win.location.href = data.url
        setDone(true)
        // Fire GA4 conversion event
        if (typeof window !== 'undefined' &&
            (window as any).gtag) {
          (window as any).gtag('event', 'document_download', {
            event_category: 'engagement',
            event_label:    doc.title,
            value:          1,
          })
        }
      } catch {
        win.close()
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="rounded-[14px] p-6 flex flex-col gap-3 transition-all hover:-translate-y-1"
      style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
    >
      {/* Icon + category */}
      <div className="flex items-center justify-between">
        <span className="text-[28px]" aria-hidden="true">
          {icon}
        </span>
        {doc.category && (
          <span
            className="text-[10px] font-medium tracking-[.07em] px-2.5 py-1 rounded-[30px] uppercase"
            style={{
              background: 'var(--clr-surface-2)',
              color: 'var(--clr-text-muted)',
              border: '1px solid var(--clr-border)',
            }}
          >
            {doc.category}
          </span>
        )}
      </div>

      {/* Title + description */}
      <h3 className="text-[16px] leading-[1.4]">{doc.title}</h3>
      {doc.description && (
        <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7] flex-1">
          {doc.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-[var(--clr-text-muted)]">
        {size && <span>📁 {size}</span>}
        {doc.download_count > 0 && <span>⬇ {doc.download_count} downloads</span>}
        {doc.requires_email && <span className="text-[var(--clr-accent)]">📧 Email required</span>}
      </div>

      {/* Email gate */}
      {showGate && !done && (
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="your-email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[8px] px-3 py-2.5 text-[14px] text-[var(--clr-text)] outline-none"
            style={{
              background: 'var(--clr-surface-2)',
              border: '1px solid var(--clr-border-soft)',
              fontSize: '16px',
            }}
          />
          {error && <p className="text-[12px] text-red-400">{error}</p>}
        </div>
      )}

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={loading || done}
        className="flex items-center justify-center gap-2 font-semibold text-[14px] rounded-[5px] transition-all mt-auto"
        style={{
          minHeight: '44px',
          background: done ? 'var(--clr-surface-2)' : 'var(--clr-accent)',
          color: done ? 'var(--clr-text-muted)' : '#07111f',
          border: 'none',
          cursor: loading || done ? 'default' : 'pointer',
        }}
      >
        {done
          ? '✓ Downloaded'
          : loading
            ? 'Preparing…'
            : `⬇ Download${doc.requires_email ? ' (free)' : ''}`}
      </button>
    </div>
  )
}

