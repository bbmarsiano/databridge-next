import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig, stats, testimonials, clients } from '@/lib/siteConfig'
import { SectionHead, BtnPrimary, BtnGhost, LinkSecondary, Tag, Card, CTABanner } from '@/components/ui'
import TestimonialsSlider from '@/components/sections/TestimonialsSlider'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'dmgweb — Optimized solutions. Targeted results.',
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────── */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="min-h-[100svh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(9,17,31,0.85), rgba(9,17,31,0.92)), url('/images/hero-homepage.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
            {/* Left */}
            <div>
              <span className="eyebrow">EDIFACT Integration &amp; IT Services — Bulgaria</span>
              <h1 id="hero-heading" className="mt-2">
                Enterprise data<br />
                integration, <em className="italic text-[var(--clr-accent)]">built<br />to last.</em>
              </h1>
              <p className="mt-6 text-[18px] font-light text-[var(--clr-text-soft)] leading-[1.75] max-w-[500px]">
                We connect Bulgarian and EU enterprises with their trading partners, ERPs, and supply chains — using EDIFACT, XML and EDI standards. Full implementation and managed services from Sofia.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <BtnPrimary href="/contact" large>Book a Free Discovery Call →</BtnPrimary>
                <LinkSecondary href="/case-studies">See case studies →</LinkSecondary>
              </div>
              {/* Stats — responsive */}
              <div
                className="mt-10 pt-10"
                style={{ borderTop: '1px solid var(--clr-border)' }}
                aria-label="Key statistics"
              >
                {/* Desktop: single row with vertical dividers */}
                <div className="hidden lg:flex items-stretch">
                  {stats.map((s, i) => (
                    <div key={s.value} className="flex items-stretch">
                      {i > 0 && (
                        <div
                          style={{
                            width: '1px',
                            background: 'var(--clr-border)',
                            margin: '0 14px',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <div className="flex flex-col justify-center">
                        <span
                          className="block leading-none mb-1"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(20px, 2vw, 30px)',
                            color: 'var(--clr-text)',
                          }}
                        >
                          {s.value}
                        </span>
                        <span
                          className="block text-[11px] text-[var(--clr-text-muted)]"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {s.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile + tablet: 2→3 col card grid */}
                <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.value}
                      className="flex flex-col py-3 px-4 rounded-[8px]"
                      style={{
                        background: 'var(--clr-surface)',
                        border: '1px solid var(--clr-border)',
                      }}
                    >
                      <span
                        className="block leading-none mb-1"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '20px',
                          color: 'var(--clr-text)',
                        }}
                      >
                        {s.value}
                      </span>
                      <span className="block text-[11px] text-[var(--clr-text-muted)]">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal card — hidden on mobile */}
            <div
              className="hidden lg:block rounded-[14px] overflow-hidden"
              style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
              aria-hidden="true"
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: 'var(--clr-surface-2)', borderBottom: '1px solid var(--clr-border)' }}
              >
                <span className="w-[11px] h-[11px] rounded-full bg-red-500" />
                <span className="w-[11px] h-[11px] rounded-full bg-amber-400" />
                <span className="w-[11px] h-[11px] rounded-full bg-green-500" />
                <span className="ml-2 text-[11px] text-[var(--clr-text-muted)]" style={{ fontFamily: 'var(--font-body)' }}>EDIFACT / D96A / ORDERS</span>
              </div>
              <div className="p-6 text-[13px] leading-[1.9]" style={{ fontFamily: 'monospace', color: 'var(--clr-text-soft)' }}>
                <div className="tk-cmt">{'// Incoming EDIFACT ORDERS message'}</div>
                <div><span className="tk-brc">{'{'}</span></div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;segment&quot;</span>: <span className="tk-str">&quot;UNH&quot;</span>,</div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;type&quot;</span>: <span className="tk-str">&quot;ORDERS&quot;</span>,</div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;version&quot;</span>: <span className="tk-str">&quot;D96A&quot;</span>,</div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;partner&quot;</span>: <span className="tk-str">&quot;METRO_BG&quot;</span>,</div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;lines&quot;</span>: <span className="tk-num">47</span>,</div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;status&quot;</span>: <span className="tk-ok">&quot;mapped ✓&quot;</span>,</div>
                <div>&nbsp;&nbsp;<span className="tk-key">&quot;target&quot;</span>: <span className="tk-str">&quot;SAP_ECC&quot;</span></div>
                <div><span className="tk-brc">{'}'}</span></div>
                <div className="mt-4 tk-cmt">{'// Forwarded to ERP in 340ms'}</div>
                <div>
                  <span style={{ color: 'var(--clr-accent)' }}>→</span>
                  {' '}
                  <span className="tk-ok">Integration successful</span>
                  {' '}
                  <span className="cursor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────── */}
      <section
        aria-label="Trusted by"
        style={{
          borderTop: '1px solid var(--clr-border)',
          borderBottom: '1px solid var(--clr-border)',
          padding: '48px 0',
          background: 'var(--clr-bg)',
        }}
      >
        <div className="container">
          {/* Label */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--clr-text-muted)',
              textAlign: 'center',
              marginBottom: '36px',
            }}
          >
            Trusted by leading Bulgarian &amp; EU enterprises
          </p>

          {/* Logo grid */}
          <div
            role="list"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px 0',
            }}
          >
            {clients.map((client, index) => (
              <div
                key={client.name}
                role="listitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Divider between items */}
                {index > 0 && (
                  <div
                    style={{
                      width: '1px',
                      height: '32px',
                      background: 'var(--clr-border)',
                      margin: '0 32px',
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Client — linked logo or text pill */}
                {client.logo ? (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={client.name}
                    aria-label={client.name}
                    className="trust-client"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      style={{
                        filter: client.noInvert
                          ? 'none'
                          : 'brightness(0) invert(1)',
                      }}
                    />
                  </a>
                ) : (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trust-client-pill"
                    aria-label={client.name}
                  >
                    {client.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ─────────────────────────────── */}
      <section id="services" aria-labelledby="services-heading" className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title={<>Complete EDI &amp; IT<br />integration services</>}
            subtitle="From your first EDIFACT mapping to years of managed services — we own the full lifecycle."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '⬡', tag: 'Core service', title: 'EDIFACT Integration', desc: 'Full-cycle implementation: message mapping, trading partner onboarding, sandbox testing, and supervised go-live. All UN/CEFACT message types supported.', href: '/services#edifact' },
              { icon: '◈', tag: 'Advisory', title: 'IT Consulting', desc: 'Architecture reviews, ERP integration strategy, and technology roadmaps. Clear, deliverable plans — no vague strategy decks.', href: '/services#consulting' },
              { icon: '◉', tag: 'Ongoing', title: 'Managed IT Services', desc: '24/7 monitoring, helpdesk support, SLA-backed uptime guarantees, and proactive incident management. We run your integration infrastructure.', href: '/services' },
            ].map((s) => (
              <Card key={s.title} className="p-10 flex flex-col gap-3 hover:border-[rgba(6,182,212,.35)]">
                <span className="text-[28px]" aria-hidden="true">{s.icon}</span>
                <Tag color="cyan">{s.tag}</Tag>
                <h3 className="mt-1">{s.title}</h3>
                <p className="text-[14px] text-[var(--clr-text-muted)] leading-[1.75] flex-1">{s.desc}</p>
                <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '16px', marginTop: '8px' }}>
                  <Link href={s.href} className="inline-flex items-center gap-1.5 text-[13px] text-[var(--clr-accent)] hover:gap-2.5 transition-all">
                    Explore {s.title.split(' ')[0]} services →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <BtnGhost href="/services">View all six services →</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES PREVIEW ─────────────────────────── */}
      <section
        id="cases"
        aria-labelledby="cases-heading"
        className="section"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,.03), transparent)' }}
      >
        <div className="container">
          <SectionHead
            eyebrow="Case studies"
            title={<>Real integrations.<br />Measurable results.</>}
            subtitle="Every figure below is from a live client project — not a projection."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { bg: '🏪', label: 'RETAIL / SAP ECC', tag: 'EDIFACT · RETAIL · SAP', title: 'Supplier invoice automation for a national retail chain', desc: 'Implemented INVOIC D96A with 120+ suppliers, integrated with SAP MM, eliminating all manual PDF invoice processing.', result: '↑ Invoice processing time reduced by 78%' },
              { bg: '🚛', label: 'LOGISTICS / ORACLE WMS', tag: 'EDIFACT · LOGISTICS · ORACLE', title: 'Real-time shipment visibility for a national 3PL provider', desc: 'Connected DESADV and RECADV flows between Oracle WMS and 6 major retail customers, enabling live delivery tracking.', result: '↑ Customer dispute resolution cut by 60%' },
              { bg: '🏭', label: 'MANUFACTURING / DYNAMICS 365', tag: 'EDI · MANUFACTURING · DYNAMICS', title: 'JIT manufacturing integration for an automotive supplier', desc: 'Implemented DELFOR and DELJIT with a Tier-1 OEM, feeding production scheduling directly into Dynamics 365.', result: '↑ Inventory holding cost reduced by €240K/year' },
            ].map((c) => (
              <article key={c.title} className="rounded-[14px] overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[rgba(6,182,212,.4)]" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
                <div className="h-[140px] relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--clr-surface-2), var(--clr-surface-3))', borderBottom: '1px solid var(--clr-border)' }} aria-hidden="true">
                  <span className="absolute text-[60px] opacity-[.07]">{c.bg}</span>
                  <span className="relative text-[11px] tracking-[.10em] text-[var(--clr-text-muted)]">{c.label}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[11px] text-[var(--clr-text-muted)] tracking-[.06em] uppercase mb-2">{c.tag}</span>
                  <h3 className="text-[15px] leading-[1.45] flex-1 mb-2">{c.title}</h3>
                  <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7]">{c.desc}</p>
                  <div className="text-[12px] text-[var(--clr-green)] flex items-center gap-1 mt-4 pt-4" style={{ borderTop: '1px solid var(--clr-border)' }}>{c.result}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-16">
            <BtnGhost href="/case-studies">View all case studies →</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section id="testimonials" aria-labelledby="testimonials-heading" className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,.02), transparent)' }}>
        <div className="container">
          <SectionHead eyebrow="Client voices" title="Trusted by enterprise teams across Bulgaria and the EU" center />
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section id="why-us" aria-labelledby="why-heading" className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <SectionHead eyebrow="Why dmgweb" title="The integration partner enterprises actually keep" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-24 items-start">
            <div className="flex flex-col">
              {[
                { n: '01', title: 'EDIFACT expertise, not a side service', desc: "EDI integration is our primary discipline — not a module in a larger ERP product. Our team holds active UN/CEFACT certifications and has mapped every major message type in use across Bulgarian and EU trade networks." },
                { n: '02', title: 'We know the Bulgarian market', desc: "Local team, local compliance knowledge — NRA, Customs Agency, GS1 Bulgaria standards. We don't have to learn your local regulatory context from scratch on your project." },
                { n: '03', title: 'Enterprise-grade SLA from day one', desc: "99.8% uptime commitment, 4-hour critical incident response, named account manager, and quarterly business reviews — documented and signed before work begins." },
                { n: '04', title: 'ERP-agnostic integration architecture', desc: "We integrate with SAP, Dynamics, Oracle, and bespoke systems. Our middleware layer is ERP-neutral — you're not locked in if your stack changes." },
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-[44px_1fr] gap-5 py-10" style={{ borderBottom: i < 3 ? '1px solid var(--clr-border)' : 'none' }}>
                  <span className="text-[26px] text-[var(--clr-border-soft)] leading-none pt-1" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{item.n}</span>
                  <div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-[14px] text-[var(--clr-text-muted)] leading-[1.75]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Metric grid */}
            <div
              className="grid grid-cols-2 gap-px rounded-[14px] overflow-hidden lg:sticky lg:top-[88px]"
              style={{ background: 'var(--clr-border)', border: '1px solid var(--clr-border)' }}
              aria-label="Key metrics"
            >
              {[
                { val: '4 days', lbl: 'Average supplier onboarding' },
                { val: '€0', lbl: 'Implementation overruns in 2023' },
                { val: '60+', lbl: 'Active trading partner connections' },
                { val: '12 yr', lbl: 'Average client relationship' },
              ].map((m) => (
                <div key={m.val} className="p-6 transition-colors hover:bg-[var(--clr-surface-3)]" style={{ background: 'var(--clr-surface)' }}>
                  <span className="block text-[clamp(26px,3vw,38px)] text-[var(--clr-accent)] leading-none mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>{m.val}</span>
                  <span className="text-[13px] text-[var(--clr-text-muted)]">{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <LinkSecondary href="/about">Read our full story and values →</LinkSecondary>
          </div>
        </div>
      </section>

      {/* ── PROCESS PREVIEW ──────────────────────────────── */}
      <section id="process" aria-labelledby="process-heading" className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <SectionHead eyebrow="How we work" title="From first call to live integration in four steps" subtitle="A predictable, transparent delivery process — so you always know what's happening and what's next." center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {[
              { n: '01', title: 'Discovery Call', desc: "We map your systems, trading partner requirements, and integration goals. No commitment — just clarity.", time: 'Week 1 · Free' },
              { n: '02', title: 'Solution Design', desc: 'Detailed integration specification: message flows, mapping rules, ERP touchpoints, and a fixed-price proposal.', time: 'Weeks 2–3' },
              { n: '03', title: 'Build & Test', desc: 'Full message validation in sandbox with your trading partners, then UAT with your internal team.', time: 'Weeks 4–8' },
              { n: '04', title: 'Go-Live & Manage', desc: 'Supervised production cutover, 30-day hypercare, then managed services or handover to your team.', time: 'Weeks 9–10+' },
            ].map((step) => (
              <Card key={step.n} className="p-6 transition-all hover:-translate-y-1 hover:border-[var(--clr-border-soft)]">
                <span className="block text-[13px] text-[var(--clr-accent)] tracking-[.04em] mb-4">{step.n}</span>
                <h3 className="text-[16px] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7]">{step.desc}</p>
                <span className="inline-block mt-4 text-[11px] text-[var(--clr-text-muted)] px-2.5 py-1 rounded-[20px]" style={{ background: 'var(--clr-surface-2)' }}>{step.time}</span>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <LinkSecondary href="/process">See the full process breakdown →</LinkSecondary>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────── */}
      <section className="section--slim section" aria-label="Certifications" style={{ borderBlock: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div className="flex items-center flex-wrap gap-10 justify-center">
            {siteConfig.certifications.map((c) => (
              <div key={c.name} className="flex items-center gap-2.5">
                <span className="text-[22px]" aria-hidden="true">{c.icon}</span>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--clr-text-soft)]">{c.name}</div>
                  <div className="text-[11px] text-[var(--clr-text-muted)]">{c.sub}</div>
                </div>
              </div>
            ))}
            {siteConfig.memberships.map((m) => (
              <a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                title={m.fullName}
              >
                {m.logo ? (
                  <img
                    src={m.logo}
                    alt={m.name}
                    className="h-[28px] w-auto object-contain"
                    style={{
                      opacity: 0.85,
                      height: '28px',
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div>
                    <div className="text-[13px] font-semibold text-[var(--clr-text-soft)]">Membership</div>
                    <div className="text-[11px] text-[var(--clr-text-muted)]">
                      Industry association
                    </div>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <CTABanner
        eyebrow="Ready to start?"
        title={<>Automate your trading partner<br />connections today</>}
        subtitle="Book a free 30-minute discovery call. We'll map your current setup and show you exactly what's possible — no sales pitch, no commitment required."
        primaryCta={{ label: 'Book a Discovery Call', href: '/contact' }}
        secondaryCta={{ label: 'Or request a quote', href: '/contact' }}
      />

      {/* ── CONTACT INLINE ───────────────────────────────── */}
      <section id="contact" aria-labelledby="contact-heading" className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <SectionHead eyebrow="Get in touch" title="Let's talk about your integration needs" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <p className="text-[16px] text-[var(--clr-text-soft)] leading-[1.8] mb-6">
                Tell us what you&apos;re working on. Nikolay or Maria will reply personally within one business day.
              </p>
              {/* Phone CTA */}
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-4 rounded-[var(--radius)] px-5 py-4 mb-5 transition-colors hover:border-[var(--clr-accent)]"
                style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', textDecoration: 'none', color: 'var(--clr-text)' }}
              >
                <span className="text-[22px]" aria-hidden="true">📞</span>
                <div>
                  <span className="block text-[11px] text-[var(--clr-text-muted)] tracking-[.06em] uppercase mb-0.5">Call us directly</span>
                  <div className="text-[18px] font-semibold">{siteConfig.contact.phone}</div>
                  <div className="text-[11px] text-[var(--clr-text-muted)] mt-0.5">{siteConfig.contact.hours}</div>
                </div>
              </a>
              <div className="flex flex-col gap-4 text-[14px] text-[var(--clr-text-soft)]">
                <span>📧 {siteConfig.contact.email}</span>
                <span>📍 {siteConfig.contact.address}</span>
              </div>
              <div className="mt-6">
                <LinkSecondary href="/contact">Go to full contact page →</LinkSecondary>
              </div>
            </div>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  )
}
