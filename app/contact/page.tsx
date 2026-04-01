import type { Metadata } from 'next'
import { Breadcrumb, SectionHead } from '@/components/ui'
import ContactForm from '@/components/sections/ContactForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Contact dmgweb — Book a Demo',
  description: 'Book a free 30-minute call with dmgweb. No sales team, no commitment — just honest answers.',
}

const faqs = [
  { q: 'Is the discovery call really free, with no obligation?', a: "Yes. The first call costs you 30 minutes and nothing else. We don't charge for the initial conversation, and we don't follow up with a proposal unless you ask for one. If it's clear early on that we're not the right fit, we'll say so and suggest someone who might be better placed." },
  { q: 'Do you work with companies outside Bulgaria?', a: "Yes. We work with Bulgarian subsidiaries of EU and international groups, and with companies across the EU that need Bulgarian-market EDIFACT expertise. Our team is based in Sofia, but delivery is location-independent. We've worked with clients in Germany, Austria, Romania, and Greece." },
  { q: "What if we're not sure what we need yet?", a: "That's fine — it's actually the most common situation. Select 'Not sure yet' in the form and describe your situation as you understand it. We'll ask the right questions on the call and give you a clear picture of the right approach, without steering you toward any particular service." },
  { q: 'How quickly can you start once a project is agreed?', a: 'We typically have capacity to begin a new engagement within 2–4 weeks of contract signature. If you have an urgent go-live date, tell us upfront — we\'ll be honest about whether we can meet it.' },
]

export default function ContactPage() {
  return (
    <>
      <div className="container"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} /></div>

      {/* Hero */}
      <div
        className="py-24"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 70% at 85% 45%, rgba(6,182,212,.07) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 10% 70%, rgba(59,130,246,.05) 0%, transparent 60%), linear-gradient(rgba(9,17,31,0.82), rgba(9,17,31,0.90)), url('/images/hero-contact.jpg')`,
          backgroundSize: 'auto, auto, auto, cover',
          backgroundPosition: 'center, center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
        }}
      >
        <div className="container">
          <div className="max-w-[640px]">
            <span className="eyebrow">Get in touch</span>
            <h1 className="mt-2">No sales team.<br /><em className="italic text-[var(--clr-accent)]">Just us.</em></h1>
            <p className="mt-5 text-[17px] font-light text-[var(--clr-text-soft)] leading-[1.8] max-w-[540px]">
              Book a 30-minute call directly with Nikolay or Maria. Tell us what you&apos;re trying to solve. We&apos;ll tell you what it looks like from our side — honestly, and without a pitch attached.
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <section className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-24 items-start">

            {/* Form */}
            <div>
              <div className="rounded-[14px] p-10" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}>
                <h2 className="text-[clamp(20px,2.5vw,28px)] mb-2">Send us a message</h2>
                <p className="text-[14px] text-[var(--clr-text-muted)] mb-8 leading-[1.65]">We respond to every message within one business day. Usually faster.</p>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Who you'll speak to */}
              <div className="rounded-[14px] p-6 relative overflow-hidden" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}>
                <div className="absolute right-[-40px] bottom-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,.07), transparent 70%)' }} />
                <span className="text-[10px] tracking-[.18em] uppercase text-[var(--clr-text-muted)] mb-4 block">Who you&apos;ll speak to</span>
                {siteConfig.team.map((person) => (
                  <div key={person.initials} className="flex items-center gap-3 mb-4 last:mb-0">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-[52px] h-[52px] rounded-full
                          object-cover flex-shrink-0"
                        style={{ border: '1.5px solid var(--clr-border-soft)' }}
                      />
                    ) : (
                      <div
                        className="w-[52px] h-[52px] rounded-full
                          grid place-items-center text-[16px]
                          text-[var(--clr-accent)] flex-shrink-0"
                        style={{
                          background: 'var(--clr-surface-2)',
                          border: '1.5px solid var(--clr-border-soft)',
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {person.initials}
                      </div>
                    )}
                    <div>
                      <div className="text-[14px] font-semibold">{person.name}</div>
                      <div className="text-[12px] text-[var(--clr-text-muted)]">
                        {person.role} — {person.focus}
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7] mt-4 relative z-10">
                  {siteConfig.teamNote}
                </p>
              </div>

              {/* Phone CTA */}
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-4 rounded-[14px] p-5 transition-colors hover:border-[var(--clr-accent)]"
                style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
              >
                <span className="text-[28px]" aria-hidden="true">📞</span>
                <div>
                  <span className="block text-[11px] text-[var(--clr-text-muted)] tracking-[.06em] uppercase mb-1">Prefer to call directly?</span>
                  <div className="text-[20px] font-semibold">{siteConfig.contact.phone}</div>
                  <div className="text-[12px] text-[var(--clr-text-muted)] mt-0.5">{siteConfig.contact.hours}</div>
                </div>
              </a>

              {/* Contact details */}
              <div className="rounded-[14px] p-6" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
                <span className="text-[10px] tracking-[.18em] uppercase text-[var(--clr-text-muted)] mb-4 block">Direct contacts</span>
                {[
                  { icon: '📧', main: siteConfig.contact.email, sub: 'General enquiries & project discussions' },
                  { icon: '📍', main: siteConfig.contact.address, sub: 'Bulgaria · EET (UTC+2 / UTC+3 DST)' },
                  { icon: '🏢', main: siteConfig.contact.legalName, sub: `VAT ${siteConfig.contact.vat} · Founded ${siteConfig.contact.foundedYear}` },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < 2 ? '1px solid var(--clr-border)' : 'none' }}>
                    <span className="text-[16px] flex-shrink-0 mt-0.5" aria-hidden="true">{d.icon}</span>
                    <div>
                      <div className="text-[14px] font-medium">{d.main}</div>
                      <div className="text-[12px] text-[var(--clr-text-muted)] mt-0.5">{d.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office hours */}
              <div className="rounded-[14px] p-6" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
                <span className="text-[10px] tracking-[.18em] uppercase text-[var(--clr-text-muted)] mb-4 block">Office hours</span>
                {[
                  { day: 'Monday – Friday', time: '09:00 – 18:00 EET', open: true },
                  { day: 'Saturday', time: 'Closed', open: false },
                  { day: 'Sunday', time: 'Closed', open: false },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: i < 2 ? '1px solid var(--clr-border)' : 'none' }}>
                    <span className="text-[13px] text-[var(--clr-text-soft)]">{h.day}</span>
                    <span className={`text-[13px] ${h.open ? 'text-[var(--clr-green)]' : 'text-[var(--clr-text-muted)]'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <SectionHead eyebrow="What happens next" title={<>Three steps between now<br />and a clear answer.</>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: 'Step 01', title: 'You send a message', desc: 'Fill in the form — or just email us directly. No pre-call questionnaire. A person reads every message we receive.' },
              { step: 'Step 02 · within 1 business day', title: 'We reply with a proposed time', desc: "Nikolay or Maria will reply personally, suggest two or three times for a 30-minute call, and confirm we've read what you sent." },
              { step: 'Step 03 · the call itself', title: 'An honest 30-minute conversation', desc: "We'll ask about your systems, your trading partners, and your goals. You'll walk away knowing what the work looks like and whether we're the right people for it." },
            ].map((s) => (
              <div key={s.title} className="rounded-[14px] p-6" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
                <span className="text-[10px] tracking-[.18em] uppercase text-[var(--clr-accent)] mb-3 block">{s.step}</span>
                <h3 className="text-[16px] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[var(--clr-text-muted)] leading-[1.7]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <SectionHead eyebrow="Before you reach out" title="A few things worth knowing." />
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </>
  )
}
