'use client'

import { useState } from 'react'

type Tab = 'blog' | 'documents'

const CATEGORIES = [
  'EDIFACT Basics',
  'ERP Integration',
  'Compliance',
  'Retail',
  'Manufacturing',
  'Logistics',
  'Vendor selection',
  'Cybersecurity',
  'Case Study',
]

const DOC_CATEGORIES = ['guide', 'whitepaper', 'template', 'checklist']

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<Tab>('blog')

  // Blog form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')

  // Document form state
  const [docTitle, setDocTitle] = useState('')
  const [docDesc, setDocDesc] = useState('')
  const [docCat, setDocCat] = useState('guide')
  const [docPath, setDocPath] = useState('')
  const [docFileName, setDocFileName] = useState('')
  const [docSizeKb, setDocSizeKb] = useState('')
  const [docEmailGate, setDocEmailGate] = useState(false)

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function checkPassword() {
    if (password.length > 4) {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password')
    }
  }

  async function saveBlogPost() {
    if (!title) {
      setMessage('Title is required')
      return
    }
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          title,
          slug: slug || undefined,
          excerpt,
          content,
          category,
          tags: tags ? tags.split(',').map((t) => t.trim()) : [],
          published,
          seo_title: seoTitle,
          seo_desc: seoDesc,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(`✓ Post saved! Slug: ${data.slug}`)
        setTitle('')
        setSlug('')
        setExcerpt('')
        setContent('')
        setTags('')
        setPublished(false)
      } else {
        setMessage(`✗ Error: ${data.error}`)
      }
    } catch {
      setMessage('✗ Network error')
    } finally {
      setSaving(false)
    }
  }

  async function saveDocument() {
    if (!docTitle || !docPath) {
      setMessage('Title and file path are required')
      return
    }
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          title: docTitle,
          description: docDesc,
          category: docCat,
          file_path: docPath,
          file_name: docFileName,
          file_size_kb: docSizeKb ? parseInt(docSizeKb) : null,
          requires_email: docEmailGate,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('✓ Document registered successfully')
        setDocTitle('')
        setDocDesc('')
        setDocPath('')
        setDocFileName('')
        setDocSizeKb('')
      } else {
        setMessage(`✗ Error: ${data.error}`)
      }
    } catch {
      setMessage('✗ Network error')
    } finally {
      setSaving(false)
    }
  }

  const input = 'w-full rounded-[8px] px-4 py-3 text-[15px] outline-none mb-3'
  const inputStyle = {
    background: '#162035',
    border: '1px solid rgba(148,163,184,.2)',
    color: '#f1f5f9',
    fontSize: '16px',
  }
  const label =
    'block text-[12px] font-medium text-[#8094aa] mb-1 mt-2'

  if (!authed) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#09111f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#0e1729',
            border: '1px solid rgba(148,163,184,.15)',
            borderRadius: '14px',
            padding: '48px',
            width: '360px',
          }}
        >
          <h1 style={{ fontFamily: 'serif', fontSize: '28px', color: '#f1f5f9', marginBottom: '8px' }}>
            Admin
          </h1>
          <p style={{ fontSize: '14px', color: '#8094aa', marginBottom: '24px' }}>dmgweb content management</p>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
            className={input}
            style={inputStyle}
          />
          {authError && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '8px' }}>{authError}</p>}
          <button
            onClick={checkPassword}
            style={{
              width: '100%',
              minHeight: '44px',
              background: '#06b6d4',
              color: '#07111f',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09111f', padding: '48px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '32px', color: '#f1f5f9' }}>dmgweb Admin</h1>
          <p style={{ color: '#8094aa', fontSize: '14px', marginTop: '4px' }}>Content management</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {(['blog', 'documents'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                background: tab === t ? '#06b6d4' : 'transparent',
                color: tab === t ? '#07111f' : '#8094aa',
                borderColor: tab === t ? '#06b6d4' : 'rgba(148,163,184,.2)',
                textTransform: 'capitalize',
              }}
            >
              {t === 'blog' ? '✏️ Blog Post' : '📎 Document'}
            </button>
          ))}
        </div>

        {/* Blog form */}
        {tab === 'blog' && (
          <div style={{ background: '#0e1729', borderRadius: '14px', padding: '40px', border: '1px solid rgba(148,163,184,.15)' }}>
            <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '24px' }}>New Blog Post</h2>

            <label className={label}>Title *</label>
            <input
              className={input}
              style={inputStyle}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!slug) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
                }
              }}
              placeholder="Post title"
            />

            <label className={label}>Slug (URL)</label>
            <input
              className={input}
              style={inputStyle}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug (auto-generated)"
            />

            <label className={label}>Category</label>
            <select className={input} style={{ ...inputStyle, WebkitAppearance: 'none' }} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '-6px',
                marginBottom: '12px',
              }}
            >
              {[
                { cat: 'EDIFACT Basics', color: '#06b6d4', bg: 'rgba(6,182,212,.15)' },
                { cat: 'ERP Integration', color: '#3b82f6', bg: 'rgba(59,130,246,.15)' },
                { cat: 'Compliance', color: '#f59e0b', bg: 'rgba(245,158,11,.15)' },
                { cat: 'Retail', color: '#22c55e', bg: 'rgba(34,197,94,.15)' },
                { cat: 'Manufacturing', color: '#a78bfa', bg: 'rgba(167,139,250,.15)' },
                { cat: 'Vendor selection', color: '#94a3b8', bg: 'rgba(100,116,139,.15)' },
                { cat: 'Cybersecurity', color: '#ef4444', bg: 'rgba(239,68,68,.15)' },
                { cat: 'Logistics', color: '#3b82f6', bg: 'rgba(59,130,246,.15)' },
                { cat: 'Case Study', color: '#06b6d4', bg: 'rgba(6,182,212,.15)' },
              ].map(({ cat, color, bg }) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  title={`Use category: ${cat}`}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: `1px solid ${color}`,
                    background: category === cat ? color : bg,
                    color: category === cat ? '#07111f' : color,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '11px', color: '#8094aa', marginTop: '-8px', marginBottom: '12px' }}>
              Click a category pill to select it. Each maps to a unique card colour on the blog page.
            </p>

            <label className={label}>Excerpt (shown in blog card)</label>
            <textarea
              className={input}
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', lineHeight: 1.65 }}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="One or two sentences describing the article..."
            />

            <label className={label}>Content (Markdown supported)</label>
            <textarea
              className={input}
              style={{ ...inputStyle, minHeight: '320px', resize: 'vertical', lineHeight: 1.65, fontFamily: 'monospace', fontSize: '14px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Heading&#10;&#10;Write your article in Markdown..."
            />

            <label className={label}>Tags (comma separated)</label>
            <input className={input} style={inputStyle} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="EDIFACT, SAP, Retail" />

            <label className={label}>SEO Title (optional — defaults to post title)</label>
            <input className={input} style={inputStyle} value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="SEO optimised title" />

            <label className={label}>SEO Description</label>
            <textarea
              className={input}
              style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
              value={seoDesc}
              onChange={(e) => setSeoDesc(e.target.value)}
              placeholder="150-160 character meta description..."
            />

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#cbd5e1',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '8px',
                marginBottom: '24px',
              }}
            >
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#06b6d4' }}
              />
              Publish immediately (uncheck to save as draft)
            </label>

            {message && (
              <p style={{ fontSize: '14px', color: message.startsWith('✓') ? '#4ade80' : '#f87171', marginBottom: '16px' }}>
                {message}
              </p>
            )}

            <button
              onClick={saveBlogPost}
              disabled={saving}
              style={{
                minHeight: '44px',
                padding: '0 32px',
                background: saving ? '#162035' : '#06b6d4',
                color: saving ? '#8094aa' : '#07111f',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '5px',
                border: 'none',
                cursor: saving ? 'default' : 'pointer',
              }}
            >
              {saving ? 'Saving…' : published ? 'Publish Post' : 'Save Draft'}
            </button>
          </div>
        )}

        {/* Document form */}
        {tab === 'documents' && (
          <div style={{ background: '#0e1729', borderRadius: '14px', padding: '40px', border: '1px solid rgba(148,163,184,.15)' }}>
            <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '8px' }}>Register Document</h2>
            <p style={{ color: '#8094aa', fontSize: '13px', marginBottom: '24px' }}>
              First upload your file to Supabase Storage (Storage → documents bucket), then copy the file path here to register it.
            </p>

            <label className={label}>Document Title *</label>
            <input className={input} style={inputStyle} value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="EDIFACT Starter Guide" />

            <label className={label}>Description</label>
            <textarea
              className={input}
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', lineHeight: 1.65 }}
              value={docDesc}
              onChange={(e) => setDocDesc(e.target.value)}
              placeholder="What this document contains and who it is for..."
            />

            <label className={label}>Category</label>
            <select className={input} style={{ ...inputStyle, WebkitAppearance: 'none' }} value={docCat} onChange={(e) => setDocCat(e.target.value)}>
              {DOC_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className={label}>File Path in Supabase Storage *</label>
            <input
              className={input}
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '13px' }}
              value={docPath}
              onChange={(e) => setDocPath(e.target.value)}
              placeholder="guides/edifact-starter-guide.pdf"
            />

            <label className={label}>File Name (shown to user)</label>
            <input className={input} style={inputStyle} value={docFileName} onChange={(e) => setDocFileName(e.target.value)} placeholder="edifact-starter-guide.pdf" />

            <label className={label}>File Size (KB)</label>
            <input className={input} style={inputStyle} type="number" value={docSizeKb} onChange={(e) => setDocSizeKb(e.target.value)} placeholder="1240" />

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#cbd5e1',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '8px',
                marginBottom: '24px',
              }}
            >
              <input
                type="checkbox"
                checked={docEmailGate}
                onChange={(e) => setDocEmailGate(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#06b6d4' }}
              />
              Require email address to download
            </label>

            {message && (
              <p style={{ fontSize: '14px', color: message.startsWith('✓') ? '#4ade80' : '#f87171', marginBottom: '16px' }}>
                {message}
              </p>
            )}

            <button
              onClick={saveDocument}
              disabled={saving}
              style={{
                minHeight: '44px',
                padding: '0 32px',
                background: saving ? '#162035' : '#06b6d4',
                color: saving ? '#8094aa' : '#07111f',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '5px',
                border: 'none',
                cursor: saving ? 'default' : 'pointer',
              }}
            >
              {saving ? 'Saving…' : 'Register Document'}
            </button>
          </div>
        )}

        {/* Instructions */}
        {/* Blog reference */}
        <div
          style={{
            marginTop: '24px',
            padding: '24px',
            background: '#0e1729',
            borderRadius: '12px',
            border: '1px solid rgba(148,163,184,.1)',
          }}
        >
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '16px' }}>Blog post quick reference</h3>

          {/* Category colour table */}
          <p style={{ color: '#8094aa', fontSize: '12px', marginBottom: '10px', fontWeight: 600 }}>CATEGORY → CARD COLOUR</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {[
              { cat: 'EDIFACT Basics', color: '#06b6d4', bg: 'rgba(6,182,212,.15)', label: 'Cyan' },
              { cat: 'ERP Integration', color: '#3b82f6', bg: 'rgba(59,130,246,.15)', label: 'Blue' },
              { cat: 'Compliance', color: '#f59e0b', bg: 'rgba(245,158,11,.15)', label: 'Amber' },
              { cat: 'Retail', color: '#22c55e', bg: 'rgba(34,197,94,.15)', label: 'Green' },
              { cat: 'Manufacturing', color: '#a78bfa', bg: 'rgba(167,139,250,.15)', label: 'Purple' },
              { cat: 'Vendor selection', color: '#94a3b8', bg: 'rgba(100,116,139,.15)', label: 'Grey' },
              { cat: 'Cybersecurity', color: '#ef4444', bg: 'rgba(239,68,68,.15)', label: 'Red' },
              { cat: 'Logistics', color: '#3b82f6', bg: 'rgba(59,130,246,.15)', label: 'Blue' },
              { cat: 'Case Study', color: '#06b6d4', bg: 'rgba(6,182,212,.15)', label: 'Cyan' },
            ].map(({ cat, color, bg, label }) => (
              <div
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  border: `1px solid ${color}`,
                  background: bg,
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color }}>{cat}</span>
                <span style={{ fontSize: '10px', color: '#8094aa' }}>→ {label}</span>
              </div>
            ))}
          </div>

          {/* Tags tips */}
          <p style={{ color: '#8094aa', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>TAGS — HOW TO USE THEM</p>
          <ul style={{ color: '#8094aa', fontSize: '13px', lineHeight: '2', paddingLeft: '20px' }}>
            <li>
              Enter tags separated by commas:{' '}
              <code style={{ color: '#06b6d4', background: '#162035', padding: '1px 6px', borderRadius: '3px' }}>
                EDIFACT, SAP, Retail, Bulgaria
              </code>
            </li>
            <li>Use specific terms readers might search for — message types, ERP names, industries</li>
            <li>3–6 tags per post is ideal</li>
            <li>Tags are shown at the bottom of the full article page</li>
            <li>
              Consistent casing helps:{' '}
              <code style={{ color: '#06b6d4', background: '#162035', padding: '1px 6px', borderRadius: '3px' }}>EDIFACT</code>{' '}
              not{' '}
              <code style={{ color: '#06b6d4', background: '#162035', padding: '1px 6px', borderRadius: '3px' }}>edifact</code>
            </li>
          </ul>

          {/* Slug tips */}
          <p
            style={{
              color: '#8094aa',
              fontSize: '12px',
              marginBottom: '8px',
              marginTop: '16px',
              fontWeight: 600,
            }}
          >
            SLUG — URL OF THE POST
          </p>
          <ul style={{ color: '#8094aa', fontSize: '13px', lineHeight: '2', paddingLeft: '20px' }}>
            <li>Auto-generated from the title — you can edit it manually</li>
            <li>
              Use lowercase with hyphens only:{' '}
              <code style={{ color: '#06b6d4', background: '#162035', padding: '1px 6px', borderRadius: '3px' }}>what-is-edifact</code>
            </li>
            <li>Keep it short and descriptive — it becomes the page URL</li>
            <li>Once published and indexed by Google, avoid changing the slug</li>
          </ul>

          {/* Publish tips */}
          <p style={{ color: '#8094aa', fontSize: '12px', marginBottom: '8px', marginTop: '16px', fontWeight: 600 }}>DRAFT vs PUBLISHED</p>
          <ul style={{ color: '#8094aa', fontSize: '13px', lineHeight: '2', paddingLeft: '20px' }}>
            <li>
              <strong style={{ color: '#cbd5e1' }}>Draft (unchecked)</strong> — saved to Supabase but NOT visible on the website
            </li>
            <li>
              <strong style={{ color: '#cbd5e1' }}>Published (checked)</strong> — immediately visible in the blog grid and accessible via its URL
            </li>
            <li>You can publish later by editing the post in Supabase → blog_posts table → set published = true</li>
          </ul>
        </div>

        <div style={{ marginTop: '40px', padding: '24px', background: '#0e1729', borderRadius: '12px', border: '1px solid rgba(148,163,184,.1)' }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '12px' }}>How to upload documents</h3>
          <ol style={{ color: '#8094aa', fontSize: '13px', lineHeight: '2', paddingLeft: '20px' }}>
            <li>
              Go to <strong style={{ color: '#cbd5e1' }}>supabase.com → Storage → documents</strong> bucket
            </li>
            <li>
              Click <strong style={{ color: '#cbd5e1' }}>Upload file</strong> and choose your PDF
            </li>
            <li>
              Copy the file path (e.g.{' '}
              <code style={{ color: '#06b6d4', background: '#162035', padding: '1px 6px', borderRadius: '3px' }}>
                guides/my-guide.pdf
              </code>
              )
            </li>
            <li>Come back here → Documents tab → paste the path and fill in the details</li>
            <li>
              Click <strong style={{ color: '#cbd5e1' }}>Register Document</strong>
            </li>
            <li>It appears immediately on the Resources page</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

