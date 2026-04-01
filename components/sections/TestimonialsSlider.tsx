'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  initials: string
}

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function goTo(index: number) {
    setCurrent(((index % testimonials.length) + testimonials.length) % testimonials.length)
  }

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000)
  }, [testimonials.length])

  useEffect(() => { startAuto(); return () => { if (timerRef.current) clearInterval(timerRef.current) } }, [startAuto])

  const t = testimonials[current]

  return (
    <div>
      <div
        className="max-w-[740px] mx-auto"
        role="region"
        aria-label="Client testimonials"
        aria-live="polite"
      >
        <div key={current} className="testimonial-slide active text-center px-10 py-16">
          <span className="block text-[80px] leading-[.8] text-[var(--clr-accent)] opacity-25 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>&ldquo;</span>
          <div className="text-[var(--clr-amber)] text-[18px] tracking-[4px] mb-5" aria-label="5 out of 5 stars">★★★★★</div>
          <p className="text-[clamp(16px,2vw,20px)] italic text-[var(--clr-text-soft)] leading-[1.65] mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            {t.quote}
          </p>
          <div className="flex items-center gap-3 justify-center">
            <div
              className="w-12 h-12 rounded-full grid place-items-center text-[14px] text-[var(--clr-accent)] flex-shrink-0"
              style={{ background: 'var(--clr-surface-3)', border: '1px solid var(--clr-border-soft)', fontFamily: 'var(--font-heading)' }}
              aria-hidden="true"
            >
              {t.initials}
            </div>
            <div className="text-left">
              <div className="text-[14px] font-semibold">{t.name}</div>
              <div className="text-[13px] text-[var(--clr-text-muted)]">{t.role}</div>
              <span className="inline-block mt-1 text-[10px] font-semibold tracking-[.08em] uppercase text-[var(--clr-accent)] px-2 py-0.5 rounded-[3px]"
                style={{ background: 'var(--clr-accent-dim)', border: '1px solid rgba(6,182,212,.25)' }}>
                {t.company}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-4" role="group" aria-label="Testimonial navigation">
        <button
          className="w-11 h-11 rounded-full grid place-items-center text-[18px] text-[var(--clr-text-soft)] transition-all hover:text-[var(--clr-accent)] hover:border-[var(--clr-accent)]"
          style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
          aria-label="Previous testimonial"
          onClick={() => { goTo(current - 1); startAuto() }}
        >
          ←
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Select testimonial">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === current ? ' active' : ''}`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => { goTo(i); startAuto() }}
            />
          ))}
        </div>
        <button
          className="w-11 h-11 rounded-full grid place-items-center text-[18px] text-[var(--clr-text-soft)] transition-all hover:text-[var(--clr-accent)] hover:border-[var(--clr-accent)]"
          style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
          aria-label="Next testimonial"
          onClick={() => { goTo(current + 1); startAuto() }}
        >
          →
        </button>
      </div>
    </div>
  )
}
