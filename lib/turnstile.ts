export async function verifyTurnstile(token: string | null): Promise<{
  success: boolean
  error?: string
}> {
  if (!token) {
    return { success: false, error: 'Please complete the security check.' }
  }

  // Dev bypass token — used on localhost and preview
  // deployments where Turnstile is not configured
  if (token === 'dev-bypass-token') {
    return { success: true }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('[Turnstile] Secret key not configured — bypassing')
    return { success: true }
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    })

    const data = await res.json()
    console.log('[Turnstile] Result:', data.success, data['error-codes'])
    if (!data.success) {
      return {
        success: false,
        error: 'Security check failed. Please refresh and try again.',
      }
    }
    return { success: true }
  } catch (err) {
    console.error('[Turnstile] Error:', err)
    return {
      success: false,
      error: 'Security verification unavailable. Please try again.',
    }
  }
}

