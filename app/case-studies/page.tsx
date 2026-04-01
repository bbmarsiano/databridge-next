import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, PageHero, Tag, CTABanner } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Case Studies — Real EDIFACT Integration Results',
  description: 'Real EDIFACT EDI integration outcomes for Bulgarian enterprises. See how dmgweb delivered measurable results in retail, logistics, manufacturing and financial services.',
}

const featured = {
  badge: '⭐ Featured case study',
  title: 'How a national retail chain eliminated manual invoice processing for 120+ suppliers',
  client: 'Retail group · SAP ECC · 2023',
  story: 'A leading Bulgarian grocery retailer was processing supplier invoices manually — receiving PDFs by email, re-entering data into SAP, and chasing confirmations by phone. With 120+ suppliers and thousands of invoices per month, errors were constant and the AP team was overwhelmed.',
  solution: '<strong>DMG Web</strong> implemented full EDIFACT INVOIC D96A exchange integrated with SAP MM, including automatic 3-way matching against purchase orders and delivery notices. Supplier onboarding was completed in 4 days per partner — down from 6 weeks.',
  tags: ['EDIFACT INVOIC', 'SAP MM', 'Retail', '8-week implementation'],
  metrics: [
    { val: '78%', lbl: 'Reduction in invoice processing time' },
    { val: '4 days', lbl: 'Per-supplier onboarding (was 6 weeks)' },
    { val: '120+', lbl: 'Suppliers connected' },
    { val: '€0', lbl: 'Budget overrun' },
    { val: '8 wks', lbl: 'Total implementation' },
    { val: '99.8%', lbl: 'Message delivery rate ongoing' },
  ],
  industry: 'retail',
}

const cases = [
  { industry: 'logistics', bg: '🚛', label: 'LOGISTICS / ORACLE WMS', tag1: 'Logistics', tag2: 'Oracle', title: 'Real-time delivery confirmation for a national 3PL provider', desc: 'Connected DESADV and RECADV flows between Oracle WMS and 6 major retail customers, replacing phone-based delivery confirmation.', result: '↑ Customer dispute resolution cut by 60%' },
  { industry: 'manufacturing', bg: '🏭', label: 'MANUFACTURING / DYNAMICS 365', tag1: 'Manufacturing', tag2: 'Dynamics', title: 'JIT manufacturing integration for an automotive Tier-1 supplier', desc: 'Implemented DELFOR and DELJIT with a German OEM, feeding production scheduling directly into Dynamics 365 with sub-second latency.', result: '↑ Inventory holding cost reduced by €240K/year' },
  { industry: 'finance', bg: '🏦', label: 'FINANCIAL SERVICES', tag1: 'Banking', tag2: 'NRA', title: 'NRA e-invoicing compliance for a commercial bank\'s corporate clients', desc: 'Designed and implemented an EDIFACT INVOIC to NRA e-invoice translation layer, enabling 200 corporate clients to achieve compliance.', result: '↑ 100% first-time NRA audit pass rate' },
  { industry: 'retail', bg: '🏪', label: 'RETAIL / PRICAT', tag1: 'Retail', tag2: 'PRICAT', title: 'Product catalogue automation eliminating 2,000 manual updates per month', desc: 'Replaced a manual price and product data update process with automated PRICAT D96A exchange between a DIY retailer and 80 suppliers.', result: '↑ Price accuracy errors reduced by 94%' },
  { industry: 'logistics', bg: '✈️', label: 'FREIGHT / CUSCAR', tag1: 'Freight', tag2: 'Customs', title: 'Automated customs documentation for a Bulgarian freight forwarder', desc: 'Implemented CUSCAR and CUSREP with Bulgarian Customs Agency, eliminating manual customs manifest preparation for 400+ weekly shipments.', result: '↑ Clearance processing time reduced by 55%' },
  { industry: 'manufacturing', bg: '💊', label: 'PHARMA / SAP', tag1: 'Pharma', tag2: 'SAP', title: 'GS1 compliant DESADV serialisation for pharmaceutical distributor', desc: 'Implemented GS1-compliant DESADV with serialisation data meeting EU Falsified Medicines Directive track-and-trace requirements.', result: '↑ FMD compliance achieved 3 months ahead of deadline' },
]

export default function CaseStudiesPage() {
  return (
    <>
      <div className="container"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} /></div>

      <PageHero
        eyebrow="Client outcomes"
        title={<>Real projects.<br /><em className="italic text-[var(--clr-accent)]">Real numbers.</em></>}
        subtitle="Every result on this page came from a live client engagement. No projections, no best-case scenarios. We show you what actually happened."
        bgImage="/images/hero-cases.jpg"
      />

      <section className="section">
        <div className="container">
          {/* Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center rounded-[14px] p-10 mb-16 relative overflow-hidden" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}>
            <div className="absolute right-[-60px] top-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,.06), transparent 70%)' }} />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--clr-accent)] px-2.5 py-1 rounded-[20px] mb-4" style={{ background: 'rgba(6,182,212,.1)', border: '1px solid rgba(6,182,212,.25)' }}>
                {featured.badge}
              </div>
              <h2 className="text-[clamp(20px,2.5vw,30px)] mb-2">{featured.title}</h2>
              <p className="text-[13px] text-[var(--clr-text-muted)] mb-4">{featured.client}</p>
              <p className="text-[15px] text-[var(--clr-text-soft)] leading-[1.8] mb-3">{featured.story}</p>
              <p className="text-[15px] text-[var(--clr-text-soft)] leading-[1.8] mb-6" dangerouslySetInnerHTML={{ __html: featured.solution }} />
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tags.map((t) => <Tag key={t} color="cyan">{t}</Tag>)}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-[5px] transition-all hover:-translate-y-px" style={{ background: 'var(--clr-accent)', color: '#07111f', minHeight: '44px' }}>
                Discuss a similar project →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px rounded-[14px] overflow-hidden" style={{ background: 'var(--clr-border)', border: '1px solid var(--clr-border)' }}>
              {featured.metrics.map((m) => (
                <div key={m.val} className="p-5" style={{ background: 'var(--clr-surface-2)' }}>
                  <div className="text-[clamp(22px,2.5vw,32px)] text-[var(--clr-accent)] leading-none mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>{m.val}</div>
                  <div className="text-[12px] text-[var(--clr-text-muted)]">{m.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c) => (
              <article key={c.title} className="rounded-[14px] overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[rgba(6,182,212,.4)]" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
                <div className="h-[140px] relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--clr-surface-2), var(--clr-surface-3))', borderBottom: '1px solid var(--clr-border)' }} aria-hidden="true">
                  <span className="absolute text-[60px] opacity-[.07]">{c.bg}</span>
                  <span className="relative text-[11px] tracking-[.10em] text-[var(--clr-text-muted)]">{c.label}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex gap-2 mb-3">
                    <Tag color="green">{c.tag1}</Tag>
                    <Tag color="blue">{c.tag2}</Tag>
                  </div>
                  <h3 className="text-[15px] leading-[1.45] flex-1 mb-2">{c.title}</h3>
                  <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7]">{c.desc}</p>
                  <div className="text-[12px] text-[var(--clr-green)] flex items-center gap-1 mt-4 pt-4" style={{ borderTop: '1px solid var(--clr-border)' }}>{c.result}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Your project next"
        title="Let's write your case study together."
        subtitle="Book a 30-minute call. Tell us what you're trying to automate. We'll tell you what a realistic outcome looks like — based on what we've delivered before."
        primaryCta={{ label: 'Book a discovery call', href: '/contact' }}
        secondaryCta={{ label: 'Explore solutions', href: '/solutions' }}
      />
    </>
  )
}
