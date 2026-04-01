'use client'

import { useState } from 'react'
import type { Document } from '@/lib/types'

export default function GuideDownloadButton({ doc }: { doc: Document }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleDownload() {
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
          body: JSON.stringify({ id: doc.id }),
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
          body: JSON.stringify({ id: doc.id }),
        })
        const data = await res.json()
        if (!res.ok || !data.url) {
          win.close()
          setError('Download failed. Please try again.')
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
            event_label:    'edifact_starter_guide',
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
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={loading || done}
        className="flex flex-col items-center justify-center gap-1
            font-semibold text-[14px] px-10 py-5 rounded-[5px]
            transition-all hover:-translate-y-px active:translate-y-0"
        style={{
          background: done ? 'var(--clr-surface-2)' : 'var(--clr-accent)',
          color: done ? 'var(--clr-text-muted)' : '#07111f',
          border: 'none',
          cursor: loading || done ? 'default' : 'pointer',
          minWidth: '200px',
          minHeight: '60px',
        }}
      >
        <span>{done ? '✓ Downloaded' : loading ? 'Preparing…' : '📘 Download Free'}</span>
        {!done && (
          <span style={{ fontSize: '11px', fontWeight: 400, opacity: 0.7 }}>
            PDF · {doc.file_size_kb ? `${doc.file_size_kb} KB` : '412 KB'} · No signup
          </span>
        )}
      </button>

      {error && (
        <p style={{ fontSize: '12px', color: '#f87171', textAlign: 'center' }}>
          {error}
        </p>
      )}

      {doc.download_count > 0 && !done && (
        <p style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textAlign: 'center' }}>
          ⬇ Downloaded {doc.download_count} times
        </p>
      )}
    </div>
  )
}

