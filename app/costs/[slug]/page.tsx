import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ARTICLES, articleBySlug } from '@/content/articles'
import { ArticleView } from '@/components/ArticleView'

export const dynamicParams = false
export function generateStaticParams() { return ARTICLES.filter((a) => a.kind === 'cost').map((a) => ({ slug: a.slug })) }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleBySlug('cost', params.slug)
  return a ? { title: a.metaTitle, description: a.metaDescription, alternates: { canonical: `/costs/${a.slug}` } } : {}
}
export default function CostPage({ params }: { params: { slug: string } }) {
  const a = articleBySlug('cost', params.slug)
  if (!a) notFound()
  return <ArticleView a={a} crumb={{ href: '/costs', label: 'Costs' }} />
}
