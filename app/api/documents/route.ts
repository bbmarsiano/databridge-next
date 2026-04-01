import { NextRequest, NextResponse } from 'next/server'
import { supabaseInsert } from '@/lib/supabase'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const {
      title,
      description,
      category,
      file_path,
      file_name,
      file_size_kb,
      requires_email,
      tags,
    } = body

    if (!title || !file_path) {
      return NextResponse.json(
        { error: 'Title and file_path are required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseInsert('documents', {
      title,
      description,
      category,
      file_path,
      file_name,
      file_size_kb,
      requires_email: requires_email || false,
      tags: tags || [],
      published: true,
      download_count: 0,
    })

    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

