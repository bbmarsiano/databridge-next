// ─────────────────────────────────────────────────────────
// DMG WEB — SITE CONFIGURATION
// Edit this file to update ALL content that appears
// across the website. No code changes needed.
// ─────────────────────────────────────────────────────────

export const siteConfig = {
  name:        'dmgweb',
  tagline:     'Optimized solutions. Targeted results.',
  description: 'Enterprise EDIFACT integration and IT services for Bulgarian and EU enterprises. Based in Sofia, operating since 2012.',
  url:         process.env.NEXT_PUBLIC_SITE_URL || 'https://dmg-web.net',

  // ── Site mode ─────────────────────────────
  // true  = site is password-protected (preview=dmgweb2025)
  // false = site is fully public, no redirect
  underConstruction: false,

  contact: {
    email:       'contact@dmg-web.net',
    phone:       '+359 892 738 290',
    phoneHref:   'tel:+359892738290',
    address:     'ul. Dobar unak 2, Sofia 1421, Bulgaria',
    addressRegistered: 'ul. Krastio Sarafov 27, fl. 1, ap. 3, Sofia 1164, Bulgaria',
    hours:       'Mon–Fri · 09:00–18:00 EET',
    vat:         'BG200650929',
    gln:         '3808001050102',
    legalName:   'DMG Web LTD',
    foundedYear: '2012',
  },

  social: {
    linkedin: 'https://linkedin.com/company/dmgweb',
  },

  defaultCta: {
    label: 'Book a Demo',
    href:  '/contact',
  },

  // ── Team members ─────────────────────────────────────
  // photo: URL to image in Supabase storage or any HTTPS URL
  // If photo is empty string '', initials will show instead
  team: [
    {
      initials: 'DM',
      name:     'Dimitar Mitrev',
      role:     'Founder & CEO',
      focus:    'Strategy, Cybersecurity & Client Delivery',
      bio:      '20 years in enterprise IT across EDIFACT integration, ERP implementation, cybersecurity, and custom software. Leads every client engagement personally — from the first discovery call through to go-live.',
      photo:    '',
    },
    {
      initials: 'IA',
      name:     'Ivaila Atanasova',
      role:     'Head of EDIFACT & ERP Integrations',
      focus:    'EDIFACT, SAP & ERP Architecture',
      bio:      'Senior EDIFACT specialist with deep expertise in SAP MM/SD, Microsoft Dynamics, and UN/CEFACT message standards. Architects and delivers the integration frameworks that handle millions of EDI messages per month across our client base.',
      photo:    '',
    },
    {
      initials:    'YT',
      name:        'Yasen Tanev',
      role:        'Head of Cybersecurity',
      focus:       '',
      bio:         'Former security lead at a Big-4 advisory firm. CISSP and CISM certified. Has conducted over 120 penetration tests across Bulgarian and EU enterprises.',
      photo:       '',
    },
    {
      initials:    'NM',
      name:        'Nikolay Markov',
      role:        'Head of Software Development',
      focus:       '',
      bio:         'Full-stack architect with  more than11 years building bespoke enterprise applications. Led the development of custom platforms for clients in retail, logistics, and financial services.',
      photo:       '',
    },
  ],

  teamNote: "You won't be routed to a junior SDR. The person who picks up your call is the person who will lead your project — if we're the right fit.",

  // ── Key statistics ───────────────────────────────────
  // Shown on homepage hero and about page
  stats: [
    { value: '300+',  label: 'EDI implementations'      },
    { value: '12 yr', label: 'Industry experience'      },
    { value: '120+',  label: 'Penetration tests run'    },
    { value: '8 wk',  label: 'Avg. time to go-live'     },
  ],

  // ── Memberships & associations ───────────────────────
  // logo: URL to image in Supabase storage or any HTTPS URL
  // If logo is empty string '', name will show as text only
  memberships: [
    {
      name:     'BAIT',
      fullName:'Bulgarian Association of Information Technologies',
      url:      'https://www.bait.bg/',
      logo:     'https://xghihexeklxlahpfwkxd.supabase.co/storage/v1/object/sign/documents/bait_partner2026_300x250_en.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZDAwODBjOS0yMTE5LTRhMWItYmRmZC02YzY4MTg2ZDM4MmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvYmFpdF9wYXJ0bmVyMjAyNl8zMDB4MjUwX2VuLmpwZyIsImlhdCI6MTc3NDUwODQwMSwiZXhwIjoxODA2MDQ0NDAxfQ.pgLPH7FZ71ZqGBrEsw8O14X_JnHKOrnD9XwYrM02ink',
      since:    '2017',
    },
    {
      name:     'GS1 Bulgaria',
      fullName:'GS1 Bulgaria',
      url:      'https://www.gs1bg.org/',
      logo:     'https://xghihexeklxlahpfwkxd.supabase.co/storage/v1/object/sign/documents/gs1_logo.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZDAwODBjOS0yMTE5LTRhMWItYmRmZC02YzY4MTg2ZDM4MmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvZ3MxX2xvZ28uc3ZnIiwiaWF0IjoxNzc0NTEwOTU0LCJleHAiOjE4MDYwNDY5NTR9.ulT7WuEHj6OymWAOUkZiWXCwjmUKwI_coma1IUSWCc0',
      since:    '2018',
    }
  ],

  // ── Certifications / standards compliance ─────────────
  // These are standards and compliance items (not awards)
  // icon: emoji OR leave empty and use logo URL
  certifications: [
    { icon: '📋', name: 'UN/CEFACT',      sub: 'EDIFACT Standards'  },
    { icon: '🇪🇺', name: 'GDPR Compliant', sub: 'EU Data Regulation' },
  ],
} as const

// Navigation structure — unchanged
export const navItems = [
  {
    label: 'Services',
    href:  '/services',
    dropdown: [
      { label: 'EDIFACT Integration', sub: 'B2B message exchange',    href: '/services#edifact',          icon: '⬡'  },
      { label: 'Custom Software',     sub: 'Bespoke enterprise apps', href: '/services#custom-software', icon: '💻' },
      { label: 'Cybersecurity',       sub: 'Protect, detect, respond', href: '/services#cybersecurity',   icon: '🛡' },
      { label: 'ERP Implementation',  sub: 'SAP, Dynamics, Oracle',     href: '/services#erp',             icon: '◈' },
      { label: 'IT Consulting',       sub: 'Strategy & architecture',   href: '/services#consulting',      icon: '◉' },
    ],
  },
  {
    label: 'Solutions',
    href:  '/solutions',
    dropdown: [
      { label: 'Retail & FMCG',        sub: 'Supply chain automation', href: '/solutions#retail',        icon: '🏪' },
      { label: 'Logistics & Transport', sub: 'Shipment visibility',     href: '/solutions#logistics',     icon: '🚛' },
      { label: 'Manufacturing',         sub: 'JIT & production EDI',    href: '/solutions#manufacturing', icon: '🏭' },
      { label: 'Financial Services',    sub: 'Compliance & reporting', href: '/solutions#finance',       icon: '🏦' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Process',      href: '/process' },
  {
    label: 'Resources',
    href:  '/resources',
    dropdown: [
      { label: 'Blog & Insights',       sub: 'EDI & IT deep-dives',     href: '/resources#blog',    icon: '📝' },
      { label: 'EDIFACT Starter Guide', sub: 'Free PDF download',       href: '/resources#guide',   icon: '📘' },
      { label: 'FAQ',                    sub: 'Common questions',       href: '/resources#faq',     icon: '❓' },
      { label: 'EDI Glossary',          sub: 'Terms & message types',  href: '/resources#glossary', icon: '📖' },
    ],
  },
  { label: 'About', href: '/about' },
] as const

export const footerLinks = {
  services: [
    { label: 'EDIFACT Integration', href: '/services#edifact'        },
    { label: 'Custom Software',     href: '/services#custom-software' },
    { label: 'Cybersecurity',       href: '/services#cybersecurity'   },
    { label: 'ERP Implementation',  href: '/services#erp'             },
    { label: 'IT Consulting',       href: '/services#consulting'      },
  ],
  solutions: [
    { label: 'Retail & FMCG',      href: '/solutions#retail'         },
    { label: 'Logistics',          href: '/solutions#logistics'       },
    { label: 'Manufacturing',      href: '/solutions#manufacturing'   },
    { label: 'Financial Services', href: '/solutions#finance'         },
  ],
  company: [
    { label: 'About Us',     href: '/about'        },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Process',      href: '/process'      },
    { label: 'Resources',    href: '/resources'    },
    { label: 'Contact',      href: '/contact'      },
  ],
}

// Keep these as named exports for backward compatibility
export const stats           = siteConfig.stats
export const certifications  = siteConfig.certifications
export const testimonials = [
  {
    quote:    'We run EDI integrations across multiple European markets and DMG Web has been our implementation partner for over five years. Seven interfaces across four markets — all mapped, certified, and live within a single project cycle. Every one of them is still running without issue today.',
    name:     'Konstantin Terziev',
    role:     'IT Director',
    company:  'TEVA',
    initials: 'KT',
  },
  {
    quote:    'SIMONE Research Group has relied on DMG Web as the technical backbone for some of our most demanding integration challenges. The integration layer they delivered is, frankly, some of the cleanest architecture we have seen from an external team. Well-documented, maintainable, and built with the assumption that the people inheriting it would not be the people who wrote it. In an environment where research meets engineering, that foresight has proven invaluable.',
    name:     'Marko Haulis',
    role:     'Co-founder',
    company:  'SIMONE Research Group',
    initials: 'MH',
  },
  {
    quote:    'Full NIS2 compliance across three group companies — penetration testing, gap analysis, remediation, and EU audit documentation — delivered in under 8 weeks. Our auditors had zero findings. That is the standard we expected and exactly what DMG Web delivered.',
    name:     'Inna Mladenova',
    role:     'Chief Operating Officer',
    company:  'STAD Group',
    initials: 'IM',
  },
  {
    quote:    'Our processes did not fit any off-the-shelf ERP. DMG Web designed, built, and implemented a custom system in 10 weeks — on budget, on schedule. Twelve months later it is running our entire parts operation with 99%+ uptime. We have not looked back.',
    name:     'Milen Andonov',
    role:     'Owner',
    company:  'Automatic Parts',
    initials: 'MA',
  },
]

export type SiteClient = {
  name:     string
  logo:     string      // Supabase URL or empty string
  url:      string      // client website
  noInvert: boolean     // true = keep original colours
}

export const clients: SiteClient[] = [
  {
    name:     'TEVA BULGARIA',
    logo:     '',
    url:      'https://www.teva.bg',
    noInvert: true,
  },
  {
    name:     'PHOENIX Healthcare Distribution',
    logo:     '',
    url:      'https://www.phoenixpharma.bg/',
    noInvert: true,
  },
  {
    name:     'STING Pharmaceutical products',
    logo:     '',
    url:      'https://www.facebook.com/STINGPHARMA/?locale=bg_BG',
    noInvert: false,
  },
  {
    name:     'FARKOL',
    logo:     '',
    url:      'https://www.farkol.bg/',
    noInvert: true,
  },
  {
    name:     'PHARMNET',
    logo:     '',
    url:      'http://www.pharmnet.bg/bg/',
    noInvert: false,
  },
  {
    name:     'PHARNETIX',
    logo:     '',
    url:      'https://pharnetix.com/',
    noInvert: true,
  },
  {
    name:     'STAD',
    logo:     'https://xghihexeklxlahpfwkxd.supabase.co/storage/v1/object/sign/documents/stad-logo-1990.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZDAwODBjOS0yMTE5LTRhMWItYmRmZC02YzY4MTg2ZDM4MmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvc3RhZC1sb2dvLTE5OTAuanBnIiwiaWF0IjoxNzc0NTM4NzUwLCJleHAiOjE4MDYwNzQ3NTB9.shPL9M_bLG9fiPAdhlZZJuLBNPLc03CUrksh3IyPjSA',
    url:      'https://stad.bg/',
    noInvert: true,
  },
  {
    name:     'SIMONE',
    logo:     'https://xghihexeklxlahpfwkxd.supabase.co/storage/v1/object/sign/documents/simone_logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZDAwODBjOS0yMTE5LTRhMWItYmRmZC02YzY4MTg2ZDM4MmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvc2ltb25lX2xvZ28ucG5nIiwiaWF0IjoxNzc0NTM4OTQwLCJleHAiOjE4MDYwNzQ5NDB9.oENgbUSIf_R9t5iw5quu8vFkkNndsDarFt9l4xu0C6o',
    url:      'https://simone.eu/',
    noInvert: true,
  },
]
