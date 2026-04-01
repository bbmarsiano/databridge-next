import { NextRequest, NextResponse } from 'next/server'
import { supabaseInsert, supabaseUpdate } from '@/lib/supabase'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('x-admin-password')
  return auth === ADMIN_PASSWORD
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function calcReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      author,
      published,
      cover_image,
      seo_title,
      seo_desc,
    } = body

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slug = body.slug || slugify(title)
    const reading_time = content ? calcReadingTime(content) : null
    const published_at = published ? new Date().toISOString() : null

    const { error } = await supabaseInsert('blog_posts', {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags || [],
      author: author || 'dmgweb',
      published: published || false,
      published_at,
      cover_image,
      reading_time,
      seo_title,
      seo_desc,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
    return NextResponse.json({ success: true, slug })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    if (updates.content) {
      updates.reading_time = calcReadingTime(updates.content)
    }
    if (updates.published && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }

    const { error } = await supabaseUpdate('blog_posts', id, updates)
    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

