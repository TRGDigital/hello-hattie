import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ARTICLES, articleBySlug } from '@/content/articles'
import { ArticleView } from '@/components/ArticleView'

export const dynamicParams = false
export function generateStaticParams() { return ARTICLES.filter((a) => a.kind === 'blog').map((a) => ({ slug: a.slug })) }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleBySlug('blog', params.slug)
  return a ? { title: a.metaTitle, description: a.metaDescription, alternates: { canonical: `/blog/${a.slug}` } } : {}
}
export default function BlogPost({ params }: { params: { slug: string } }) {
  const a = articleBySlug('blog', params.slug)
  if (!a) notFound()
  return <ArticleView a={a} crumb={{ href: '/blog', label: 'Blog' }} />
}
