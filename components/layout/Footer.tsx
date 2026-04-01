import Link from 'next/link'
import { siteConfig, footerLinks } from '@/lib/siteConfig'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '96px', paddingBottom: '40px', background: 'var(--clr-bg)' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 w-fit"
              style={{ lineHeight: 1 }}
              aria-label="dmgweb — home"
            >
              <img
                src="/logos/icon-512.png"
                alt=""
                aria-hidden="true"
                style={{ height: '48px', width: '48px', display: 'block' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  letterSpacing: '-0.3px',
                  lineHeight: '1.1',
                  fontFamily: 'var(--font-body)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0px',
                }}>
                  <span style={{ color: '#F0F6FF' }}>dmg</span>
                  <span style={{ color: '#3EC9C0' }}>web</span>
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  color: '#7AACCB',
                  letterSpacing: '0.5px',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-body)',
                }}>
                  Optimized solutions. Targeted results.
                </span>
              </div>
            </Link>
            <div className="flex flex-col gap-1.5 mt-4 text-[13px] text-[var(--clr-text-muted)]">
              <span>{siteConfig.contact.email}</span>
              <span>{siteConfig.contact.phone}</span>
              <span>{siteConfig.contact.address}</span>
            </div>

            {siteConfig.memberships.length > 0 && (
              <div
                className="flex flex-wrap gap-3 mt-5 pt-5"
                style={{ borderTop: '1px solid var(--clr-border)' }}
              >
                {siteConfig.memberships.map((m) => (
                  <a
                    key={m.name}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    title={m.fullName}
                  >
                    {m.logo ? (
                      <img
                        src={m.logo}
                        alt={m.name}
                        className="h-[32px] w-auto object-contain"
                        style={{
                          opacity: 0.9,
                          maxWidth: '160px',
                          height: '56px',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <span
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-[4px] text-[var(--clr-text-muted)]"
                        style={{
                          border: '1px solid var(--clr-border)',
                          background: 'var(--clr-surface-2)',
                        }}
                      >
                        Industry membership
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[13px] font-medium tracking-[.12em] uppercase text-[var(--clr-text-muted)] mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-[14px] text-[var(--clr-text-soft)] hover:text-[var(--clr-accent)] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[13px] font-medium tracking-[.12em] uppercase text-[var(--clr-text-muted)] mb-4">Solutions</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.solutions.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-[14px] text-[var(--clr-text-soft)] hover:text-[var(--clr-accent)] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[13px] font-medium tracking-[.12em] uppercase text-[var(--clr-text-muted)] mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-[14px] text-[var(--clr-text-soft)] hover:text-[var(--clr-accent)] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-wrap justify-between items-center gap-4 pt-6 text-[12px] text-[var(--clr-text-muted)]"
          style={{ borderTop: '1px solid var(--clr-border)' }}
        >
          <span>© {year} {siteConfig.contact.legalName} · All rights reserved</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--clr-text)] transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-[var(--clr-text)] transition-colors">Terms of Service</Link>
          </div>
          <span className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-right">
            <span>GLN {siteConfig.contact.gln}</span>
            <span style={{ color: 'var(--clr-border-soft)' }}>|</span>
            <span>VAT {siteConfig.contact.vat}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
