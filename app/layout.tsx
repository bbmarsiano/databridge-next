import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileCTABar from '@/components/layout/MobileCTABar'
import { siteConfig } from '@/lib/siteConfig'
import CookieBanner from '@/components/ui/CookieBanner'
import { DM_Serif_Display, Outfit } from 'next/font/google'
import { headers } from 'next/headers'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png',
    other: [
      { rel: 'icon', url: '/favicon-512x512.png', sizes: '512x512' },
    ],
  },
  openGraph: {
    type:        'website',
    locale:      'en_BG',
    url:          siteConfig.url,
    siteName:    siteConfig.name,
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{
      url:    '/og-image.jpg',
      width:  1200,
      height: 630,
      alt:    'DMG Web — EDIFACT Integration & IT Services Bulgaria',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') ?? ''
  const isUnderConstruction = pathname === '/under-construction'

  return (
    <html lang="en" suppressHydrationWarning className={`${dmSerif.variable} ${outfit.variable}`}>
      <head suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('consent', 'default', {
                    analytics_storage: 'denied',
                    ad_storage: 'denied',
                  });
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DMG Web LTD',
              alternateName: 'dmgweb',
              url: 'https://dmg-web.net',
              logo: 'https://dmg-web.net/logos/icon-512.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+359-2-XXX-XXXX',
                contactType: 'customer service',
                areaServed: ['BG', 'EU'],
                availableLanguage: ['English', 'Bulgarian'],
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Dobar unak 2',
                addressLocality: 'Sofia',
                postalCode: '1421',
                addressCountry: 'BG',
              },
              sameAs: [
                'https://www.bait.bg/',
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {!isUnderConstruction && <Navbar />}
        <main id="main" style={{ paddingTop: isUnderConstruction ? '0' : 'var(--nav-h)' }}>
          {children}
        </main>
        {!isUnderConstruction && <Footer />}
        {!isUnderConstruction && <MobileCTABar />}
        {!isUnderConstruction && <CookieBanner />}
      </body>
    </html>
  )
}
