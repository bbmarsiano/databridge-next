import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'
import { supabaseSelect } from '@/lib/supabase'
import type { BlogPost } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url
  const now  = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                    lastModified: now, changeFrequency: 'weekly',   priority: 1.0 },
    { url: `${base}/services`,      lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${base}/solutions`,     lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${base}/case-studies`,  lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${base}/process`,       lastModified: now, changeFrequency: 'yearly',   priority: 0.7 },
    { url: `${base}/resources`,     lastModified: now, changeFrequency: 'weekly',   priority: 0.8 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: 'yearly',   priority: 0.9 },
    { url: `${base}/about`,         lastModified: now, changeFrequency: 'yearly',   priority: 0.7 },
  ]

  // Fetch published blog posts
  const { data: posts } = await supabaseSelect<BlogPost>(
    'blog_posts',
    { select: '*', published: 'eq.true', order: 'published_at.desc' }
  )

  const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url:             `${base}/resources/blog/${post.slug}`,
    lastModified:    post.updated_at ? new Date(post.updated_at) : now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticPages, ...blogPages]
}
