import type { Metadata } from 'next'
import { Breadcrumb, PageHero, Card, SectionHead, CTABanner } from '@/components/ui'
import FAQAccordion from '@/components/sections/FAQAccordion'

export const metadata: Metadata = {
  title: 'Our EDIFACT Integration Process',
  description: 'How dmgweb delivers EDIFACT integration and IT projects — from discovery to go-live. A transparent, milestone-driven process with no surprises.',
}

const phases = [
  {
    num: '01', title: 'Discovery', time: 'Week 1 · Free, no commitment', tag: 'No charge',
    intro: 'A 30-minute call, then a structured two-hour discovery session. We map your current systems, trading partner landscape, ERP touchpoints, and integration goals. You walk away with a clear picture. We walk away with enough to design a solution.',
    deliverables: ['Current-state systems map', 'Trading partner requirements summary', 'ERP integration points identified', 'Risk and complexity assessment', 'Indicative timeline and ballpark budget'],
    note: { label: 'Why we do this first', text: 'Most IT projects fail during scoping. We spend serious time here so everything downstream is grounded in your actual situation — not a best-case assumption. This session is free because it benefits both parties equally.' },
  },
  {
    num: '02', title: 'Solution Design', time: 'Weeks 2–3', tag: 'Paid phase',
    intro: 'We design the full integration architecture — message flows, mapping rules, ERP touchpoints, exception handling, and testing strategy. You receive a detailed specification document and a fixed-price proposal for the build.',
    deliverables: ['Full EDIFACT message mapping specification', 'ERP integration architecture diagram', 'Trading partner onboarding plan', 'Test scenario register', 'Fixed-price build proposal'],
    note: { label: 'Our change request rate', text: 'Because of our specification depth at this stage, our change request rate during build is under 15% of contract value — versus an industry average closer to 40%. Thorough design is how we protect your budget.' },
  },
  {
    num: '03', title: 'Build & Test', time: 'Weeks 4–8 (typical)', tag: null,
    intro: 'We build the integration in a dedicated sandbox environment, run full message validation against the specification, and conduct end-to-end testing with your actual trading partners. Your team participates in UAT from week 6.',
    deliverables: ['Integration built and configured in sandbox', 'EDIFACT message validation reports', 'Trading partner test exchanges completed', 'UAT sign-off from your team', 'Go-live readiness checklist'],
    note: { label: 'Two-week sprint rhythm', text: 'We run builds in two-week sprints with a demo at the end of each. You see real, working progress — not a status update. Any issues are caught and resolved within the sprint, not discovered at go-live.' },
  },
  {
    num: '04', title: 'Go-Live & Hypercare', time: 'Weeks 9–10 + 30 days hypercare', tag: null,
    intro: 'A supervised production cutover with our team on standby. We monitor every message for 48 hours post-cutover, then transition into a 30-day hypercare period with same-day response SLA for any issue.',
    deliverables: ['Supervised production cutover', '48-hour intensive post-cutover monitoring', 'Full technical documentation and architecture diagrams', 'Operations runbook for your IT team', 'Knowledge transfer session with your team leads'],
    note: { label: 'No black-box handovers', text: 'You receive source code, documentation, and a knowledge transfer session. Your team will understand what was built and how to maintain it — whether or not you continue with a managed service agreement.' },
  },
]

const faqs = [
  { q: 'How long does a typical EDIFACT integration take end to end?', a: 'For a standard EDIFACT integration (2–4 message types, one ERP, 10–30 trading partners), we typically deliver in 8–10 weeks from discovery to go-live. Complex projects — multiple ERPs, high trading partner volume — run 12–16 weeks. We give you a specific timeline after the discovery phase.' },
  { q: 'Do we need to involve our trading partners directly?', a: "Yes — and we handle most of that coordination for you. We contact your trading partners directly, establish test connections, manage message certification, and coordinate go-live scheduling. You don't need to act as an intermediary." },
  { q: "What if our ERP isn't SAP or Dynamics?", a: "We've integrated with Oracle, Microsoft Dynamics, SAP, and a wide range of bespoke and Bulgarian-specific ERPs. Our integration middleware is ERP-agnostic. If you have an API, a database connection, or even a flat-file export — we can work with it." },
  { q: 'What happens if something goes wrong after go-live?', a: 'During the 30-day hypercare period, we respond to issues the same business day. After that, if you\'re on a managed service agreement, your SLA specifies response times by severity — typically 4 hours for critical, 24 hours for standard.' },
  { q: 'Can we start small and expand later?', a: 'Absolutely — and we recommend it. Start with your highest-volume message type, prove the model with your top 10 trading partners, then roll out to the rest. The architecture scales without needing a rebuild.' },
]

export default function ProcessPage() {
  return (
    <>
      <div className="container"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Process' }]} /></div>

      <PageHero
        eyebrow="How we work"
        title={<>No surprises.<br /><em className="italic text-[var(--clr-accent)]">That&apos;s the whole process.</em></>}
        subtitle="We tell you what will happen, when it will happen, and what it will cost — before you commit to anything. Our delivery methodology has been refined across 300+ projects."
        cta={{ label: 'Start with step one', href: '/contact' }}
        bgImage="/images/hero-process.jpg"
      />

      {/* Overview strip */}
      <div className="section--slim section" style={{ borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-[14px] overflow-hidden" style={{ background: 'var(--clr-border)', border: '1px solid var(--clr-border)' }}>
            {phases.map((p) => (
              <div key={p.num} className="p-6 text-center" style={{ background: 'var(--clr-surface)' }}>
                <div className="text-[28px] text-[var(--clr-accent)] leading-none mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>{p.num}</div>
                <div className="text-[14px] font-medium mb-1">{p.title}</div>
                <div className="text-[11px] text-[var(--clr-text-muted)]">{p.time.split(' · ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed phases */}
      <section className="section">
        <div className="container flex flex-col gap-0">
          {phases.map((phase, i) => (
            <div key={phase.num} className="grid grid-cols-[64px_1fr] gap-10 pb-24" style={{ borderBottom: i < phases.length - 1 ? '1px solid var(--clr-border)' : 'none', paddingTop: i > 0 ? '96px' : '0' }}>
              {/* Number circle */}
              <div className="w-16 h-16 rounded-full grid place-items-center text-[13px] font-semibold text-[var(--clr-accent)] flex-shrink-0 self-start relative z-10" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}>
                {phase.num}
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-3 mb-4">
                  <h2 className="text-[clamp(22px,3vw,34px)]">{phase.title}</h2>
                  <span className="text-[12px] text-[var(--clr-text-muted)] px-2.5 py-1 rounded-[20px]" style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)' }}>{phase.time}</span>
                  {phase.tag && <span className="text-[11px] font-medium text-[var(--clr-green)] px-2.5 py-1 rounded-[20px]" style={{ background: 'rgba(34,197,94,.10)', border: '1px solid rgba(34,197,94,.25)' }}>{phase.tag}</span>}
                </div>
                <p className="text-[15px] text-[var(--clr-text-soft)] leading-[1.8] max-w-[600px] mb-8">{phase.intro}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Deliverables */}
                  <Card className="p-6">
                    <div className="text-[11px] tracking-[.14em] uppercase text-[var(--clr-text-muted)] mb-4">Deliverables</div>
                    <ul className="flex flex-col gap-0">
                      {phase.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[13px] text-[var(--clr-text-soft)] py-2.5" style={{ borderBottom: j < phase.deliverables.length - 1 ? '1px solid var(--clr-border)' : 'none' }}>
                          <span className="w-4 h-4 rounded-full grid place-items-center text-[9px] text-[var(--clr-accent)] flex-shrink-0 mt-0.5" style={{ background: 'rgba(6,182,212,.12)', border: '1px solid rgba(6,182,212,.28)' }}>✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Card>
                  {/* Note */}
                  <Card className="p-6" style={{ borderLeft: '3px solid var(--clr-accent)', background: 'var(--clr-surface-2)' }}>
                    <div className="text-[10px] tracking-[.16em] uppercase text-[var(--clr-accent)] mb-3">{phase.note.label}</div>
                    <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7]">{phase.note.text}</p>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section--md section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <SectionHead eyebrow="Process questions" title={<>What people ask before<br />they commit.</>} />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner
        eyebrow="Step one is free"
        title={<>Start with a discovery call.<br />No commitment required.</>}
        subtitle="Book 30 minutes with Nikolay or Maria. We'll ask you the right questions, tell you what the work looks like, and give you an honest assessment — before you sign anything."
        primaryCta={{ label: 'Book the discovery call', href: '/contact' }}
        secondaryCta={{ label: 'See past projects', href: '/case-studies' }}
      />
    </>
  )
}
