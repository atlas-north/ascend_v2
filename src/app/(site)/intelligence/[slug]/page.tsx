import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import CtaSection  from '@/components/sections/CtaSection'
import ArticleCard from '@/components/sections/ArticleCard'
import RichText    from '@/components/ui/RichText'
import AnimateIn   from '@/components/ui/AnimateIn'

/* ─── Types ───────────────────────────────────────────────────────────────── */

type ArticleDoc = {
  id:          string
  title:       string
  slug:        string
  category:    string
  teaser:      string
  publishedAt?: string
  heroImage?:  { url: string; alt: string }
  body?:       any
  seo?: {
    metaTitle?:       string
    metaDescription?: string
    ogImage?:         { url: string }
  }
}

/* ─── Payload helpers ─────────────────────────────────────────────────────── */

async function getArticleBySlug(slug: string): Promise<ArticleDoc | null> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'articles',
      where:      { slug: { equals: slug }, status: { equals: 'published' } },
      limit:      1,
      depth:      2,
    })
    if (!result.docs.length) return null
    const doc = result.docs[0] as any
    return {
      id:          String(doc.id),
      title:       doc.title,
      slug:        doc.slug,
      category:    doc.category,
      teaser:      doc.teaser,
      publishedAt: doc.publishedAt,
      heroImage:   doc.heroImage?.url
                     ? { url: doc.heroImage.url, alt: doc.heroImage.alt ?? '' }
                     : undefined,
      body:        doc.body,
      seo:         doc.seo,
    }
  } catch {
    return null
  }
}

async function getOtherArticles(excludeSlug: string): Promise<ArticleDoc[]> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'articles',
      where:      { status: { equals: 'published' } },
      sort:       '-publishedAt',
      limit:      4,
      depth:      0,
    })
    return result.docs
      .filter((d: any) => d.slug !== excludeSlug)
      .slice(0, 3)
      .map((doc: any) => ({
        id:          String(doc.id),
        title:       doc.title,
        slug:        doc.slug,
        category:    doc.category,
        teaser:      doc.teaser,
        publishedAt: doc.publishedAt,
      }))
  } catch {
    return []
  }
}

/* ─── Static params ───────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'articles',
      where:      { status: { equals: 'published' } },
      limit:      200,
      depth:      0,
    })
    return result.docs.map((doc: any) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

/* ─── Metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const doc = await getArticleBySlug(params.slug)
  if (!doc) return { title: 'Article not found' }

  const title       = doc.seo?.metaTitle       ?? doc.title
  const description = doc.seo?.metaDescription ?? doc.teaser
  const ogImage     = doc.seo?.ogImage?.url ?? doc.heroImage?.url ?? '/images/hero-intelligence.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type:   'article',
      images: [ogImage],
      ...(doc.publishedAt && { publishedTime: doc.publishedAt }),
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [ogImage],
    },
  }
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function ArticleSlugPage({ params }: { params: { slug: string } }) {
  const [doc, otherArticles] = await Promise.all([
    getArticleBySlug(params.slug),
    getOtherArticles(params.slug),
  ])

  if (!doc) notFound()

  return (
    <>
      {/* ── Article header ────────────────────────────────────────────────── */}
      <header className="bg-[var(--color-white)] pt-[calc(var(--nav-height)+48px)] pb-12">
        <div className="container max-w-[760px]">
          <AnimateIn className="flex flex-col gap-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[13px] text-[var(--color-gray-500)]" role="list">
                <li>
                  <Link href="/intelligence" className="hover:text-[var(--color-ink)] transition-colors">
                    Intelligence
                  </Link>
                </li>
                <li aria-hidden="true">→</li>
                <li className="text-[var(--color-ink)]">{doc.category}</li>
              </ol>
            </nav>

            {/* Date + category eyebrow */}
            <div className="flex items-center gap-3">
              {doc.publishedAt && (
                <>
                  <time
                    dateTime={doc.publishedAt}
                    className="text-[13px] text-[var(--color-gray-500)]"
                  >
                    {formatDate(doc.publishedAt)}
                  </time>
                  <span className="text-[var(--color-gray-200)]" aria-hidden>·</span>
                </>
              )}
              <span className="text-[11px] font-[500] uppercase tracking-[0.08em] text-[var(--color-accent)]">
                {doc.category}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              {doc.title}
            </h1>

            {/* Teaser */}
            <p
              className="text-[var(--color-ink)]/70 italic leading-[1.7]"
              style={{ fontSize: '1.175rem' }}
            >
              {doc.teaser}
            </p>
          </AnimateIn>
        </div>
      </header>

      {/* ── Hero image ────────────────────────────────────────────────────── */}
      {doc.heroImage && (
        <div
          className="relative w-full bg-[var(--color-gray-200)]"
          style={{ height: '55vh', minHeight: '320px' }}
        >
          <Image
            src={doc.heroImage.url}
            alt={doc.heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <article className="section-spacing bg-[var(--color-white)]">
        <div className="container max-w-[680px]">
          <AnimateIn>
            <RichText content={doc.body} />
          </AnimateIn>
        </div>
      </article>

      {/* ── Author block ──────────────────────────────────────────────────── */}
      <div className="bg-[var(--color-white)] pb-16">
        <div className="container max-w-[680px]">
          <div className="border-t border-[var(--color-gray-200)] pt-8">
            <div className="flex items-center gap-4">
              {/* Portrait placeholder */}
              <div
                className="relative w-12 h-12 rounded-full bg-[var(--color-gray-200)] overflow-hidden flex-shrink-0"
                aria-hidden="true"
              >
                <Image
                  src="/images/portrait-jonas.jpg"
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.9375rem] font-[500] text-[var(--color-ink)]">
                  Jonas Bluhme
                </span>
                <span className="text-[13px] text-[var(--color-gray-500)]">
                  NLP Master Coach — Autodidact systems architect
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── More from Intelligence ────────────────────────────────────────── */}
      {otherArticles.length > 0 && (
        <section className="section-spacing bg-[var(--color-gray-100)]">
          <div className="container flex flex-col gap-12">
            <AnimateIn>
              <h2
                className="text-[var(--color-ink)] font-[400] leading-tight"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                More from intelligence.
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--color-gray-200)]">
              {otherArticles.map((a, i) => (
                <AnimateIn
                  key={a.id}
                  delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}
                  className="pt-8 md:pt-0 md:px-8 first:pt-0 first:pl-0 last:pr-0"
                >
                  <ArticleCard
                    category={a.category}
                    title={a.title}
                    teaser={a.teaser}
                    slug={a.slug}
                    publishedAt={a.publishedAt}
                  />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA — light variant ───────────────────────────────────────────── */}
      <CtaSection variant="light" />
    </>
  )
}
