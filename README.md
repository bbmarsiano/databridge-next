# dmgweb — Website

Next.js website for dmgweb.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Email | Resend (free: 3,000 emails/month) |
| Database | Supabase / PostgreSQL (optional — for lead storage) |
| Deployment | Vercel (free hobby tier) |

---

## Quick start (2 commands)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel (5 minutes)

### Option A — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site is live at a `.vercel.app` URL immediately.
Connect your custom domain in the Vercel dashboard under **Domains**.

### Option B — GitHub + Vercel dashboard

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Click **Deploy** — done

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

### Required for contact form email sending
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_RECIPIENT_EMAIL=contact@dmg-web.net
CONTACT_FROM_EMAIL=noreply@dmg-web.net
```

Get a free Resend key at [resend.com](https://resend.com) — takes 2 minutes.

To activate email sending, open `app/api/contact/route.ts` and **uncomment** the
`// Resend email sending` block (lines ~45–80).

### Optional — Supabase lead database
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

1. Create a free project at [supabase.com](https://supabase.com)
2. Run the SQL in `lib/supabase.ts` (the commented block at the bottom) in the Supabase SQL Editor
3. Add the environment variables above to Vercel (Project → Settings → Environment Variables)

Without Supabase, contact form submissions are still sent by email — you just won't have a database record.

### Add environment variables to Vercel
Go to: **Vercel dashboard → Your project → Settings → Environment Variables**

---

## Editing content

### Site-wide settings (phone, email, address, nav)
Edit `lib/siteConfig.ts` — this file controls:
- Contact details shown in nav, footer, and contact page
- Navigation structure and dropdown items
- Statistics, certifications, testimonials

### Page content
Each page is a single file:

| Page | File |
|------|------|
| Homepage | `app/page.tsx` |
| Services | `app/services/page.tsx` |
| Solutions | `app/solutions/page.tsx` |
| Case Studies | `app/case-studies/page.tsx` |
| Process | `app/process/page.tsx` |
| Resources | `app/resources/page.tsx` |
| Contact | `app/contact/page.tsx` |
| About | `app/about/page.tsx` |

### Colours and fonts
Edit `styles/globals.css` — look for the `:root { }` block at the top.
The main accent colour is `--clr-accent: #06b6d4` (cyan).

### Client logos (trust strip)
In `app/page.tsx`, find the `// Trust strip` section.
Replace each `<span className="logo-pill">NAME</span>` with:
```html
<img src="/logos/kaufland.svg" alt="Kaufland" height="24" className="opacity-50 hover:opacity-80 transition-opacity" />
```
Place logo SVG files in the `public/logos/` folder.

---

## Project structure

```
databridge/
├── app/
│   ├── layout.tsx          ← Root layout (nav + footer on every page)
│   ├── page.tsx            ← Homepage
│   ├── services/page.tsx
│   ├── solutions/page.tsx
│   ├── case-studies/page.tsx
│   ├── process/page.tsx
│   ├── resources/page.tsx
│   ├── contact/page.tsx
│   ├── about/page.tsx
│   ├── api/contact/route.ts ← Contact form API endpoint
│   ├── sitemap.ts          ← Auto-generated sitemap.xml
│   ├── robots.ts           ← robots.txt
│   └── not-found.tsx       ← 404 page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      ← Navigation (active links, dropdowns, mobile drawer)
│   │   ├── Footer.tsx
│   │   └── MobileCTABar.tsx
│   ├── sections/
│   │   ├── TestimonialsSlider.tsx
│   │   ├── ContactForm.tsx
│   │   └── FAQAccordion.tsx
│   └── ui/
│       └── index.tsx       ← Shared UI primitives (Button, Card, Tag, etc.)
├── lib/
│   ├── siteConfig.ts       ← All editable site content
│   └── supabase.ts         ← Database client
├── styles/
│   └── globals.css         ← Design tokens + global CSS
├── public/
│   └── logos/              ← Client logo SVGs go here
├── .env.local.example      ← Environment variable template
└── README.md               ← This file
```

---

## Next steps (after deploy)

1. **Replace client logos** — add real SVGs to `public/logos/` and update the trust strip
2. **Activate email sending** — uncomment the Resend block in `app/api/contact/route.ts`
3. **Set up Supabase** — run the SQL, add env vars to Vercel, leads appear in your Supabase dashboard
4. **Add Google Analytics** — uncomment `NEXT_PUBLIC_GA_ID` in `.env.local` and add a `<Script>` tag in `app/layout.tsx`
5. **Custom domain** — add in Vercel dashboard → Domains, update `NEXT_PUBLIC_SITE_URL` in env vars
6. **Submit sitemap to Google** — go to [Google Search Console](https://search.google.com/search-console), add your domain, submit `https://yourdomain.bg/sitemap.xml`

---

## Support

Questions? Open `lib/siteConfig.ts` first — most content changes live there.
# databridge-next
// test
