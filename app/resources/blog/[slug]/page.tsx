import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabaseSelect } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui'
import type { BlogPost } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabaseSelect<BlogPost>('blog_posts', {
    slug: `eq.${slug}`,
    published: 'eq.true',
  })
  const post = data?.[0]
  if (!post) return { title: 'Post not found' }
  return {
    title: post.seo_title || post.title,
    description: post.seo_desc || post.excerpt || '',
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { data } = await supabaseSelect<BlogPost>('blog_posts', {
    slug: `eq.${slug}`,
    published: 'eq.true',
  })
  const post = data?.[0]
  if (!post) notFound()

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : ''

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context':       'https://schema.org',
            '@type':          'Article',
            headline:         post.title,
            description:      post.excerpt ?? '',
            datePublished:    post.published_at ?? '',
            dateModified:     post.updated_at ?? post.published_at ?? '',
            author: {
              '@type': 'Organization',
              name:    'DMG Web LTD',
              url:     'https://dmg-web.net',
            },
            publisher: {
              '@type': 'Organization',
              name:    'DMG Web LTD',
              logo: {
                '@type': 'ImageObject',
                url:     'https://dmg-web.net/logos/icon-512.png',
              },
            },
            mainEntityOfPage: {
              '@type': '@id',
              '@id':   `https://dmg-web.net/resources/blog/${post.slug}`,
            },
          }),
        }}
      />
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: 'Blog', href: '/resources#blog' },
            { label: post.title },
          ]}
        />
      </div>

      {/* Hero */}
      <div
        className="py-12"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 80% 40%, rgba(6,182,212,.07) 0%, transparent 65%)',
        }}
      >
        <div className="container max-w-[760px]">
          {post.category && (
            <span
              className="inline-block text-[11px] font-medium tracking-[.07em] px-[11px] py-[4px] rounded-[30px] mb-4"
              style={{
                background: 'var(--clr-accent-dim)',
                border: '1px solid rgba(6,182,212,.28)',
                color: 'var(--clr-accent)',
              }}
            >
              {post.category}
            </span>
          )}
          <h1
            className="mt-2 mb-5"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.15 }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-[18px] font-light text-[var(--clr-text-soft)] leading-[1.75] mb-8">
              {post.excerpt}
            </p>
          )}
          <div
            className="flex items-center gap-4 text-[13px] text-[var(--clr-text-muted)]"
            style={{
              borderTop: '1px solid var(--clr-border)',
              paddingTop: '14px',
              marginTop: '20px',
            }}
          >
            <span>By {post.author}</span>
            {date && <span>{date}</span>}
            {post.reading_time && <span>{post.reading_time} min read</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="pb-24 pt-10">
        <div className="container max-w-[760px]">
          {post.content ? (
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-[var(--font-heading)]
                prose-p:text-[var(--clr-text-soft)]
                prose-p:leading-[1.85]
                prose-a:text-[var(--clr-accent)]
                prose-strong:text-[var(--clr-text)]
                prose-code:text-[var(--clr-accent)]
                prose-code:bg-[var(--clr-surface-2)]
                prose-code:px-1.5
                prose-code:py-0.5
                prose-code:rounded
                prose-blockquote:border-l-[var(--clr-accent)]
                prose-blockquote:text-[var(--clr-text-muted)]"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          ) : (
            <p className="text-[var(--clr-text-muted)]">Content coming soon.</p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-16 pt-8" style={{ borderTop: '1px solid var(--clr-border)' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium tracking-[.07em] px-[11px] py-[4px] rounded-[30px]"
                  style={{
                    background: 'var(--clr-surface-2)',
                    border: '1px solid var(--clr-border)',
                    color: 'var(--clr-text-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link
              href="/resources#blog"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--clr-text-soft)] hover:text-[var(--clr-accent)] transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--clr-border)' }}>
        <div className="container max-w-[760px]">
          <div
            className="rounded-[14px] p-10 text-center"
            style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border-soft)' }}
          >
            <p className="text-[10px] tracking-[.18em] uppercase text-[var(--clr-accent)] mb-2">Ready to talk?</p>
            <h2 className="text-[clamp(20px,2.5vw,28px)] mb-3">Have questions about your EDI setup?</h2>
            <p className="text-[15px] text-[var(--clr-text-soft)] mb-6">
              Book a free 30-minute call — no pitch, just answers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-[15px] px-[30px] py-[14px] rounded-[5px] transition-all hover:-translate-y-px hover:bg-[#22d3ee]"
              style={{ background: 'var(--clr-accent)', color: '#07111f', minHeight: '44px' }}
            >
              Book a free call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// Simple markdown to HTML converter (no external lib needed)
function markdownToHtml(md: string): string {
  let html = md
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/^# (.+)$/gm,   '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,         '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered list items
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Wrap consecutive <li> items in <ul>
  html = html.replace(/((<li>[\s\S]*?<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Paragraphs — wrap lines that are not already wrapped in a tag
  html = html
    .split('\n\n')
    .map((block) => {
      block = block.trim()
      if (!block) return ''
      if (/^<(h[1-6]|ul|ol|li|blockquote|hr|pre|div)/.test(block)) return block
      return `<p>${block.replace(/\n/g, ' ')}</p>`
    })
    .filter(Boolean)
    .join('\n')

  return html
}

