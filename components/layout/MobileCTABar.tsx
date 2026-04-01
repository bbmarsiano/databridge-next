'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileCTABar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  // Hide on contact page — the page already has
  // a prominent CTA so the bar would duplicate it
  const isContactPage = pathname === '/contact'

  // Only show after user has scrolled down 200px
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200)
    }

    // Check initial position (in case page
    // is already scrolled on mount)
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't render at all on contact page
  if (isContactPage) return null

  return (
    <div
      className="mobile-cta-bar"
      role="complementary"
      aria-label="Quick actions"
      style={{
        // Slide in from bottom when visible
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      <Link
        href="/contact"
        className="flex-1 flex items-center
            justify-center font-semibold text-[14px]
            rounded-[5px] transition-colors
            hover:bg-[#22d3ee]"
        style={{
          minHeight: '44px',
          background: 'var(--clr-accent)',
          color: '#07111f',
        }}
      >
        Book a Demo →
      </Link>
    </div>
  )
}
