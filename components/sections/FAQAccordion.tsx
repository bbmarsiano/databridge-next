'use client'

import { useState } from 'react'

interface FAQItem { q: string; a: string }

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-px rounded-[14px] overflow-hidden" style={{ background: 'var(--clr-border)', border: '1px solid var(--clr-border)' }}>
      {items.map((item, i) => (
        <div key={i} className={`faq-item${openIdx === i ? ' open' : ''}`} style={{ background: 'var(--clr-surface)' }}>
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-[var(--clr-text)] transition-colors hover:bg-[var(--clr-surface-2)]"
            style={{ background: 'none', border: 'none', cursor: 'pointer', minHeight: '56px' }}
            aria-expanded={openIdx === i}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            {item.q}
            <span
              className="w-6 h-6 rounded-full grid place-items-center text-[16px] text-[var(--clr-accent)] flex-shrink-0 transition-transform"
              style={{ border: '1px solid var(--clr-border-soft)', transform: openIdx === i ? 'rotate(45deg)' : 'none' }}
            >
              +
            </span>
          </button>
          {openIdx === i && (
            <div className="px-6 pb-6 text-[14px] text-[var(--clr-text-muted)] leading-[1.75]">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
