import type { Metadata } from 'next'
import { Breadcrumb, SectionHead, Card, CTABanner, LinkSecondary } from '@/components/ui'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'About dmgweb — Our Story, Mission & Values',
  description: "We've been delivering enterprise IT integration in Bulgaria since 2012. Here's who we are, what we believe, and what makes us different.",
}

const milestones = [
  { year: '2012', title: 'Founded in Sofia', desc: 'Two engineers, one conviction: deliver what you promise. First project: EDIFACT onboarding for a national logistics company.' },
  { year: '2015', title: 'First ERP implementation', desc: 'Delivered a full SAP ECC rollout for a Bulgarian retail group — on time, on budget. The client is still with us today.' },
  { year: '2018', title: 'Cybersecurity practice launched', desc: 'GDPR enforcement raised the stakes for every client we worked with. We built a dedicated security team rather than outsource it.' },
  { year: '2021', title: '100th active client', desc: 'Crossed 100 active client relationships. More than 80% of our growth that year came from referrals and expansions within existing accounts.' },
  { year: '2024', title: '300+ projects delivered', desc: 'Expanded into custom software development and IT consulting. Retained ISO 27001 certification for the fourth consecutive year.' },
  { year: '2026', title: 'AI-powered integration era', desc: 'Embracing the next frontier — integrating AI-assisted mapping, intelligent document processing, and predictive monitoring into our EDI and ERP delivery stack. The tools change. The commitment to precision does not.' },
]

const values = [
  { icon: '🎯', n: '01', name: 'Honesty before comfort', principle: "We'll tell you what we actually think — especially when it's inconvenient.", desc: "If your project idea has a flaw, we'll say so before you've signed anything. If something goes wrong during delivery, you'll hear it from us before it becomes a problem you discover on your own. We have lost proposals by being too candid. We have never lost a client's trust that way." },
  { icon: '🔩', n: '02', name: 'Depth over breadth', principle: "We do fewer things so we can do each one better than anyone else.", desc: "We deliberately don't offer everything. The services we do offer — integration, cybersecurity, ERP, consulting, custom software — we understand at a level most generalist firms can't match." },
  { icon: '🤝', n: '03', name: 'Long relationships, not long contracts', principle: "We want clients who stay because the work is good, not because leaving is painful.", desc: "We build systems your team can understand, document every decision we make, and run knowledge-transfer sessions at the end of every engagement. If you outgrow us, we want you to leave well-equipped — not dependent." },
  { icon: '🌍', n: '04', name: 'Local expertise, European standards', principle: '"Built here. Ready for everywhere."', desc: "Being based in Sofia is not a limitation — it's an advantage. We know the Bulgarian regulatory environment, the local ERP ecosystem, and the trading partner landscape better than any international consultancy parachuting in for an engagement." },
]

const commitments = [
  { n: '01', title: "You'll always know where things stand.", desc: "Weekly written status updates. No 'it's all fine' non-answers. If there is a risk or a delay brewing, you will know about it from us before it becomes your problem to discover." },
  { n: '02', title: 'The price we agree is the price you pay.', desc: 'Fixed-price deliverables mean fixed prices. If scope needs to change, we agree the adjustment in writing before the work begins — not as a line item on the final invoice.' },
  { n: '03', title: "Your team will understand what we built.", desc: 'Every system we deliver comes with documentation, a handover session, and a working knowledge transfer to your own people. We leave capacity behind, not dependency.' },
  { n: '04', title: 'The senior who sold it leads the delivery.', desc: 'The person you meet in the discovery phase is the person running your project. You will not be handed to a junior team once the contract is signed.' },
  { n: '05', title: "We'll tell you if we're not the right fit.", desc: 'If your project needs skills or scale we genuinely can\'t match, we\'ll say so — and point you toward someone who can. Our reputation matters more than any single contract.' },
  { n: '06', title: "We stay reachable after we're done.", desc: "Post-project support doesn't disappear the moment the final invoice is paid. Named contacts, documented SLAs, and a team that picks up the phone — for as long as you need." },
]

export default function AboutPage() {
  return (
    <>
      <div className="container"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} /></div>

      {/* Hero */}
      <div
        className="py-24"
        style={{
          backgroundImage: `radial-gradient(ellipse 55% 70% at 85% 45%, rgba(6,182,212,.07) 0%, transparent 65%), linear-gradient(rgba(9,17,31,0.82), rgba(9,17,31,0.90)), url('/images/hero-about.jpg')`,
          backgroundSize: 'auto, auto, cover',
          backgroundPosition: 'center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        }}
      >
        <div className="container max-w-[720px]">
          <span className="eyebrow">Why dmgweb</span>
          <h1 className="mt-2">We&apos;ve been doing this<br /><em className="italic text-[var(--clr-accent)]">since before it was easy.</em></h1>
          <p className="mt-5 text-[18px] font-light text-[var(--clr-text-soft)] leading-[1.8] max-w-[600px]">
            Twelve years of enterprise IT delivery in Bulgaria has taught us more than any certification ever could. Here&apos;s who we are, what we believe, and why the companies that work with us tend to stay.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a href="/contact" className="inline-flex items-center gap-2 font-semibold text-[15px] px-[30px] py-[14px] rounded-[5px] transition-all hover:-translate-y-px hover:bg-[#22d3ee]" style={{ background: 'var(--clr-accent)', color: '#07111f', minHeight: '44px' }}>Start a conversation →</a>
            <LinkSecondary href="/services">See our services →</LinkSecondary>
          </div>
        </div>
      </div>

      {/* Story */}
      <section id="story" className="section" style={{ scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="Our story" title={<>Started small.<br />Stayed honest.</>} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-24 items-start">
            {/* Prose */}
            <div className="flex flex-col gap-5 text-[16px] text-[var(--clr-text-soft)] leading-[1.85]">
              <p><strong>DMG Web</strong> was founded in Sofia in 2012 by two engineers who had spent the previous decade inside large enterprise IT departments — watching projects fail not because the technology was wrong, but because the vendor relationship was. Misaligned incentives. Overscoped proposals. Teams that disappeared after go-live.</p>
              <p>They started with a single conviction: that a small, focused team with genuine technical depth could outperform a large consultancy on almost every project that mattered to mid-market and enterprise clients in Bulgaria.</p>
              <blockquote className="border-l-[3px] border-[var(--clr-accent)] pl-5 my-2">
                <p className="text-[clamp(18px,2.2vw,24px)] text-[var(--clr-text)]" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', lineHeight: 1.5 }}>&ldquo;We didn&apos;t want to build the biggest IT company in Bulgaria. We wanted to build the one our clients would still be calling in ten years.&rdquo;</p>
              </blockquote>
              <p>The first years were defined by EDIFACT integration — the unglamorous, complex work of connecting Bulgarian enterprises to their EU trading partners. As our clients grew, so did the work. ERP migrations. Security assessments. Custom software that replaced systems nobody else would touch.</p>
              <p>Twelve years later, <strong>DMG Web</strong> has delivered over 300 integration and software projects, maintained a client retention rate that embarrasses our industry average, and never once missed a go-live date without telling the client weeks in advance.</p>
            </div>

            {/* Timeline */}
            <div className="flex flex-col relative" aria-label="Company milestones">
              <div className="absolute left-[19px] top-[40px] bottom-[40px] w-px opacity-40" style={{ background: 'linear-gradient(180deg, var(--clr-accent), var(--clr-blue), transparent)' }} />
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-5 pb-10 last:pb-0 relative">
                  <div className="w-[38px] h-[38px] rounded-full grid place-items-center text-[10px] font-semibold text-[var(--clr-accent)] flex-shrink-0 relative z-10" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)', letterSpacing: '.04em' }}>{m.year}</div>
                  <div className="pt-2">
                    <div className="text-[14px] font-semibold mb-1">{m.title}</div>
                    <div className="text-[13px] text-[var(--clr-text-muted)] leading-[1.65]">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section" style={{ borderBlock: '1px solid var(--clr-border)', background: 'linear-gradient(180deg, transparent, rgba(6,182,212,.03), transparent)', scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          {/* Big statement */}
          <div className="text-center pb-24 mb-24" style={{ borderBottom: '1px solid var(--clr-border)' }}>
            <span className="eyebrow justify-center">Our mission</span>
            <h2 className="mt-2 max-w-[780px] mx-auto">To make enterprise IT delivery in Bulgaria<br /><em className="italic text-[var(--clr-accent)]">as reliable as it should always have been.</em></h2>
            <p className="mt-4 text-[17px] text-[var(--clr-text-soft)] max-w-[580px] mx-auto leading-[1.8]">Not faster. Not cheaper. Reliable. The kind of reliable where your team isn&apos;t anxious the week before go-live, where the invoice matches the proposal, and where the person who sold the engagement is still reachable six months after it closes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { label: 'Mission', title: 'Deliver complex technology with the clarity and accountability of a trusted colleague.', body: 'Every <strong>DMG Web</strong> engagement is scoped honestly, delivered transparently, and handed over completely. We measure success the same way our clients do — did it work, on time, for the price agreed? That sounds basic. In enterprise IT, it is rarer than it should be.' },
              { label: 'Vision', title: 'A Bulgarian IT partner that any European enterprise would be proud to have.', body: "The talent in Bulgaria is world-class. The local market has not always had a partner that packages that talent into an enterprise-grade delivery model. That is what we are building — and what we believe we have already become for the clients who know us." },
            ].map((col) => (
              <div key={col.label}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-[18px] h-px bg-[var(--clr-accent)]" />
                  <span className="text-[10px] tracking-[.20em] uppercase text-[var(--clr-accent)]">{col.label}</span>
                </div>
                <h3 className="text-[clamp(20px,2.5vw,28px)] mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, lineHeight: 1.3 }}>{col.title}</h3>
                <p className="text-[15px] text-[var(--clr-text-soft)] leading-[1.8]" dangerouslySetInnerHTML={{ __html: col.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="section" style={{ scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="What we stand for" title={<>Four values we<br />actually operate by.</>} subtitle="Not aspirational wall art. These are the things that determine how we scope engagements, hire people, and have difficult conversations with clients." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v) => (
              <Card key={v.n} className="p-10 transition-all hover:-translate-y-1 hover:border-[var(--clr-border-soft)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-[8px] grid place-items-center text-[22px]" style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border-soft)' }}>{v.icon}</div>
                  <span className="text-[42px] text-[var(--clr-border-soft)] leading-none" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{v.n}</span>
                </div>
                <h3 className="text-[20px] font-semibold mb-2">{v.name}</h3>
                <p className="text-[16px] text-[var(--clr-accent)] mb-3" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', lineHeight: 1.4 }}>{v.principle}</p>
                <p className="text-[14px] text-[var(--clr-text-muted)] leading-[1.75]">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="section--slim section" style={{ borderBlock: '1px solid var(--clr-border)', background: 'linear-gradient(180deg, transparent, rgba(59,130,246,.04), transparent)' }}>
        <div className="container">
          <div
            className="grid grid-cols-2 md:grid-cols-3
              gap-px rounded-[14px] overflow-hidden"
            style={{
              background: 'var(--clr-border)',
              border: '1px solid var(--clr-border)',
            }}
          >
            {siteConfig.stats.slice(0, 4).map((s) => (
              <div
                key={s.value}
                className="text-center p-8 transition-colors
                  hover:bg-[var(--clr-surface-3)]"
                style={{ background: 'var(--clr-surface)' }}
              >
                <div
                  className="text-[clamp(36px,4vw,52px)]
                    text-[var(--clr-accent)] leading-none mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.value}
                </div>
                <div className="text-[14px] font-medium mb-1">
                  {s.label}
                </div>
              </div>
            ))}

            {/* Hardcoded last two cells */}
            <div
              className="text-center p-8 transition-colors
                hover:bg-[var(--clr-surface-3)]"
              style={{ background: 'var(--clr-surface)' }}
            >
              <div
                className="text-[clamp(36px,4vw,52px)]
                  text-[var(--clr-accent)] leading-none mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                94%
              </div>
              <div className="text-[14px] font-medium mb-1">
                Client retention rate
              </div>
              <div className="text-[12px] text-[var(--clr-text-muted)]">
                Measured over rolling 3 years
              </div>
            </div>

            <div
              className="text-center p-8 transition-colors
                hover:bg-[var(--clr-surface-3)]"
              style={{ background: 'var(--clr-surface)' }}
            >
              <div
                className="text-[clamp(36px,4vw,52px)]
                  text-[var(--clr-accent)] leading-none mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                0
              </div>
              <div className="text-[14px] font-medium mb-1">
                Missed go-live dates
              </div>
              <div className="text-[12px] text-[var(--clr-text-muted)]">
                We communicate issues early
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section" style={{ borderTop: '1px solid var(--clr-border)', scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="The team" title={<>The people you&apos;ll actually<br />work with.</>} subtitle="No account managers passing messages. The specialist leading your project is the person you talk to — from the first call through to handover." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.team.map((p) => (
              <Card
                key={p.initials}
                className="overflow-hidden transition-all
                  hover:-translate-y-1 hover:border-[var(--clr-border-soft)]"
              >
                <div
                  className="h-[160px] grid place-items-center
                    relative overflow-hidden"
                  style={{
                    background: 'var(--clr-surface-2)',
                    borderBottom: '1px solid var(--clr-border)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 60% 60% at 50% 60%, var(--clr-accent-dim), transparent)',
                    }}
                  />
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="relative w-16 h-16 rounded-full
                        object-cover object-center"
                      style={{ border: '2px solid var(--clr-border-soft)' }}
                    />
                  ) : (
                    <div
                      className="relative w-16 h-16 rounded-full grid place-items-center text-[22px]
                        text-[var(--clr-accent)]"
                      style={{
                        background: 'var(--clr-surface-3)',
                        border: '1.5px solid var(--clr-border-soft)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {p.initials}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[16px] font-semibold mb-1">{p.name}</div>
                  <div className="text-[13px] text-[var(--clr-accent)] mb-3">{p.role}</div>
                  <p className="text-[13px] text-[var(--clr-text-muted)]
                    leading-[1.65]">
                    {p.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section id="commitments" className="section" style={{ borderTop: '1px solid var(--clr-border)', background: 'linear-gradient(180deg, transparent, rgba(6,182,212,.03), transparent)', scrollMarginTop: 'calc(68px + 24px)' }}>
        <div className="container">
          <SectionHead eyebrow="Our commitments to you" title={<>Six things we promise<br />on every engagement.</>} subtitle="Not aspirations. Commitments. Things you can hold us to — and that we have held ourselves to for twelve years." center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commitments.map((c) => (
              <Card key={c.n} className="p-6 transition-all hover:border-[var(--clr-border-soft)]">
                <div className="text-[38px] text-[var(--clr-border-soft)] leading-none mb-3" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{c.n}</div>
                <h3 className="text-[17px] mb-2">{c.title}</h3>
                <p className="text-[14px] text-[var(--clr-text-muted)] leading-[1.75]">{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {siteConfig.memberships.length > 0 && (
        <section
          className="section--slim section"
          style={{ borderTop: '1px solid var(--clr-border)' }}
        >
          <div className="container">
            <div
              className="flex flex-col md:flex-row
                items-center gap-10 rounded-[14px] p-8"
              style={{
                background: 'var(--clr-surface)',
                border: '1px solid var(--clr-border-soft)',
              }}
            >
              <div className="flex flex-col">
                {siteConfig.memberships.map((m, index) => (
                  <div key={m.name}>
                    {/* Divider between items — not before first */}
                    {index > 0 && (
                      <div
                        style={{
                          height: '1px',
                          background: 'var(--clr-border)',
                          margin: '24px 0',
                        }}
                      />
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Logo */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{
                          width: '100px',
                          minWidth: '100px',
                          height: '80px',
                          background: 'var(--clr-surface-3)',
                          borderRadius: '10px',
                          border: '1px solid var(--clr-border)',
                          padding: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        {m.logo ? (
                          <img
                            src={m.logo}
                            alt={m.name}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              opacity: 0.9,
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              fontSize: '18px',
                              fontWeight: 700,
                              color: 'var(--clr-accent)',
                            }}
                          >
                            Membership
                          </span>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--clr-accent)',
                            display: 'block',
                            marginBottom: '4px',
                          }}
                        >
                          Industry membership
                        </span>
                        <h3
                          style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'var(--clr-text)',
                            margin: '0 0 6px',
                          }}
                        >
                          {m.fullName}
                        </h3>
                        <p
                          style={{
                            fontSize: '13px',
                            color: 'var(--clr-text-muted)',
                            lineHeight: '1.65',
                            margin: 0,
                          }}
                        >
                          {m.since ? `Member since ${m.since}. ` : 'Active member. '}
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: 'var(--clr-accent)',
                              textDecoration: 'none',
                            }}
                          >
                            {m.url.replace('https://', '')} →
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* GLN + VAT shown once at the bottom */}
                <div
                  style={{
                    height: '1px',
                    background: 'var(--clr-border)',
                    margin: '24px 0 16px',
                  }}
                />
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--clr-text-muted)',
                    margin: 0,
                  }}
                >
                  GLN {siteConfig.contact.gln}
                  <span
                    style={{
                      margin: '0 8px',
                      color: 'var(--clr-border-soft)',
                    }}
                  >
                    |
                  </span>
                  VAT {siteConfig.contact.vat}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTABanner
        eyebrow="Ready when you are"
        title={<>If this sounds like the kind of<br />partner you&apos;ve been looking for —</>}
        subtitle="Book a free 30-minute call with Nikolay or Maria directly. No sales team, no pre-call questionnaire. Just a conversation about what you're working on and whether we can help."
        primaryCta={{ label: 'Book a discovery call', href: '/contact' }}
        secondaryCta={{ label: 'Read about our services', href: '/services' }}
      />
    </>
  )
}
