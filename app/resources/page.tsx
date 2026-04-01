import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, PageHero, Tag, Card, SectionHead, CTABanner } from '@/components/ui'
import FAQAccordion from '@/components/sections/FAQAccordion'
import { supabaseSelect } from '@/lib/supabase'
import type { BlogPost, Document } from '@/lib/types'
import DocumentCard from '@/components/sections/DocumentCard'
import GuideDownloadButton from '@/components/sections/GuideDownloadButton'

export const metadata: Metadata = {
  title: 'EDIFACT Resources, Blog & EDI Glossary',
  description: 'Free EDIFACT integration resources — starter guide, EDI glossary, blog articles, and FAQ. Learn what EDIFACT messages you need and how to implement them.',
}

const blogPosts = [
  { cat: 'EDIFACT Basics', catColor: 'cyan' as const, date: 'March 2025', title: 'What is EDIFACT? The plain-language guide for non-technical decision-makers', desc: 'EDIFACT is the international standard for structured B2B document exchange. Here\'s what it actually does, why it matters, and whether your business needs it.', accent: '#06b6d4' },
  { cat: 'ERP Integration', catColor: 'blue' as const, date: 'February 2025', title: 'EDIFACT and SAP: how message mapping actually works (and where it breaks)', desc: 'The SAP MM/SD integration points that trip up most EDIFACT implementations — and how to design mapping rules that survive your first major supplier change.', accent: '#3b82f6' },
  { cat: 'Compliance', catColor: 'amber' as const, date: 'January 2025', title: 'NRA e-invoicing in Bulgaria: what EDIFACT has to do with it', desc: "Bulgaria's National Revenue Agency e-invoicing mandate affects most B2B transactions. How your existing EDIFACT INVOIC messages map — or don't — to the NRA schema.", accent: '#f59e0b' },
  { cat: 'Retail', catColor: 'green' as const, date: 'December 2024', title: 'DESADV and RECADV: why most Bulgarian retailers are still doing this manually', desc: 'Advance shipping notices and goods receipt confirmations are two of the highest-ROI EDIFACT messages available. Why so few Bulgarian retailers have automated them.', accent: '#22c55e' },
  { cat: 'Manufacturing', catColor: 'blue' as const, date: 'November 2024', title: 'DELFOR vs DELJIT: understanding delivery forecast vs JIT call-off in automotive EDI', desc: 'Two of the most commonly confused EDIFACT messages in manufacturing — what each one does, when each fires, and why getting them wrong triggers penalty clauses.', accent: '#a78bfa' },
  { cat: 'Vendor selection', catColor: 'cyan' as const, date: 'October 2024', title: '10 questions to ask before hiring an EDIFACT integration vendor', desc: 'What to look for, what to avoid, and the specific questions that reveal whether a vendor actually understands EDIFACT — or is just selling an EDI platform.', accent: '#64748b' },
]

const glossary = [
  { term: 'EDIFACT', name: 'Electronic Data Interchange For Administration, Commerce and Transport', def: 'The UN/CEFACT international standard for structuring and exchanging business documents electronically between organisations. The dominant EDI standard in European trade.', sectors: ['All sectors'] },
  { term: 'ORDERS / 850', name: 'Purchase Order', def: 'Sent from buyer to supplier to initiate a purchase. Contains product codes, quantities, required delivery dates, and pricing. The most commonly implemented EDIFACT message in retail and manufacturing.', sectors: ['Retail', 'Manufacturing'] },
  { term: 'INVOIC', name: 'Electronic Invoice', def: 'The structured electronic equivalent of a paper invoice. Can be matched automatically against a purchase order (ORDERS) and delivery notice (DESADV) in a 3-way match process, eliminating manual AP work.', sectors: ['All sectors'] },
  { term: 'DESADV', name: 'Despatch Advice (ASN)', def: 'Advance shipment notice sent before goods are delivered. Allows the recipient to prepare warehouse space and staff resources. Enables automated goods-in processing when combined with RECADV.', sectors: ['Retail', 'Logistics'] },
  { term: 'DELFOR', name: 'Delivery Schedule / Delivery Forecast', def: 'Long-range demand signal from a customer (typically an automotive OEM) to a supplier. Covers rolling 13-week horizon, updated weekly. Drives material procurement and production capacity planning.', sectors: ['Manufacturing', 'Automotive'] },
  { term: 'DELJIT', name: 'Delivery Just In Time', def: 'Short-range, precise delivery call-off. Specifies exact quantities, times, and dock points for delivery within 24–72 hours. Used in JIT manufacturing where inventory windows are measured in hours, not days.', sectors: ['Manufacturing', 'Automotive'] },
  { term: 'D96A / D21A', name: 'EDIFACT Directory Version', def: 'EDIFACT messages are versioned (e.g. D93A, D96A, D21A). Most Bulgarian and EU trading communities use D96A. Versions are largely backward-compatible.', sectors: ['All sectors'] },
  { term: 'AS2 / SFTP / VAN', name: 'EDI Transport Protocols', def: 'The communication channel over which EDIFACT messages travel. AS2 (HTTP-based, with encryption and receipts) is most common for retail. SFTP is used for batch exchanges. VANs are intermediary networks used by large trading communities.', sectors: ['All sectors'] },
]

const faqs = [
  { q: 'Do I need EDIFACT or is there a simpler alternative?', a: 'If your trading partners require EDIFACT — and most major European retailers, automotive OEMs, and logistics companies do — then you need EDIFACT. There is no equivalent standard widely accepted in EU B2B trade. Alternatives like API-based integrations exist, but are typically used alongside EDIFACT, not instead of it.' },
  { q: 'How many trading partners do we need before EDI makes financial sense?', a: 'As a rough guide: if you have 5 or more trading partners sending regular ORDERS or INVOIC documents, the time savings from automation typically justify a standard implementation within 12–18 months. If a single large partner requires EDI as a condition of trading, the ROI calculation becomes immediate.' },
  { q: 'What does EDIFACT integration cost?', a: 'A standard implementation — 2–3 message types, one ERP, 10–30 trading partners — typically ranges from €15,000 to €45,000 for a Bulgarian enterprise, depending on ERP complexity. We provide a fixed-price proposal after the solution design phase, so there are no surprises.' },
  { q: 'Can EDIFACT work with our existing ERP without replacing it?', a: 'Yes. EDIFACT integration is a layer on top of your ERP — not a replacement. We connect to your existing SAP, Dynamics, Oracle, or bespoke system via API, database, or flat-file interface. In most cases, your ERP configuration doesn\'t change at all.' },
  { q: 'Is EDIFACT compliant with Bulgarian NRA e-invoicing requirements?', a: 'EDIFACT INVOIC and the Bulgarian NRA e-invoice schema are different standards, but we can implement a translation layer that maps your EDIFACT INVOIC messages to NRA-compliant format automatically — satisfying both your trading partners\' EDI requirements and the NRA mandate.' },
]

export default async function ResourcesPage() {
  // Fetch published blog posts from Supabase
  const { data: livePosts } = await supabaseSelect<BlogPost>('blog_posts', {
    'select': '*',
    'published': 'eq.true',
    'order': 'published_at.desc',
    'limit': '6',
  })

  // Fetch published documents
  const { data: liveDocs } = await supabaseSelect<Document>('documents', {
    'select': '*',
    'published': 'eq.true',
    'order': 'created_at.desc',
  })

  // Fetch featured guide document for the hero download area
  const { data: guideDoc } = await supabaseSelect<Document>('documents', {
    'select': '*',
    'category': 'eq.guide',
    'order': 'created_at.asc',
    'limit': '1',
  })
  const featuredGuide = guideDoc?.[0] ?? null

  // Fall back to static posts if no live posts yet
  const posts = livePosts && livePosts.length > 0 ? livePosts : null
  const docs = liveDocs ?? []

  return (
    <>
      <div className="container"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} /></div>

      <PageHero
        eyebrow="Free resources"
        title={<>Everything you need to<br /><em className="italic text-[var(--clr-accent)]">understand EDI</em> before you buy it.</>}
        subtitle="Guides, glossary, and straight-talking articles — written by the people who actually implement this stuff every day. No gated content, no newsletter upsell."
        bgImage="/images/hero-resources.jpg"
      />

      {/* Guide download */}
      <section id="guide" className="section" style={{ scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto]
      items-center gap-10 rounded-[14px] p-10 relative overflow-hidden"
            style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
          >
          {/* Glow decoration */}
          <div
            className="absolute right-[-40px] top-[-40px] w-[260px] h-[260px]
        rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,.07), transparent 70%)' }}
          />

          {/* Left: text content */}
          <div className="relative">
            <span className="text-[10px] tracking-[.18em] uppercase text-[var(--clr-accent)] mb-2 block">Free download</span>
            <h2 className="text-[clamp(20px,2.5vw,28px)] mb-3">The EDIFACT Starter Guide for Bulgarian &amp; EU Enterprises</h2>
            <p className="text-[15px] text-[var(--clr-text-soft)] leading-[1.75] mb-5 max-w-[500px]">
              8 pages. No jargon. Written for operations and IT directors who need
              to understand EDIFACT integration — what it is, which messages apply,
              and how to evaluate a vendor without getting burned.
            </p>

            {/* Feature bullets */}
            <div className="flex flex-col gap-2 text-[13px] text-[var(--clr-text-muted)]">
              {[
                'What EDIFACT actually is (plain English)',
                'The 10 most common message types explained',
                'How to scope an integration project',
                'Bulgarian & EU compliance requirements',
                'Questions to ask any EDI vendor',
                'A realistic implementation timeline',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="text-[var(--clr-accent)] flex-shrink-0">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: download button area */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0 relative z-10">
            {featuredGuide ? (
              <GuideDownloadButton doc={featuredGuide} />
            ) : (
              <Link
                href="/contact"
                className="flex flex-col items-center justify-center gap-1.5 font-semibold text-[14px] px-10 py-6 rounded-[5px] transition-all hover:-translate-y-px flex-shrink-0"
                style={{
                  background: 'var(--clr-accent)',
                  color: '#07111f',
                  minWidth: '200px',
                  textDecoration: 'none',
                }}
              >
                📘 Download Free
                <span className="text-[11px] font-normal opacity-70">
                  PDF · 8 pages · No signup
                </span>
              </Link>
            )}

            <p className="text-[11px] text-[var(--clr-text-muted)] text-center max-w-[180px]">
              No email required · Instant download · 412 KB
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="section" style={{ borderTop: '1px solid var(--clr-border)', scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="Blog & Insights" title={<>EDI and IT — explained<br />without the buzzwords.</>} subtitle="Articles written by our technical team, for the people actually responsible for making these decisions." />
          {posts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => {
                // Map category to accent colour — matches original design
                const accentMap: Record<string, string> = {
                  'EDIFACT Basics': '#06b6d4',
                  'ERP Integration': '#3b82f6',
                  Compliance: '#f59e0b',
                  Retail: '#22c55e',
                  Manufacturing: '#a78bfa',
                  'Vendor selection': '#64748b',
                  Cybersecurity: '#ef4444',
                  'Case Study': '#06b6d4',
                  Logistics: '#3b82f6',
                }
                const accent = accentMap[post.category ?? ''] ?? '#06b6d4'

                // Category pill colour mapping
                const pillMap: Record<string, { bg: string; border: string; color: string }> = {
                  'EDIFACT Basics': { bg: 'rgba(6,182,212,.12)', border: 'rgba(6,182,212,.3)', color: '#06b6d4' },
                  'ERP Integration': { bg: 'rgba(59,130,246,.12)', border: 'rgba(59,130,246,.3)', color: '#3b82f6' },
                  Compliance: { bg: 'rgba(245,158,11,.12)', border: 'rgba(245,158,11,.3)', color: '#f59e0b' },
                  Retail: { bg: 'rgba(34,197,94,.12)', border: 'rgba(34,197,94,.3)', color: '#22c55e' },
                  Manufacturing: { bg: 'rgba(167,139,250,.12)', border: 'rgba(167,139,250,.3)', color: '#a78bfa' },
                  'Vendor selection': { bg: 'rgba(100,116,139,.12)', border: 'rgba(100,116,139,.3)', color: '#94a3b8' },
                  Cybersecurity: { bg: 'rgba(239,68,68,.12)', border: 'rgba(239,68,68,.3)', color: '#ef4444' },
                }
                const pill = pillMap[post.category ?? ''] ?? pillMap['EDIFACT Basics']

                const dateStr = post.published_at
                  ? new Date(post.published_at).toLocaleDateString('en-GB', {
                    month: 'long',
                    year: 'numeric',
                  })
                  : ''

                return (
                  <article
                    key={post.id}
                    className="rounded-[14px] overflow-hidden flex flex-col transition-all hover:-translate-y-1"
                    style={{
                      background: 'var(--clr-surface)',
                      border: '1px solid var(--clr-border)',
                    }}
                  >
                    {/* Coloured top border — unique per category */}
                    <div
                      style={{
                        height: '5px',
                        background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
                        flexShrink: 0,
                      }}
                    />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Category pill + date row */}
                      <div className="flex items-center gap-3 mb-4">
                        {post.category && (
                          <span
                            className="text-[11px] font-medium tracking-[.07em] px-[11px] py-[4px] rounded-[30px]"
                            style={{
                              background: pill.bg,
                              border: `1px solid ${pill.border}`,
                              color: pill.color,
                            }}
                          >
                            {post.category}
                          </span>
                        )}
                        {dateStr && (
                          <span className="text-[11px] text-[var(--clr-text-muted)]">
                            {dateStr}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-[16px] font-semibold leading-[1.4] mb-3 flex-1">{post.title}</h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7] mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read link */}
                      <Link
                        href={`/resources/blog/${post.slug}`}
                        className="text-[13px] font-medium text-[var(--clr-accent)] inline-flex items-center gap-1.5 mt-auto transition-all hover:gap-3"
                      >
                        Read article →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 rounded-[14px]" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
              <p className="text-[var(--clr-text-muted)] text-[15px]">
                Articles coming soon. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── DOCUMENTS LIBRARY ── */}
      {docs.length > 0 && (
        <section
          id="documents"
          className="section"
          style={{
            borderTop: '1px solid var(--clr-border)',
            scrollMarginTop: 'calc(68px + 24px)',
          }}
        >
          <div className="container">
            <SectionHead
              eyebrow="Downloads"
              title={
                <>
                  Guides, templates &amp;<br />
                  reference documents.
                </>
              }
              subtitle="Free resources you can use immediately. No signup required unless noted."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {docs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Glossary */}
      <section id="glossary" className="section" style={{ borderTop: '1px solid var(--clr-border)', scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="EDI glossary" title={<>The terms you&apos;ll hear —<br />and what they actually mean.</>} subtitle="No padding, no unnecessary backstory. Just the definitions your team needs." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossary.map((g) => (
              <Card key={g.term} className="p-6">
                <span className="inline-block text-[13px] font-semibold tracking-[.04em] text-[var(--clr-accent)] px-2.5 py-1 rounded-[4px] mb-3" style={{ fontFamily: 'monospace', background: 'rgba(6,182,212,.08)', border: '1px solid rgba(6,182,212,.2)' }}>{g.term}</span>
                <h3 className="text-[16px] mb-2">{g.name}</h3>
                <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7] mb-3">{g.def}</p>
                <div className="flex flex-wrap gap-2">
                  {g.sectors.map((s) => <Tag key={s} color="cyan">{s}</Tag>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" style={{ borderTop: '1px solid var(--clr-border)', scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="Common questions" title="EDIFACT FAQ" subtitle="The questions we hear most often from enterprises new to EDI integration." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner
        eyebrow="Still have questions?"
        title="Ask an EDIFACT specialist directly."
        subtitle="Our team answers questions without a sales pitch attached. Book a 30-minute call and ask us anything."
        primaryCta={{ label: 'Book a free call', href: '/contact' }}
        secondaryCta={{ label: 'Download the guide', href: '/resources#guide' }}
      />
    </>
  )
}
