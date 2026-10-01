import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getArticles, withSeo } from '@/lib/cms'
import { ArticleView } from '@/components/ArticleView'

// New articles published in the admin get a page on first visit; existing ones refresh when saved.
export const dynamicParams = true
export const revalidate = 3600
export async function generateStaticParams() { return (await getArticles()).filter((a) => a.kind === 'guide').map((a) => ({ slug: a.slug })) }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getArticle('guide', params.slug)
  return a ? withSeo(`/guides/${a.slug}`, { title: a.metaTitle, description: a.metaDescription, alternates: { canonical: `/guides/${a.slug}` } }) : {}
}
export default async function Page({ params }: { params: { slug: string } }) {
  const a = await getArticle('guide', params.slug)
  if (!a) notFound()
  return <ArticleView a={a} all={await getArticles()} crumb={{ href: '/guides', label: 'Guides' }} />
}
