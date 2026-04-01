import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, PageHero, SectionHead, Card, Tag, CTABanner } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Services — EDIFACT Integration & IT',
  description: 'Custom software, cybersecurity, ERP implementation, EDIFACT integration, and IT consulting for Bulgarian and EU enterprises.',
}

const services = [
  {
    id: 'edifact',
    icon: '⬡',
    color: '#06b6d4',
    title: 'EDIFACT Integration',
    subtitle: 'Connect your business to every trading partner — automatically.',
    tags: ['UN/CEFACT', 'D96A / D21A', 'AS2 / SFTP', 'ERP-agnostic'],
    intro: 'EDIFACT is the international standard for structured B2B document exchange. We implement, manage, and monitor every message type your trading partners require — from ORDERS and INVOIC to DELFOR and DELJIT.',
    deliverables: ['Full message mapping specification', 'Trading partner onboarding (avg. 4 days)', 'Sandbox testing + UAT', 'ERP integration (SAP, Dynamics, Oracle)', 'Supervised go-live + 30-day hypercare', 'Optional managed service SLA'],
    time: '8–10 weeks',
    benefit: 'From 6 weeks to 4 days per supplier onboarding.',
  },
  {
    id: 'custom-software',
    icon: '💻',
    color: '#06b6d4',
    title: 'Custom Software Development',
    subtitle: 'Software that fits your processes — not the other way around.',
    tags: ['React / Next.js', 'Node.js / Python', 'ERP integration', 'API-first'],
    intro: 'We build enterprise software that handles the workflows no off-the-shelf product covers. From internal tooling to customer-facing platforms, every system is documented, tested, and handed over with full knowledge transfer.',
    deliverables: ['Requirements workshops + UI/UX prototype', 'Agile sprints with fortnightly demos', 'ERP and EDIFACT integration', 'UAT + training sessions', 'Full source code and documentation', 'Optional support SLA'],
    time: '3–9 months',
    benefit: 'Your competitive advantage, encoded in software no competitor can buy.',
  },
  {
    id: 'cybersecurity',
    icon: '🛡',
    color: '#ef4444',
    title: 'Cybersecurity',
    subtitle: 'Protect what you\'ve built — before someone else tests it for you.',
    tags: ['GDPR / NIS2', 'Penetration testing', 'ISO 27001', 'SIEM'],
    intro: 'We assess your current security posture, identify vulnerabilities before attackers do, and design the remediation roadmap. Particularly important for enterprises handling EU trading partner data or subject to Bulgarian NRA and BNB compliance requirements.',
    deliverables: ['Security posture assessment', 'Network, application and cloud pen testing', 'GDPR / NIS2 gap analysis', 'IAM review and hardening', 'Incident response playbook', 'Optional managed SIEM'],
    time: '3–6 weeks assessment + retainer',
    benefit: 'Know your exposure before an attacker finds it for you.',
  },
  {
    id: 'erp',
    icon: '◈',
    color: '#3b82f6',
    title: 'ERP Implementation',
    subtitle: 'The system your entire organisation runs on — done once, done right.',
    tags: ['SAP', 'Microsoft Dynamics', 'Oracle', 'Data migration'],
    intro: 'ERP failures are expensive and visible. We deliver full ERP implementations with a rigorous fit-gap analysis, zero-surprise data migration, and the EDIFACT integration layer your trading partners require — all in one engagement.',
    deliverables: ['Business process mapping + fit-gap analysis', 'Data migration (cleanse, map, validate)', 'EDIFACT integration layer', 'End-user training programme', '60-day hypercare period', 'Post-go-live managed service option'],
    time: '6–18 months',
    benefit: 'A single source of truth your whole organisation actually believes in.',
  },
  {
    id: 'consulting',
    icon: '◉',
    color: '#a78bfa',
    title: 'IT Consulting',
    subtitle: 'Clear thinking for complex decisions — without the agency overhead.',
    tags: ['Architecture review', 'Vendor selection', 'Roadmapping', 'M&A due diligence'],
    intro: 'We help leadership teams make high-stakes technology decisions with the full picture in front of them. Architecture assessments, vendor evaluations, technology roadmaps, and M&A IT due diligence — delivered as board-ready documents.',
    deliverables: ['IT landscape assessment', '3-year technology roadmap', 'Vendor evaluation and RFP management', 'Enterprise architecture design', 'M&A IT due diligence', 'Board-level presentation materials'],
    time: '4-week sprints or ongoing retainer',
    benefit: 'Make the right call the first time — not after an expensive course correction.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: '0' }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
      </div>

      <PageHero
        eyebrow="Our services"
        title={<>What we do — and<br /><em className="italic text-[var(--clr-accent)]">how well we do it.</em></>}
        subtitle="Five distinct service lines, each with genuine depth. We don't spread ourselves thin — we go deep on the things that matter most to enterprise IT teams."
        cta={{ label: 'Book a Discovery Call', href: '/contact' }}
        secondaryCta={{ label: 'See case studies', href: '/case-studies' }}
        bgImage="/images/hero-services.jpg"
      />

      {/* Quick jump navigation */}
      <div className="sticky top-[68px] z-50 py-4" style={{ background: 'rgba(9,17,31,.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div className="flex gap-2 flex-wrap">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium text-[var(--clr-text-soft)] transition-all hover:text-[var(--clr-accent)] hover:bg-[var(--clr-accent-dim)]"
                style={{ border: '1px solid var(--clr-border)', minHeight: '44px' }}
              >
                <span aria-hidden="true">{s.icon}</span>
                {s.title.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service cards */}
      <section className="section">
        <div className="container flex flex-col gap-0">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="py-24"
              style={{
                borderBottom: i < services.length - 1 ? '1px solid var(--clr-border)' : 'none',
                scrollMarginTop: 'calc(68px + 64px)',
              }}
            >
              {/* Accent top strip */}
              <div className="w-16 h-[3px] rounded mb-6" style={{ background: s.color }} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[32px]" aria-hidden="true">{s.icon}</span>
                    <div>
                      <h2 className="text-[clamp(22px,3vw,34px)]">{s.title}</h2>
                      <p className="text-[15px] text-[var(--clr-text-muted)] mt-1" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{s.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.map((t) => <Tag key={t} color="blue">{t}</Tag>)}
                  </div>
                  <p className="text-[15px] text-[var(--clr-text-soft)] leading-[1.8]">{s.intro}</p>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-4">
                  {/* Benefit card */}
                  <Card className="p-6">
                    <div className="text-[10px] tracking-[.16em] uppercase text-[var(--clr-text-muted)] mb-3">Key benefit</div>
                    <p className="text-[clamp(16px,1.8vw,20px)] text-[var(--clr-text)]" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', lineHeight: 1.5 }}>
                      &ldquo;{s.benefit}&rdquo;
                    </p>
                  </Card>

                  {/* Deliverables */}
                  <Card className="p-6">
                    <div className="text-[10px] tracking-[.16em] uppercase text-[var(--clr-text-muted)] mb-4">What we deliver</div>
                    <ul className="flex flex-col gap-2.5">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-[13px] text-[var(--clr-text-soft)]">
                          <span className="w-4 h-4 rounded-full grid place-items-center text-[9px] text-[var(--clr-accent)] flex-shrink-0 mt-0.5" style={{ background: 'rgba(6,182,212,.12)', border: '1px solid rgba(6,182,212,.28)' }}>✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Footer row */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                    <span className="text-[12px] text-[var(--clr-text-muted)]">Typical engagement: <strong className="text-[var(--clr-text-soft)]">{s.time}</strong></span>
                    <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-[13.5px] px-4 py-2.5 rounded-[5px] transition-all hover:-translate-y-px" style={{ background: 'var(--clr-accent)', color: '#07111f', minHeight: '44px' }}>
                      Discuss this service →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        eyebrow="Not sure which service fits?"
        title="We'll figure it out together in 30 minutes."
        subtitle="Book a free call. Tell us what you're trying to solve. We'll tell you which service applies — or whether you need a combination."
        primaryCta={{ label: 'Book a free consultation', href: '/contact' }}
        secondaryCta={{ label: 'See case studies', href: '/case-studies' }}
      />
    </>
  )
}
