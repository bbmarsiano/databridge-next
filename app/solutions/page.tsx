import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, PageHero, Tag, Card, CTABanner } from '@/components/ui'

export const metadata: Metadata = {
  title: 'EDIFACT Solutions by Industry',
  description: 'Industry-specific EDIFACT EDI integration for retail, logistics, manufacturing and financial services in Bulgaria and the EU.',
}

const industries = [
  {
    id: 'retail',
    icon: '🏪',
    tag: { label: 'Retail & FMCG', color: 'cyan' as const },
    title: 'Automate every purchase order, invoice, and delivery notice — at retail scale.',
    challenge: 'Most retail businesses are still receiving PDF invoices by email, manually re-entering data into their ERP, and chasing suppliers for delivery confirmations. At scale, that costs weeks of staff time per month.',
    features: ['Automated ORDERS and INVOIC exchange with 50–500+ suppliers', 'DESADV advance shipping notices integrated with WMS', 'PRICAT price and catalogue management with ERP sync', 'REMADV remittance advice for automated payment reconciliation', 'GS1 Bulgaria barcode and GLN integration', 'Compatible with SAP, Dynamics, Oracle, and bespoke retail ERPs'],
    metric: { val: '78%', desc: 'Reduction in invoice processing time within 90 days of go-live.' },
    messages: [
      { msg: 'ORDERS', desc: 'Purchase order from retailer to supplier' },
      { msg: 'ORDRSP', desc: 'Supplier order acknowledgement' },
      { msg: 'DESADV', desc: 'Advance shipment notice before delivery' },
      { msg: 'RECADV', desc: 'Goods receipt confirmation' },
      { msg: 'INVOIC', desc: 'Electronic invoice to ERP AP module' },
      { msg: 'REMADV', desc: 'Payment remittance to supplier' },
    ],
    sectors: ['Grocery retail', 'DIY & home', 'Fashion', 'Consumer electronics'],
    cta: 'Get a retail EDI assessment',
  },
  {
    id: 'logistics',
    icon: '🚛',
    tag: { label: 'Logistics & Transport', color: 'green' as const },
    title: 'Real-time visibility across every shipment, border, and handover point.',
    challenge: 'Logistics disputes — wrong quantities, delayed deliveries, lost freight — almost always stem from documentation exchanged by phone, email, or PDF that doesn\'t match what was actually shipped. EDI closes that gap.',
    features: ['DESADV / RECADV shipment and receipt automation', 'IFTMBF / IFTMBC freight booking and confirmation', 'Customs and cross-border CUSCAR / CUSREP support', 'Integration with Oracle WMS, SAP EWM, and proprietary systems', 'Bulgarian and EU customs agency compliance', 'Real-time exception alerting for delayed or missing messages'],
    metric: { val: '60%', desc: 'Reduction in customer dispute resolution time in Q1 post-implementation.' },
    messages: [
      { msg: 'IFTMBF', desc: 'Freight booking request' },
      { msg: 'IFTMBC', desc: 'Booking confirmation from carrier' },
      { msg: 'DESADV', desc: 'Despatch advice at point of loading' },
      { msg: 'CUSCAR', desc: 'Customs cargo report at border' },
      { msg: 'RECADV', desc: 'Goods receipt at destination' },
      { msg: 'INVOIC', desc: 'Freight invoice to customer' },
    ],
    sectors: ['3PL providers', 'Freight forwarding', 'Last-mile', 'Cold chain'],
    cta: 'Get a logistics EDI assessment',
  },
  {
    id: 'manufacturing',
    icon: '🏭',
    tag: { label: 'Manufacturing', color: 'amber' as const },
    title: 'Synchronise production schedules with customer demand — automatically.',
    challenge: 'Automotive and industrial manufacturers face tight EDI compliance requirements. Failure to respond to a DELFOR or ship against an incorrect DELJIT can trigger penalty clauses. Manual processes cannot keep up.',
    features: ['DELFOR delivery forecast and DELJIT JIT schedule automation', 'DESADV with VDA label requirements for automotive OEMs', 'INVOIC / REMADV with OEM-specific trading community rules', 'Direct integration with SAP PP, MES, and shop-floor systems', 'VDA 4920 and ODETTE standard support for EU automotive', 'Penalty-clause monitoring and SLA alerting'],
    metric: { val: '€240K', desc: 'Annual reduction in inventory holding costs for automotive supplier.' },
    messages: [
      { msg: 'DELFOR', desc: 'Long-range delivery forecast from OEM' },
      { msg: 'DELJIT', desc: 'JIT call-off → production scheduling' },
      { msg: 'DESADV', desc: 'Ship notice with VDA label data' },
      { msg: 'RECADV', desc: 'Line-side goods receipt confirmation' },
      { msg: 'INVOIC', desc: 'Automated invoice generation' },
    ],
    sectors: ['Automotive Tier 1/2', 'Pharmaceutical', 'Electronics', 'Food production'],
    cta: 'Get a manufacturing EDI assessment',
  },
  {
    id: 'finance',
    icon: '🏦',
    tag: { label: 'Financial Services', color: 'blue' as const },
    title: 'Compliant, auditable document exchange — for a sector where errors are unacceptable.',
    challenge: 'Banks, insurers, and fintech platforms face strict controls on data sovereignty, audit trails, and consent management. Standard EDI implementations often lack the required logging and access controls.',
    features: ['FINSTA bank statement and PAYMUL payment order messages', 'NRA e-invoicing and e-reporting compliance (Bulgaria)', 'Full GDPR audit trail on every message', 'End-to-end message encryption and digital signing', 'Integration with core banking and ERP systems', 'BNB regulatory reporting message support'],
    metric: { val: '100%', desc: 'Of <strong>DMG Web</strong> financial sector implementations passed first-time regulatory audit.' },
    messages: [
      { msg: 'PAYMUL', desc: 'Payment order batch to bank' },
      { msg: 'FINSTA', desc: 'Bank statement to ERP/treasury' },
      { msg: 'INVOIC', desc: 'e-Invoice with NRA reporting' },
      { msg: 'REMADV', desc: 'Remittance to creditor systems' },
      { msg: 'CONTRL', desc: 'Message acknowledgement & audit log' },
    ],
    sectors: ['Commercial banks', 'Insurance', 'Fintech', 'Corporate treasury'],
    cta: 'Get a financial EDI assessment',
  },
]

export default function SolutionsPage() {
  return (
    <>
      <div className="container"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} /></div>

      <PageHero
        eyebrow="Industry solutions"
        title={<>EDIFACT integration<br /><em className="italic text-[var(--clr-accent)]">for your industry.</em></>}
        subtitle="Every sector has its own message types, compliance requirements, and trading partner expectations. We understand all of them — and we've delivered in all of them."
        cta={{ label: 'Get a solution brief', href: '/contact' }}
        secondaryCta={{ label: 'See case studies', href: '/case-studies' }}
        bgImage="/images/hero-solutions.jpg"
      />

      {/* Sticky industry tab bar */}
      <div className="sticky top-[68px] z-50 py-4" style={{ background: 'rgba(9,17,31,.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 -webkit-overflow-scrolling-touch">
            {industries.map((ind) => (
              <a
                key={ind.id}
                href={`#${ind.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium text-[var(--clr-text-soft)] transition-all hover:text-[var(--clr-accent)] hover:bg-[var(--clr-accent-dim)] flex-shrink-0"
                style={{ border: '1px solid var(--clr-border)', minHeight: '44px' }}
              >
                <span aria-hidden="true">{ind.icon}</span>
                <span className="hidden sm:inline">{ind.tag.label}</span>
                <span className="sm:hidden">{ind.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container flex flex-col gap-0">
          {industries.map((ind, i) => (
            <div
              key={ind.id}
              id={ind.id}
              className="py-24"
              style={{ borderBottom: i < industries.length - 1 ? '1px solid var(--clr-border)' : 'none', scrollMarginTop: 'calc(68px + 64px)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Text */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[28px]" aria-hidden="true">{ind.icon}</span>
                    <Tag color={ind.tag.color}>{ind.tag.label}</Tag>
                  </div>
                  <h2 className="text-[clamp(22px,3vw,36px)] mb-4">{ind.title}</h2>
                  <div className="mb-6 p-4 rounded-[8px]" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderLeft: '3px solid var(--clr-amber)' }}>
                    <div className="text-[10px] tracking-[.16em] uppercase text-[var(--clr-amber)] mb-1.5">The challenge we solve</div>
                    <p className="text-[14px] text-[var(--clr-text-muted)] leading-[1.7]">{ind.challenge}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {ind.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-[var(--clr-text-soft)]">
                        <span className="w-4 h-4 rounded-full grid place-items-center text-[9px] text-[var(--clr-accent)] flex-shrink-0 mt-0.5" style={{ background: 'rgba(6,182,212,.12)', border: '1px solid rgba(6,182,212,.28)' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {ind.sectors.map((s) => <Tag key={s} color="blue">{s}</Tag>)}
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-[5px] transition-all hover:-translate-y-px" style={{ background: 'var(--clr-accent)', color: '#07111f', minHeight: '44px' }}>
                    {ind.cta} →
                  </Link>
                </div>

                {/* Visual */}
                <div className={`flex flex-col gap-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Metric */}
                  <Card className="p-6">
                    <div className="text-[11px] tracking-[.14em] uppercase text-[var(--clr-text-muted)] mb-3">Typical outcome</div>
                    <div className="text-[52px] text-[var(--clr-accent)] leading-none mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{ind.metric.val}</div>
                    <p className="text-[14px] text-[var(--clr-text-soft)]" dangerouslySetInnerHTML={{ __html: ind.metric.desc }} />
                  </Card>
                  {/* Message flow */}
                  <Card className="p-6">
                    <div className="text-[11px] tracking-[.14em] uppercase text-[var(--clr-text-muted)] mb-4">EDIFACT message flow</div>
                    <div className="flex flex-col gap-0">
                      {ind.messages.map((m, j) => (
                        <div key={j} className="flex items-center gap-3 py-2.5 text-[13px] text-[var(--clr-text-soft)]" style={{ borderBottom: j < ind.messages.length - 1 ? '1px solid var(--clr-border)' : 'none' }}>
                          <span className="text-[10px] text-[var(--clr-accent)]">→</span>
                          <span className="text-[10px] font-medium text-[var(--clr-accent)] px-2 py-0.5 rounded-[3px] flex-shrink-0" style={{ background: 'rgba(6,182,212,.08)', border: '1px solid rgba(6,182,212,.2)' }}>{m.msg}</span>
                          <span>{m.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        eyebrow="Talk to an industry specialist"
        title={<>Not sure which solution fits?<br />We&apos;ll map it out in 30 minutes.</>}
        subtitle="Book a free call with a specialist who has worked in your sector. We'll tell you which EDIFACT messages apply and what a realistic implementation looks like."
        primaryCta={{ label: 'Book a free consultation', href: '/contact' }}
        secondaryCta={{ label: 'See real case studies', href: '/case-studies' }}
      />
    </>
  )
}
