import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon — dmgweb',
  description: 'DMG Web — Optimized solutions. Targeted results. Launching soon.',
  robots: { index: false, follow: false },
}

export default function UnderConstructionPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09111f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(148,163,184,.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(6,182,212,.10), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '40px 24px',
          maxWidth: '560px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          <img
            src="/logos/icon-512.png"
            alt="dmgweb"
            style={{ height: '48px', width: '48px', display: 'block' }}
          />
          <div style={{ textAlign: 'left', lineHeight: 1 }}>
            <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px' }}>
              <span style={{ color: '#F0F6FF' }}>dmg</span>
              <span style={{ color: '#3EC9C0' }}>web</span>
            </div>
            <div
              style={{
                fontSize: '10px',
                color: '#7AACCB',
                letterSpacing: '0.4px',
                marginTop: '3px',
                whiteSpace: 'nowrap',
              }}
            >
              Optimized solutions. Targeted results.
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 400,
            color: '#F1F5F9',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}
        >
          Something great
          <br />
          <em style={{ color: '#3EC9C0', fontStyle: 'italic' }}>is coming.</em>
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#8094aa',
            lineHeight: 1.75,
            marginBottom: '40px',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We&apos;re putting the final touches on our new website. In the meantime, we&apos;re still very much open
          for business.
        </p>

        {/* Contact options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <a
            href="mailto:contact@dmg-web.net"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#06b6d4',
              color: '#07111f',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '5px',
              textDecoration: 'none',
              minWidth: '220px',
              justifyContent: 'center',
            }}
          >
            📧 contact@dmg-web.net
          </a>
        </div>

        <p style={{ fontSize: '12px', color: '#4a6580' }}>Sofia, Bulgaria · EDIFACT Integration & IT Services</p>
      </div>
    </div>
  )
}

