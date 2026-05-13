import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import CtaSection from '@/components/sections/CtaSection'
import CaseCard   from '@/components/sections/CaseCard'
import RichText   from '@/components/ui/RichText'
import AnimateIn  from '@/components/ui/AnimateIn'

/* ─── Types ───────────────────────────────────────────────────────────────── */

type CaseDoc = {
  id:                string
  clientName:        string
  industry:          string
  headline:          string
  slug:              string
  tags:              string[]
  resultMetric?:     string
  heroImage?:        { url: string; alt: string }
  body?:             any
  testimonialQuote?: string
  testimonialAuthor?: string
  seo?: {
    metaTitle?:       string
    metaDescription?: string
  }
}

/* ─── Payload helpers ─────────────────────────────────────────────────────── */

async function getCaseBySlug(slug: string): Promise<CaseDoc | null> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'cases',
      where:      { slug: { equals: slug }, status: { equals: 'published' } },
      limit:      1,
      depth:      2,
    })
    if (!result.docs.length) return null
    const doc = result.docs[0] as any
    return {
      id:                String(doc.id),
      clientName:        doc.clientName,
      industry:          doc.industry,
      headline:          doc.headline,
      slug:              doc.slug,
      tags:              (doc.tags ?? []).map((t: any) => t.tag ?? t),
      resultMetric:      doc.resultMetric,
      heroImage:         doc.heroImage?.url
                           ? { url: doc.heroImage.url, alt: doc.heroImage.alt ?? '' }
                           : undefined,
      body:              doc.body,
      testimonialQuote:  doc.testimonialQuote,
      testimonialAuthor: doc.testimonialAuthor,
      seo:               doc.seo,
    }
  } catch {
    return null
  }
}

async function getOtherCases(excludeSlug: string): Promise<CaseDoc[]> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'cases',
      where:      { status: { equals: 'published' } },
      sort:       '-createdAt',
      limit:      4,
      depth:      1,
    })
    const others = result.docs
      .filter((d: any) => d.slug !== excludeSlug)
      .slice(0, 3)
    return others.map((doc: any) => ({
      id:           String(doc.id),
      clientName:   doc.clientName,
      industry:     doc.industry,
      headline:     doc.headline,
      slug:         doc.slug,
      tags:         (doc.tags ?? []).map((t: any) => t.tag ?? t),
      resultMetric: doc.resultMetric,
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
      collection: 'cases',
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
  const doc = await getCaseBySlug(params.slug)
  if (!doc) return { title: 'Case not found' }

  const title       = doc.seo?.metaTitle       ?? `${doc.clientName} — ${doc.headline}`
  const description = doc.seo?.metaDescription ?? doc.headline

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: doc.heroImage ? [doc.heroImage.url] : ['/images/hero-cases.jpg'],
    },
    twitter: {
      card:   'summary_large_image',
      title,
      description,
      images: doc.heroImage ? [doc.heroImage.url] : ['/images/hero-cases.jpg'],
    },
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function CaseSlugPage({ params }: { params: { slug: string } }) {
  const [doc, otherCases] = await Promise.all([
    getCaseBySlug(params.slug),
    getOtherCases(params.slug),
  ])

  if (!doc) notFound()

  const heroSrc = doc.heroImage?.url ?? '/images/hero-cases.jpg'
  const heroAlt = doc.heroImage?.alt ?? 'Case study hero image'

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="pt-[calc(var(--nav-height)+32px)] pb-0 bg-[var(--color-white)]">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[13px] text-[var(--color-gray-500)]" role="list">
              <li>
                <Link href="/cases" className="hover:text-[var(--color-ink)] transition-colors">
                  Cases
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-[var(--color-ink)]">{doc.clientName}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Case header ───────────────────────────────────────────────────── */}
      <header className="bg-[var(--color-white)] pt-8 pb-12">
        <div className="container max-w-[760px]">
          <AnimateIn className="flex flex-col gap-6">
            {/* Industry tag */}
            <span className="self-start text-[11px] font-[500] uppercase tracking-[0.08em] text-[var(--color-gray-500)] bg-[var(--color-gray-100)] px-3 py-1 rounded-full border border-[var(--color-gray-200)]">
              {doc.industry}
            </span>

            {/* Headline */}
            <h1
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              {doc.headline}
            </h1>

            {/* Result metric */}
            {doc.resultMetric && (
              <p
                className="text-[var(--color-accent)] font-[500] leading-none"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              >
                {doc.resultMetric}
              </p>
            )}

            {/* Tags */}
            {doc.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {doc.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-[500] uppercase tracking-[0.06em] text-[var(--color-gray-500)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </AnimateIn>
        </div>
      </header>

      {/* ── Hero image ────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[16/7] bg-[var(--color-gray-200)]">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <article className="section-spacing bg-[var(--color-white)]">
        <div className="container max-w-[680px]">
          <AnimateIn>
            <RichText content={doc.body} />
          </AnimateIn>
        </div>
      </article>

      {/* ── Testimonial ───────────────────────────────────────────────────── */}
      {doc.testimonialQuote && (
        <section className="section-spacing bg-[var(--color-gray-100)]">
          <div className="container max-w-[720px]">
            <AnimateIn>
              <figure className="flex flex-col gap-6">
                <blockquote className="relative">
                  {/* Decorative quote mark */}
                  <span
                    className="absolute -top-6 -left-2 text-[6rem] leading-none text-[var(--color-gray-200)] select-none font-[400]"
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p
                    className="relative text-[var(--color-ink)] font-[400] leading-[1.6] italic"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
                  >
                    {doc.testimonialQuote}
                  </p>
                </blockquote>
                {doc.testimonialAuthor && (
                  <figcaption className="flex items-center gap-3">
                    <span className="w-8 h-px bg-[var(--color-gray-200)]" aria-hidden="true" />
                    <span className="text-[0.9375rem] font-[500] text-[var(--color-ink)]/70">
                      {doc.testimonialAuthor}
                    </span>
                  </figcaption>
                )}
              </figure>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ── More cases ────────────────────────────────────────────────────── */}
      {otherCases.length > 0 && (
        <section className="section-spacing bg-[var(--color-white)]">
          <div className="container flex flex-col gap-10">
            <AnimateIn>
              <h2
                className="text-[var(--color-ink)] font-[400] leading-tight"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                More cases
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherCases.map((c, i) => (
                <AnimateIn key={c.id} delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}>
                  <CaseCard
                    industry={c.industry}
                    headline={c.headline}
                    resultMetric={c.resultMetric}
                    tags={c.tags}
                    slug={c.slug}
                  />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaSection />
    </>
  )
}
