import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-40 px-4">
      <p className="text-[11px] tracking-[.20em] uppercase text-[var(--clr-accent)] mb-4">404 — Page not found</p>
      <h1 className="text-[clamp(36px,5vw,62px)] mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
        This page doesn&apos;t exist.
      </h1>
      <p className="text-[16px] text-[var(--clr-text-soft)] max-w-[460px] leading-[1.8] mb-10">
        It may have moved or been removed. The links below should help you find what you&apos;re looking for.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-[5px] transition-all hover:-translate-y-px" style={{ background: 'var(--clr-accent)', color: '#07111f', minHeight: '44px' }}>← Back to home</Link>
        <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-[5px] transition-colors hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]" style={{ background: 'transparent', border: '1.5px solid var(--clr-border-soft)', color: 'var(--clr-text)', minHeight: '44px' }}>Services</Link>
        <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-[5px] transition-colors hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]" style={{ background: 'transparent', border: '1.5px solid var(--clr-border-soft)', color: 'var(--clr-text)', minHeight: '44px' }}>Contact</Link>
      </div>
    </div>
  )
}
