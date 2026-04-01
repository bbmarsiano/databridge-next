import { NextRequest, NextResponse } from 'next/server'
import {
  supabaseSelect,
  supabaseInsert,
  supabaseGetSignedUrl,
} from '@/lib/supabase'
import type { Document } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { id, email } = await req.json()
    if (!id) return NextResponse.json({ error: 'Document ID required' }, { status: 400 })

    // Fetch document record
    const { data, error } = await supabaseSelect<Document>(
      'documents',
      { id: `eq.${id}`, published: 'eq.true' }
    )
    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const doc = data[0]

    // Email gate check
    if (doc.requires_email && !email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Generate signed URL (5 minute expiry)
    const signedUrl = await supabaseGetSignedUrl('documents', doc.file_path)
    if (!signedUrl) {
      return NextResponse.json({ error: 'Could not generate download URL' }, { status: 500 })
    }

    // Track download
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    await supabaseInsert('document_downloads', {
      document_id: id,
      email: email || null,
      ip,
    })

    // Increment download count via RPC — simple update
    // (best effort, don't fail the request if this fails)
    try {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/documents?id=eq.${id}`
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          download_count: (doc.download_count || 0) + 1,
        }),
      })
    } catch {
      /* non-fatal */
    }

    return NextResponse.json({ url: signedUrl })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

