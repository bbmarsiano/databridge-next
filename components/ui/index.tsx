// ─────────────────────────────────────────────────────────
// Shared UI primitives used across all pages
// ─────────────────────────────────────────────────────────
import Link from 'next/link'

// ── Eyebrow label ────────────────────────────────────────
export function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`eyebrow${center ? ' justify-center' : ''}`}>
      {children}
    </span>
  )
}

// ── Section heading block ─────────────────────────────────
export function SectionHead({
  eyebrow, title, subtitle, center = false,
}: {
  eyebrow?: string; title: React.ReactNode; subtitle?: string; center?: boolean
}) {
  return (
    <div className={`mb-16${center ? ' text-center' : ''}`}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className="mt-2">{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-[16px] text-[var(--clr-text-soft)] leading-[1.8] max-w-[560px]${center ? ' mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ── Primary button ────────────────────────────────────────
export function BtnPrimary({
  href, children, large = false, className = '',
}: {
  href: string; children: React.ReactNode; large?: boolean; className?: string
}) {
  const cls = `inline-flex items-center gap-2 font-semibold rounded-[5px] transition-all
    bg-[var(--clr-accent)] text-[#07111f] border border-[var(--clr-accent)]
    hover:bg-[#22d3ee] hover:border-[#22d3ee] hover:-translate-y-px hover:shadow-[0_8px_28px_var(--clr-accent-glow)]
    focus-visible:outline-[3px] focus-visible:outline-[var(--clr-accent)] focus-visible:outline-offset-[3px]
    ${large ? 'text-[15px] px-[30px] py-[14px]' : 'text-[14px] px-[22px] py-[12px]'}
    ${className}`
  return <Link href={href} className={cls} style={{ minHeight: '44px' }}>{children}</Link>
}

// ── Ghost button ──────────────────────────────────────────
export function BtnGhost({
  href, children, large = false, className = '',
}: {
  href: string; children: React.ReactNode; large?: boolean; className?: string
}) {
  const cls = `inline-flex items-center gap-2 font-semibold rounded-[5px] transition-all
    bg-transparent text-[var(--clr-text)] border border-[var(--clr-border-soft)]
    hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]
    ${large ? 'text-[15px] px-[30px] py-[14px]' : 'text-[14px] px-[22px] py-[12px]'}
    ${className}`
  return <Link href={href} className={cls} style={{ minHeight: '44px' }}>{children}</Link>
}

// ── Text link ─────────────────────────────────────────────
export function LinkSecondary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--clr-text-soft)] hover:text-[var(--clr-accent)] transition-colors">
      {children}
    </Link>
  )
}

// ── Tag / badge ───────────────────────────────────────────
type TagColor = 'cyan' | 'blue' | 'green' | 'amber' | 'purple'
const tagStyles: Record<TagColor, string> = {
  cyan:   'bg-[var(--clr-accent-dim)] border border-[rgba(6,182,212,.28)] text-[var(--clr-accent)]',
  blue:   'bg-[var(--clr-blue-dim)] border border-[rgba(59,130,246,.28)] text-[var(--clr-blue)]',
  green:  'bg-[rgba(34,197,94,.10)] border border-[rgba(34,197,94,.25)] text-[var(--clr-green)]',
  amber:  'bg-[rgba(245,158,11,.10)] border border-[rgba(245,158,11,.25)] text-[var(--clr-amber)]',
  purple: 'bg-[rgba(167,139,250,.10)] border border-[rgba(167,139,250,.25)] text-[var(--clr-purple)]',
}
export function Tag({ color = 'cyan', children }: { color?: TagColor; children: React.ReactNode }) {
  return (
    <span className={`inline-block text-[11px] font-medium tracking-[.07em] px-[11px] py-[4px] rounded-[30px] ${tagStyles[color]}`}>
      {children}
    </span>
  )
}

// ── Card wrapper ──────────────────────────────────────────
export function Card({
  children, className = '', hover = true, style,
}: {
  children: React.ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-[14px] transition-all ${hover ? 'hover:-translate-y-1 hover:border-[var(--clr-border-soft)]' : ''} ${className}`}
      style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', ...style }}
    >
      {children}
    </div>
  )
}

// ── Section divider ───────────────────────────────────────
export function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--clr-border)' }} />
}

// ── Breadcrumb ────────────────────────────────────────────
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[var(--clr-text-muted)] py-6 border-b border-[var(--clr-border)]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-[var(--clr-border-soft)]">/</span>}
          {item.href
            ? <Link href={item.href} className="hover:text-[var(--clr-accent)] transition-colors">{item.label}</Link>
            : <span className="text-[var(--clr-text-soft)]" aria-current="page">{item.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}

// ── Page hero (sub-pages) ─────────────────────────────────
export function PageHero({
  eyebrow, title, subtitle, cta, secondaryCta, bgImage,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  bgImage?: string
}) {
  return (
    <div
      className="py-24"
      style={{
        ...(bgImage
          ? {
              backgroundImage: `radial-gradient(ellipse 60% 70% at 80% 40%, rgba(6,182,212,.07) 0%, transparent 65%), linear-gradient(rgba(9,17,31,0.82), rgba(9,17,31,0.90)), url('${bgImage}')`,
              backgroundSize: 'auto, auto, cover',
              backgroundPosition: 'center, center, center',
              backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
            }
          : {
              background: 'radial-gradient(ellipse 60% 70% at 80% 40%, rgba(6,182,212,.07) 0%, transparent 65%)',
            }),
      }}
    >
      <div className="container">
        <div className="max-w-[700px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-2">{title}</h1>
          {subtitle && (
            <p className="mt-5 text-[17px] font-light text-[var(--clr-text-soft)] leading-[1.8] max-w-[580px]">
              {subtitle}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-4 mt-10">
              {cta && <BtnPrimary href={cta.href} large>{cta.label} →</BtnPrimary>}
              {secondaryCta && <LinkSecondary href={secondaryCta.href}>{secondaryCta.label} →</LinkSecondary>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── CTA Banner ────────────────────────────────────────────
export function CTABanner({
  eyebrow, title, subtitle, primaryCta, secondaryCta,
}: {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}) {
  return (
    <section className="py-32">
      <div className="container">
        <div
          className="text-center rounded-[14px] px-16 py-24 relative overflow-hidden"
          style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
        >
          <div
            className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[560px] h-[280px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,.13), transparent 70%)' }}
          />
          <div className="relative z-10">
            {eyebrow && <Eyebrow center>{eyebrow}</Eyebrow>}
            <h2 className="mt-2">{title}</h2>
            {subtitle && (
              <p className="mt-4 text-[16px] text-[var(--clr-text-soft)] max-w-[500px] mx-auto leading-[1.75]">
                {subtitle}
              </p>
            )}
            <div className="flex justify-center flex-wrap items-center gap-4 mt-10">
              <BtnPrimary href={primaryCta.href} large>{primaryCta.label} →</BtnPrimary>
              {secondaryCta && <LinkSecondary href={secondaryCta.href}>{secondaryCta.label} →</LinkSecondary>}
            </div>
            <p className="mt-4 text-[12px] text-[var(--clr-text-muted)]">
              contact@dmg-web.net · +359 892 738 290 · Sofia, Bulgaria
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
