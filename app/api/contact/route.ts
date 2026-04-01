import { NextRequest, NextResponse } from 'next/server'
import { supabaseInsert } from '@/lib/supabase'
import { verifyTurnstile } from '@/lib/turnstile'

// Rate limiting — simple in-memory store (resets on cold start)
// For production, use Upstash Redis or Vercel KV
const ipCounts = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5 // max submissions per IP per window
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)
  if (!entry || now > entry.reset) {
    ipCounts.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    console.log('[Contact] ===== NEW REQUEST =====')
    console.log('[Contact] ENV vars:', {
      RESEND_API_KEY: process.env.RESEND_API_KEY
        ? `${process.env.RESEND_API_KEY.slice(0,10)}...`
        : 'MISSING',
      CONTACT_RECIPIENT_EMAIL: process.env.CONTACT_RECIPIENT_EMAIL ?? 'MISSING',
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL ?? 'MISSING',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
        ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0,12)}...`
        : 'MISSING',
    })

    // ── 1. Rate limiting ──────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // ── 2. Parse and validate ─────────────────────────────
    const body = await req.json()
    console.log('[Contact] Body received:', {
      name: body.name ?? 'MISSING',
      email: body.email ?? 'MISSING',
      company: body.company ?? '(empty)',
      service: body.service ?? '(empty)',
    })
    const { name, email, company, phone, service, timeline, message, turnstileToken } = body

    console.log('[Contact API] Verifying Turnstile...')
    const turnstileResult = await verifyTurnstile(turnstileToken ?? null)
    if (!turnstileResult.success) {
      console.warn('[Contact API] Turnstile failed:', turnstileResult.error)
      return NextResponse.json(
        { error: turnstileResult.error },
        { status: 400 }
      )
    }
    console.log('[Contact API] Turnstile verified ✓')

    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (!email?.trim()) return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

    // ── 3. Save lead to Supabase ──────────────────────────
    // This works if you've set up Supabase and run the SQL in lib/supabase.ts
    console.log('[Contact] Validation passed, inserting to Supabase...')
    const { error: dbError } = await supabaseInsert('leads', {
      name:     name.trim(),
      email:    email.trim().toLowerCase(),
      company:  company?.trim() || null,
      phone:    phone?.trim() || null,
      service:  service || null,
      timeline: timeline || null,
      message:  message?.trim() || null,
      source:   'website',
      status:   'new',
    })
    console.log('[Contact] Supabase result:', { error: dbError ?? 'none' })

    if (dbError) {
      // Log but don't fail — we still want to send the email
      console.error('[Contact API] Supabase error:', dbError)
    }

    // ── 4. Send email via Resend ──────────────────────────
    // Install Resend: npm install resend
    // Then uncomment this block and add RESEND_API_KEY to .env.local
    console.log('[Contact] Starting email send...')
    console.log('[Contact] Resend key present:', !!process.env.RESEND_API_KEY)
    console.log('[Contact] Sending to:', process.env.CONTACT_RECIPIENT_EMAIL)
    console.log('[Contact] Sending from:', process.env.CONTACT_FROM_EMAIL)
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      // Notification to dmgweb team
      const notifResult = await resend.emails.send({
        from:    process.env.CONTACT_FROM_EMAIL || 'noreply@dmg-web.net',
        to:      process.env.CONTACT_RECIPIENT_EMAIL || 'contact@dmg-web.net',
        subject: `New enquiry: ${name}${company ? ` — ${company}` : ''}`,
        html: `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New contact form submission</title>
  </head>
  <body style="margin:0;padding:0;background:#09111f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#09111f;padding:40px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background:#0e1729;border-radius:12px;
          border:1px solid #1e3a5f;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0e1729;padding:0;border-bottom:3px solid #06b6d4;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 32px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img
                            src="https://dmg-web.net/logos/icon-512.png"
                            alt="dmgweb"
                            width="40"
                            height="40"
                            style="display:block;border-radius:10px;
                            width:40px;height:40px;"
                          />
                        </td>
                        <td style="padding-left:10px;">
                          <span style="font-size:18px;font-weight:700;color:#f0f6ff;">dmg</span>
                          <span style="font-size:18px;font-weight:700;color:#06b6d4;">web</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding:24px 32px;text-align:right;
                    vertical-align:middle;">
                    <span style="font-size:11px;font-weight:600;
                      letter-spacing:0.15em;text-transform:uppercase;
                      color:#06b6d4;background:rgba(6,182,212,0.1);
                      border:1px solid rgba(6,182,212,0.3);
                      padding:4px 12px;border-radius:20px;">
                      New Enquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;
                color:#f1f5f9;line-height:1.3;">
                New contact form submission
              </h1>
              <p style="margin:0 0 28px;font-size:14px;color:#8094aa;">
                Received via dmg-web.net contact form
              </p>

              <!-- Contact details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#162035;border-radius:8px;
                border:1px solid #1e3a5f;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">

                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          width:30%;font-size:11px;font-weight:600;
                          text-transform:uppercase;letter-spacing:0.1em;
                          color:#8094aa;vertical-align:top;padding-right:16px;">
                          Name
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:14px;color:#f1f5f9;font-weight:600;">
                          ${name}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:11px;font-weight:600;text-transform:uppercase;
                          letter-spacing:0.1em;color:#8094aa;vertical-align:top;
                          padding-right:16px;">
                          Email
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:14px;">
                          <a href="mailto:${email}"
                            style="color:#06b6d4;text-decoration:none;">
                            ${email}
                          </a>
                        </td>
                      </tr>

                      ${company ? `
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:11px;font-weight:600;text-transform:uppercase;
                          letter-spacing:0.1em;color:#8094aa;vertical-align:top;
                          padding-right:16px;">
                          Company
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:14px;color:#f1f5f9;">
                          ${company}
                        </td>
                      </tr>` : ''}

                      ${service ? `
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:11px;font-weight:600;text-transform:uppercase;
                          letter-spacing:0.1em;color:#8094aa;vertical-align:top;
                          padding-right:16px;">
                          Service
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #1e3a5f;
                          font-size:14px;color:#f1f5f9;text-transform:capitalize;">
                          ${service}
                        </td>
                      </tr>` : ''}

                      ${message ? `
                      <tr>
                        <td style="padding:8px 0;font-size:11px;font-weight:600;
                          text-transform:uppercase;letter-spacing:0.1em;
                          color:#8094aa;vertical-align:top;padding-right:16px;">
                          Message
                        </td>
                        <td style="padding:8px 0;font-size:14px;color:#cbd5e1;
                          line-height:1.6;">
                          ${message.replace(/\n/g, '<br>')}
                        </td>
                      </tr>` : ''}

                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px;">
                    <a href="mailto:${email}"
                      style="display:inline-block;background:#06b6d4;color:#07111f;
                      font-size:14px;font-weight:700;padding:12px 28px;
                      border-radius:5px;text-decoration:none;letter-spacing:0.02em;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#09111f;padding:20px 32px;
              border-top:1px solid #1e3a5f;">
              <p style="margin:0;font-size:11px;color:#8094aa;text-align:center;">
                DMG Web LTD · Sofia, Bulgaria ·
                <a href="https://dmg-web.net"
                  style="color:#06b6d4;text-decoration:none;">
                  dmg-web.net
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`,
      })
      console.log('[Contact] Notification email result:', JSON.stringify(notifResult))

      // Auto-reply to the person who submitted
      const replyResult = await resend.emails.send({
        from:    process.env.CONTACT_FROM_EMAIL || 'noreply@dmg-web.net',
        to:      email,
        subject: 'We received your message — dmgweb',
        html: `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>We received your message</title>
  </head>
  <body style="margin:0;padding:0;background:#09111f;
    font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background:#09111f;padding:40px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background:#0e1729;
          border-radius:12px;border:1px solid #1e3a5f;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0e1729;padding:0;border-bottom:3px solid #06b6d4;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 32px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img
                            src="https://dmg-web.net/logos/icon-512.png"
                            alt="dmgweb"
                            width="40"
                            height="40"
                            style="display:block;border-radius:10px;
                            width:40px;height:40px;"
                          />
                        </td>
                        <td style="padding-left:10px;">
                          <span style="font-size:18px;font-weight:700;
                            color:#f0f6ff;">dmg</span>
                          <span style="font-size:18px;font-weight:700;
                            color:#06b6d4;">web</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding:24px 32px;text-align:right;
                    vertical-align:middle;">
                    <span style="font-size:11px;color:#8094aa;">
                      Optimized solutions. Targeted results.
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px 32px;">

              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;
                color:#f1f5f9;line-height:1.3;">
                Message received, ${name.split(' ')[0]}.
              </h1>

              <p style="margin:0 0 16px;font-size:15px;color:#cbd5e1;
                line-height:1.75;">
                Thank you for reaching out. Nikolay or Maria will
                reply to you personally within one business day.
              </p>

              <p style="margin:0 0 28px;font-size:15px;color:#cbd5e1;
                line-height:1.75;">
                In the meantime, feel free to explore our
                <a href="https://dmg-web.net/resources"
                  style="color:#06b6d4;text-decoration:none;">
                  free EDIFACT resources
                </a>
                or read our
                <a href="https://dmg-web.net/case-studies"
                  style="color:#06b6d4;text-decoration:none;">
                  case studies
                </a>.
              </p>

              <!-- What you sent summary -->
              ${message ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#162035;border-radius:8px;
                border:1px solid #1e3a5f;margin-bottom:28px;
                border-left:3px solid #06b6d4;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:600;
                      text-transform:uppercase;letter-spacing:0.12em;
                      color:#06b6d4;">
                      Your message
                    </p>
                    <p style="margin:0;font-size:14px;color:#8094aa;
                      line-height:1.65;font-style:italic;">
                      "${message.length > 200
                        ? message.substring(0, 200) + '…'
                        : message}"
                    </p>
                  </td>
                </tr>
              </table>` : ''}

              <!-- Urgent contact -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#162035;border-radius:8px;
                border:1px solid #1e3a5f;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:600;
                      color:#f1f5f9;">
                      Need a faster response?
                    </p>
                    <p style="margin:0;font-size:13px;color:#8094aa;">
                      Email us directly at
                      <a href="mailto:contact@dmg-web.net"
                        style="color:#06b6d4;text-decoration:none;">
                        contact@dmg-web.net
                      </a>
                    </p>
                    <p style="margin:4px 0 0;font-size:11px;color:#8094aa;">
                      Mon–Fri · 09:00–18:00 EET · Sofia, Bulgaria
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <a href="https://dmg-web.net"
                      style="display:inline-block;background:#06b6d4;
                      color:#07111f;font-size:14px;font-weight:700;
                      padding:12px 28px;border-radius:5px;
                      text-decoration:none;letter-spacing:0.02em;">
                      Visit dmg-web.net →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#09111f;padding:20px 32px;
              border-top:1px solid #1e3a5f;">
              <p style="margin:0 0 6px;font-size:11px;color:#8094aa;
                text-align:center;">
                DMG Web LTD · ul. Dobar unak 2,
                Sofia 1421, Bulgaria
              </p>
              <p style="margin:0;font-size:11px;color:#4a6580;
                text-align:center;">
                You received this email because you submitted the
                contact form at
                <a href="https://dmg-web.net"
                  style="color:#4a6580;">
                  dmg-web.net
                </a>.
                We will never send unsolicited emails.
              </p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`,
      })
      console.log('[Contact] Auto-reply email result:', JSON.stringify(replyResult))
    }

    console.log('[Contact] ===== REQUEST COMPLETE =====')
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('[Contact API] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Only POST allowed
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
