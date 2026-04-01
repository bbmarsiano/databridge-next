'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { navItems, siteConfig } from '@/lib/siteConfig'

// Per-page CTA override
const pageCtas: Record<string, { label: string; href: string }> = {
  '/':              { label: 'Book a Demo', href: '/contact' },
  '/services':      { label: 'Book a Demo', href: '/contact' },
  '/solutions':     { label: 'Book a Demo', href: '/contact' },
  '/case-studies':  { label: 'Book a Demo', href: '/contact' },
  '/process':       { label: 'Book a Demo', href: '/contact' },
  '/resources':     { label: 'Book a Demo', href: '/resources#guide' },
  '/contact':       { label: 'Book a Demo', href: '/contact' },
  '/about':         { label: 'Book a Demo', href: '/contact' },
}

export default function Navbar() {
  const pathname    = usePathname()
  const [open, setOpen] = useState(false)       // mobile drawer
  const [openDd, setOpenDd] = useState<string | null>(null) // active dropdown
  const isTouch     = useRef(false)
  const drawerRef   = useRef<HTMLDivElement>(null)
  const closeDdTimeout = useRef<number | null>(null)

  const cta = pageCtas[pathname] ?? siteConfig.defaultCta

  // Detect touch device
  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  // Close drawer on route change
  useEffect(() => { setOpen(false); setOpenDd(null) }, [pathname])

  // Close drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setOpenDd(null) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('drawer-open')
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  function handleDropdownClick(e: React.MouseEvent, label: string) {
    if (isTouch.current) {
      if (openDd !== label) {
        e.preventDefault()
        setOpenDd(label)
      }
      // second tap → follow link naturally
    }
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <nav
        className="fixed inset-x-0 top-0 z-[200] h-[76px] flex items-center"
        style={{ background: 'rgba(9,17,31,.93)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--clr-border)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between gap-4 h-[76px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="dmgweb — home"
            className="flex items-center gap-3 flex-shrink-0"
            style={{ lineHeight: 1 }}
          >
            <img
              src="/logos/icon-512.png"
              alt=""
              aria-hidden="true"
              style={{ height: '42px', width: '42px', display: 'block' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{
                fontSize: '20px',
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
                fontSize: '9.5px',
                fontWeight: '500',
                color: '#7AACCB',
                letterSpacing: '0.4px',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-body)',
              }}>
                Optimized solutions. Targeted results.
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none flex-1 justify-center" role="list">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (closeDdTimeout.current !== null) {
                    window.clearTimeout(closeDdTimeout.current)
                    closeDdTimeout.current = null
                  }
                  setOpenDd(item.label)
                }}
                onMouseLeave={() => {
                  if (closeDdTimeout.current !== null) {
                    window.clearTimeout(closeDdTimeout.current)
                  }
                  closeDdTimeout.current = window.setTimeout(() => {
                    setOpenDd((current) => (current === item.label ? null : current))
                    closeDdTimeout.current = null
                  }, 150)
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup={'dropdown' in item ? 'true' : undefined}
                  className={`flex items-center gap-1 text-[13.5px] px-3 py-2 rounded-md transition-colors whitespace-nowrap
                    ${isActive(item.href)
                      ? 'text-[var(--clr-accent)] bg-white/5'
                      : 'text-[var(--clr-text-soft)] hover:text-[var(--clr-text)] hover:bg-white/5'
                    }`}
                  onClick={(e) => 'dropdown' in item ? handleDropdownClick(e, item.label) : undefined}
                >
                  {item.label}
                  {'dropdown' in item && (
                    <span
                      className={`text-[10px] opacity-60 transition-transform inline-block ${
                        openDd === item.label ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  )}
                </Link>

                {/* Dropdown */}
                {'dropdown' in item && (
                  <div
                    className={`absolute top-full left-0 min-w-[235px] rounded-xl pt-3 p-2 z-[300]
                      ${openDd === item.label ? 'block' : 'hidden'}`}
                    style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)', boxShadow: '0 20px 60px rgba(0,0,0,.55)' }}
                    role="menu"
                  >
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        role="menuitem"
                        className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-[var(--clr-text-soft)] text-[13px] transition-colors hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text)]"
                      >
                        <span className="text-[15px] flex-shrink-0 mt-px">{d.icon}</span>
                        <span>
                          <span className="block text-[13px] font-medium text-[var(--clr-text)] leading-tight">{d.label}</span>
                          <span className="block text-[11px] text-[var(--clr-text-muted)] mt-0.5">{d.sub}</span>
                        </span>
                      </Link>
                    ))}
                    {'label' in item && item.label === 'Services' && (
                      <>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--clr-border)', margin: '6px 0' }} />
                        <Link href="/services" className="block px-3 py-2 text-[12px] text-[var(--clr-accent)]">View all services →</Link>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="text-[13.5px] font-semibold px-3 py-2 rounded-[5px] border border-[var(--clr-border-soft)] text-[var(--clr-text)] hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] transition-colors"
              style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
            >
              Contact
            </Link>
            <Link
              href={cta.href}
              className="text-[13.5px] font-semibold px-3.5 py-2 rounded-[5px] bg-[var(--clr-accent)] text-[#07111f] hover:bg-[#22d3ee] transition-all max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
            >
              {cta.label} →
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col items-center justify-center gap-[6px] w-11 h-11 rounded-md flex-shrink-0"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(!open)}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#f1f5f9', borderRadius: '2px',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#f1f5f9', borderRadius: '2px',
              transition: 'opacity 0.2s',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#f1f5f9', borderRadius: '2px',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-x-0 top-[76px] z-[199] flex-col gap-1 overflow-y-auto
          ${open ? 'flex' : 'hidden'}`}
        style={{
          background: 'var(--clr-surface)',
          borderBottom: '1px solid var(--clr-border)',
          padding: '12px 16px 80px',
          maxHeight: 'calc(100vh - 76px)',
        }}
      >
        <div className="text-[10px] tracking-[.14em] uppercase text-[var(--clr-text-muted)] px-3 pt-2 pb-1">Services</div>
        {navItems[0].dropdown?.map((d) => (
          <Link key={d.href} href={d.href} onClick={() => setOpen(false)} className="flex items-center gap-2 text-[15px] text-[var(--clr-text-soft)] px-3 py-2.5 rounded-md min-h-[44px] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text)]">
            <span aria-hidden="true">{d.icon}</span>
            <span>{d.label}</span>
          </Link>
        ))}
        <div className="text-[10px] tracking-[.14em] uppercase text-[var(--clr-text-muted)] px-3 pt-3 pb-1">Solutions</div>
        {navItems[1].dropdown?.map((d) => (
          <Link key={d.href} href={d.href} onClick={() => setOpen(false)} className="flex items-center gap-2 text-[15px] text-[var(--clr-text-soft)] px-3 py-2.5 rounded-md min-h-[44px] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text)]">
            <span aria-hidden="true">{d.icon}</span>
            <span>{d.label}</span>
          </Link>
        ))}
        <div className="text-[10px] tracking-[.14em] uppercase text-[var(--clr-text-muted)] px-3 pt-3 pb-1">Company</div>
        {navItems.slice(2).map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center text-[15px] text-[var(--clr-text-soft)] px-3 py-2.5 rounded-md min-h-[44px] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text)]">{item.label}</Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="flex items-center text-[15px] text-[var(--clr-text-soft)] px-3 py-2.5 rounded-md min-h-[44px] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text)]"
        >
          Contact
        </Link>
        <Link href={cta.href} onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center font-semibold text-[14px] px-4 py-3 rounded-[5px] bg-[var(--clr-accent)] text-[#07111f] hover:bg-[#22d3ee] transition-all">{cta.label} →</Link>
      </div>
    </>
  )
}
