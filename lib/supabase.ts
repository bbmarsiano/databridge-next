const SUPABASE_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL  || ''
const SUPABASE_ANON    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// ── Generic helpers ──────────────────────────────────────

// Server-side insert (service role)
export async function supabaseInsert(
  table: string,
  data: Record<string, unknown>
) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE) {
    console.warn('[Supabase] Not configured')
    return { error: null }
  }
  console.log('[Supabase] Insert called for table:', table)
  console.log('[Supabase] URL present:', !!SUPABASE_URL)
  console.log('[Supabase] Service key present:', !!SUPABASE_SERVICE)
  console.log('[Supabase] URL value:', SUPABASE_URL)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_SERVICE,
      'Authorization': `Bearer ${SUPABASE_SERVICE}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(data),
  })
  console.log('[Supabase] Response status:', res.status, res.statusText)
  if (!res.ok) {
    const text = await res.text()
    console.error('[Supabase] Insert failed:', text)
    return { error: text }
  }
  console.log('[Supabase] Insert successful')
  return { error: null }
}

// Server-side update (service role)
export async function supabaseUpdate(
  table: string,
  id: string,
  data: Record<string, unknown>
) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE) return { error: 'Not configured' }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_SERVICE,
      'Authorization': `Bearer ${SUPABASE_SERVICE}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) { const t = await res.text(); return { error: t } }
  return { error: null }
}

// Public read (anon key — respects RLS)
export async function supabaseSelect<T>(
  table: string,
  params: Record<string, string> = {}
): Promise<{ data: T[] | null; error: string | null }> {
  const key = SUPABASE_ANON || SUPABASE_SERVICE
  if (!SUPABASE_URL || !key) return { data: null, error: 'Not configured' }

  console.log('[Supabase Select]', table, params)
  console.log('[Supabase Select] anon key present:', !!SUPABASE_ANON)
  console.log('[Supabase Select] service key present:', !!SUPABASE_SERVICE)
  const query = new URLSearchParams(params).toString()
  const url   = `${SUPABASE_URL}/rest/v1/${table}${query ? '?' + query : ''}`
  const res   = await fetch(url, {
    headers: {
      'apikey':        key,
      'Authorization': `Bearer ${key}`,
    },
    next: { revalidate: 60 }, // cache for 60 seconds
  })
  console.log('[Supabase Select] response status:', res.status)
  if (!res.ok) { const t = await res.text(); return { data: null, error: t } }
  const data = await res.json()
  return { data, error: null }
}

// Service role read (bypasses RLS — for admin)
export async function supabaseSelectAdmin<T>(
  table: string,
  params: Record<string, string> = {}
): Promise<{ data: T[] | null; error: string | null }> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE) return { data: null, error: 'Not configured' }
  const query = new URLSearchParams(params).toString()
  const url   = `${SUPABASE_URL}/rest/v1/${table}${query ? '?' + query : ''}`
  const res   = await fetch(url, {
    headers: {
      'apikey':        SUPABASE_SERVICE,
      'Authorization': `Bearer ${SUPABASE_SERVICE}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) { const t = await res.text(); return { data: null, error: t } }
  const data = await res.json()
  return { data, error: null }
}

// Generate signed download URL for private storage
export async function supabaseGetSignedUrl(
  bucket: string,
  path: string,
  expiresIn = 300 // 5 minutes
): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE) return null
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/sign/${bucket}/${path}`,
    {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_SERVICE,
        'Authorization': `Bearer ${SUPABASE_SERVICE}`,
      },
      body: JSON.stringify({ expiresIn }),
    }
  )
  if (!res.ok) return null
  const { signedURL } = await res.json()
  return `${SUPABASE_URL}/storage/v1${signedURL}`
}
