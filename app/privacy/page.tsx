import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Privacy Policy — dmgweb',
  description:
    'How DMG Web LTD collects, uses and protects your personal data. GDPR-compliant privacy policy.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'March 2025'

export default function PrivacyPage() {
  const {
    legalName,
    vat,
    address,
    addressRegistered,
    email,
  } = siteConfig.contact

  return (
    <>
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' },
          ]}
        />
      </div>
      <div className="container py-24 max-w-[780px]">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-2 mb-4">Privacy Policy</h1>
        <p className="text-[var(--clr-text-muted)] text-[14px] mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <div
          className="prose prose-invert
          prose-p:text-[var(--clr-text-soft)]
          prose-headings:text-[var(--clr-text)]
          prose-a:text-[var(--clr-accent)]
          prose-strong:text-[var(--clr-text)]
          max-w-none"
          style={{ lineHeight: '1.85' }}
        >
          <h2>1. Who we are and how to contact us</h2>
          <p>
            <strong>{legalName}</strong> (&ldquo;dmgweb&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is
            a limited liability company registered in Bulgaria under VAT
            number {vat}. Our registered address is {addressRegistered}.
          </p>
          <p>
            We are the Data Controller for personal data collected
            through this website. For all privacy-related enquiries,
            contact our Data Protection contact at:{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
          <p>
            As a cybersecurity services provider, we apply the same
            security standards to your personal data that we recommend
            to our clients. Data protection is not a compliance
            checkbox for us — it is a professional obligation.
          </p>

          <h2>2. What data we collect and why</h2>

          <h3>2.1 Contact form submissions</h3>
          <p>
            When you submit our contact form we collect: your name,
            work email address, company name (optional), phone number
            (optional), the service you are enquiring about, and the
            content of your message.
          </p>
          <p>
            <strong>Purpose:</strong> To respond to your enquiry and, if
            we enter a business relationship, to manage that
            relationship.
            <br />
            <strong>Legal basis:</strong> Legitimate interest
            (Article 6(1)(f) GDPR) — responding to unsolicited business
            enquiries is a legitimate interest of both parties.
            <br />
            <strong>Retention:</strong> 24 months from submission date,
            or until you request deletion.
          </p>

          <h3>2.2 Server and security logs</h3>
          <p>
            Our servers automatically record standard technical logs: IP
            address, browser type, operating system, pages visited, and
            timestamps. These logs exist for security monitoring,
            incident response, and performance optimisation.
          </p>
          <p>
            <strong>Purpose:</strong> Security monitoring and incident
            response. As a cybersecurity company, we have a legitimate and
            professional obligation to monitor for threats.
            <br />
            <strong>Legal basis:</strong> Legitimate interest
            (Article 6(1)(f) GDPR).
            <br />
            <strong>Retention:</strong> 90 days, then automatically purged.
          </p>

          <h3>2.3 Cookies and local storage</h3>
          <p>
            We use the minimum number of cookies necessary to operate the
            website. See Section 6 for full details.
          </p>

          <h2>3. How we use your data</h2>
          <p>
            We use your personal data only for the purposes stated at
            collection. Specifically:
          </p>
          <ul>
            <li>To respond to your contact form submission</li>
            <li>
              To send you the document you requested (if applicable)
            </li>
            <li>To manage our business relationship if you become a client</li>
            <li>To monitor and protect the security of our systems</li>
          </ul>
          <p>
            We do <strong>not</strong> use your data for: marketing without
            explicit consent, profiling, automated decision-making, or selling
            to third parties.
          </p>

          <h2>4. Who we share your data with</h2>
          <p>
            We share your data only with the sub-processors necessary to deliver our services:
          </p>
          <ul>
            <li>
              <strong>Resend</strong> (email delivery) — used to send you confirmation emails after contact form submission. Resend processes data in the EU.
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}Resend Privacy Policy →
              </a>
            </li>
            <li>
              <strong>Supabase</strong> (database) — used to store contact form submissions securely. Data is stored in EU-West region.
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}Supabase Privacy Policy →
              </a>
            </li>
            <li>
              <strong>Vercel</strong> (website hosting) — our website is hosted on Vercel&apos;s global edge network.
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}Vercel Privacy Policy →
              </a>
            </li>
            <li>
              <strong>Cloudflare Turnstile</strong> (bot protection) — used on the contact form to prevent automated abuse. Turnstile is privacy-first and does not use tracking cookies or build advertising profiles.
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}Cloudflare Privacy Policy →
              </a>
            </li>
          </ul>
          <p>
            All sub-processors are bound by data processing agreements. No data is transferred outside the EU/EEA without adequate safeguards.
          </p>

          <h2>5. Your rights under GDPR</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Right of access</strong> — request a copy of the data we hold about you</li>
            <li><strong>Right to rectification</strong> — request correction of inaccurate data</li>
            <li><strong>Right to erasure</strong> — request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li><strong>Right to restrict processing</strong> — request that we limit how we use your data</li>
            <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong>Right to object</strong> — object to processing based on legitimate interest</li>
            <li><strong>Right to withdraw consent</strong> — where processing is based on consent, withdraw it at any time</li>
          </ul>
          <p>
            To exercise any of these rights, email{' '}
            <a href={`mailto:${email}`}>{email}</a>. We will respond within 30 days. You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (CPDP) at{' '}
            <a
              href="https://www.cpdp.bg"
              target="_blank"
              rel="noopener noreferrer"
            >
              cpdp.bg
            </a>.
          </p>

          <h2>6. Cookies</h2>
          <p>
            We are committed to minimal cookie usage. Here is a complete list of what we use:
          </p>

          <div
            style={{
              background: 'var(--clr-surface-2)',
              border: '1px solid var(--clr-border)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            {[
              {
                name: 'dmgweb_cookie_consent',
                type: 'Necessary',
                purpose: 'Stores your cookie preferences so we do not ask again',
                duration: '12 months',
                provider: 'dmg-web.net',
              },
              {
                name: 'cf_clearance / cf_chl_*',
                type: 'Security',
                purpose: 'Cloudflare Turnstile bot protection on the contact form. No ad tracking.',
                duration: 'Session',
                provider: 'Cloudflare',
              },
            ].map((cookie, i) => (
              <div
                key={cookie.name}
                style={{
                  padding: '16px 20px',
                  borderBottom: i === 0 ? '1px solid var(--clr-border)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '6px',
                  }}
                >
                  <code
                    style={{
                      fontSize: '12px',
                      color: 'var(--clr-accent)',
                      background: 'rgba(6,182,212,0.08)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {cookie.name}
                  </code>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--clr-green)',
                      background: 'rgba(34,197,94,0.1)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {cookie.type}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--clr-text-muted)',
                    margin: 0,
                    lineHeight: '1.6',
                  }}
                >
                  {cookie.purpose} {' · '}
                  <span style={{ color: 'var(--clr-text-soft)' }}>
                    Duration: {cookie.duration}
                  </span> {' · Provider: '}
                  <span style={{ color: 'var(--clr-text-soft)' }}>
                    {cookie.provider}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <p>
            We do <strong>not</strong> use advertising cookies, social media tracking pixels, or any third-party analytics that build user profiles.
          </p>

          <h2>7. Security</h2>
          <p>
            As a cybersecurity services provider, we implement the controls we recommend to clients:
          </p>
          <ul>
            <li>All data in transit is encrypted via TLS 1.2+</li>
            <li>All data at rest is encrypted using AES-256</li>
            <li>Access to personal data is restricted to personnel who need it to perform their role</li>
            <li>Contact form submissions are protected by Cloudflare Turnstile to prevent automated abuse</li>
            <li>Our infrastructure is monitored continuously for security incidents</li>
            <li>We conduct regular security reviews of our sub-processors</li>
          </ul>
          <p>
            In the unlikely event of a data breach affecting your personal data, we will notify the CPDP within 72 hours and affected individuals without undue delay, as required by GDPR Article 33 and 34.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy to reflect changes in our practices or legal requirements. We will update the “Last updated” date at the top. For significant changes, we will display a notice on the website. Continued use of the website after changes constitutes acceptance of the updated policy.
          </p>

          <h2>9. Contact us</h2>
          <p>
            For any questions about this privacy policy or to exercise your rights:{' '}
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            {legalName} · {addressRegistered}
          </p>
        </div>
      </div>
    </>
  )
}
