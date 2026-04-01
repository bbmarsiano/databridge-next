import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Terms of Service — dmgweb',
  description: 'Terms governing the use of the DMG Web LTD website and services.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'March 2025'

export default function TermsPage() {
  const {
    legalName,
    vat,
    address,
    addressRegistered,
    email,
    foundedYear,
  } = siteConfig.contact

  return (
    <>
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service' },
          ]}
        />
      </div>
      <div className="container py-24 max-w-[780px]">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-2 mb-4">Terms of Service</h1>
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
          <h2>1. About us and these terms</h2>
          <p>
            <strong>{legalName}</strong> (&ldquo;dmgweb&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;) is registered in Bulgaria (VAT{' '}
            {vat}), founded in {foundedYear}, with registered address at {addressRegistered}.
          </p>
          <p>
            By accessing or using the website at{' '}
            <a href={siteConfig.url}>{siteConfig.url}</a> you agree to these Terms of Service.
            If you do not agree, please do not use this website.
          </p>

          <h2>2. Our services</h2>
          <p>
            {legalName} provides the following professional IT services to enterprises:
          </p>
          <ul>
            <li>EDIFACT integration and EDI consulting</li>
            <li>Custom software development</li>
            <li>Cybersecurity assessment and services</li>
            <li>ERP implementation (SAP, Dynamics, Oracle)</li>
            <li>IT consulting and technology strategy</li>
          </ul>
          <p>
            This website is an informational and lead generation platform. The specific terms governing any engagement are set out in a separate written contract signed by both parties. Nothing on this website constitutes a binding offer or guarantee of service.
          </p>

          <h2>3. Use of this website</h2>
          <p>
            You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:
          </p>
          <ul>
            <li>Attempt to gain unauthorised access to any part of the website or its underlying systems</li>
            <li>Use automated tools to scrape, crawl, or stress-test the website without prior written consent</li>
            <li>Submit false or misleading information through the contact form</li>
            <li>Use the website to transmit malware, spam, or any malicious content</li>
            <li>Attempt to circumvent any security measures, including the Cloudflare Turnstile bot protection</li>
          </ul>
          <p>
            Given that we provide cybersecurity services, any attempt to probe, attack, or exploit vulnerabilities in our systems will be treated as a hostile act and may be reported to law enforcement.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            All content on this website — including text, design, code, graphics, and trademarks — is the property of {legalName} and is protected by Bulgarian and EU intellectual property law.
          </p>
          <p>
            For client projects: intellectual property ownership is defined in the individual engagement contract. Our default position is that clients own all custom work delivered to them upon final payment. Our pre-existing tools, frameworks, and methodologies remain our property.
          </p>

          <h2>5. Limitation of liability</h2>
          <p>
            This website is provided &ldquo;as is&rdquo; without warranty of any kind. We do not guarantee that the website will be available at all times or free from errors.
          </p>
          <p>
            {legalName}&apos;s liability for any claim arising solely from the use of this website (not from a signed engagement contract) is limited to €100. This limitation does not apply to liability for death, personal injury, fraud, or any liability that cannot be excluded by law.
          </p>
          <p>
            For project engagements, liability is governed by the individual contract terms agreed in writing.
          </p>

          <h2>6. Privacy and cookies</h2>
          <p>
            Your use of this website is also governed by our{' '}
            <a href="/privacy">Privacy Policy</a>, which explains how we collect and use your personal data and how we use cookies. By using this website you acknowledge that you have read and understood our Privacy Policy.
          </p>

          <h2>7. Third-party links</h2>
          <p>
            This website may contain links to third-party websites. We are not responsible for the content or privacy practices of those websites. Links do not constitute endorsement.
          </p>

          <h2>8. Changes to these terms</h2>
          <p>
            We may update these terms at any time. The current version is always available at{' '}
            <a href={`${siteConfig.url}/terms`}>
              {siteConfig.url}/terms
            </a>. Continued use of the website after changes are posted constitutes acceptance of the revised terms.
          </p>

          <h2>9. Governing law and jurisdiction</h2>
          <p>
            These terms are governed by the laws of the Republic of Bulgaria. Any disputes arising from these terms or your use of this website shall be subject to the exclusive jurisdiction of the competent courts in Sofia, Bulgaria, unless mandatory consumer protection law in your country of residence requires otherwise.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these terms:{' '}
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            {legalName} · {addressRegistered}
          </p>
        </div>
      </div>
    </>
  )
}
