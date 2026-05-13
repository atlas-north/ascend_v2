import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Hero        from '@/components/sections/Hero'
import ArticleCard from '@/components/sections/ArticleCard'
import CtaSection  from '@/components/sections/CtaSection'
import AnimateIn   from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Intelligence',
  description: 'Observations on AI, automation, and the businesses that get it right.',
  openGraph: {
    title:       'Intelligence | AtlasAscend',
    description: 'Observations on AI, automation, and the businesses that get it right.',
    images:      ['/images/hero-intelligence.jpg'],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/images/hero-intelligence.jpg'],
  },
}

/* ─── Types ───────────────────────────────────────────────────────────────── */

type ArticleItem = {
  id:           string
  title:        string
  slug:         string
  category:     string
  teaser:       string
  publishedAt?: string
  heroImage?:   { url: string; alt: string }
}

/* ─── Placeholder data ────────────────────────────────────────────────────── */

const placeholderFeatured: ArticleItem = {
  id:          'pf1',
  title:       'Why most AI implementations fail before they start',
  slug:        'why-ai-implementations-fail',
  category:    'Strategy',
  teaser:      'The gap between a demo and a deployed agent is where most projects quietly die. The cause is almost never the technology.',
  publishedAt: '2026-04-10T09:00:00.000Z',
}

const placeholderGrid: ArticleItem[] = [
  {
    id:          'pg1',
    title:       'The case for 7-day deployment',
    slug:        'case-for-7-day-deployment',
    category:    'Automation',
    teaser:      'Long implementation cycles kill momentum and inflate scope. We designed the Atlas process around one hard constraint: seven days from first call to live agent.',
    publishedAt: '2026-03-28T09:00:00.000Z',
  },
  {
    id:          'pg2',
    title:       'What autonomous really means',
    slug:        'what-autonomous-really-means',
    category:    'Intelligence',
    teaser:      'Most tools labelled autonomous still require a human in the loop for every non-trivial decision. Real autonomy has a specific architecture — and it looks nothing like a chat interface.',
    publishedAt: '2026-03-14T09:00:00.000Z',
  },
  {
    id:          'pg3',
    title:       'Why your AI needs to know your business, not just your prompt',
    slug:        'ai-needs-to-know-your-business',
    category:    'Strategy',
    teaser:      'Prompt engineering is a workaround for a missing architecture. An agent that truly knows your business does not need to be re-briefed every conversation.',
    publishedAt: '2026-02-27T09:00:00.000Z',
  },
  {
    id:          'pg4',
    title:       'The orchestration layer nobody talks about',
    slug:        'orchestration-layer',
    category:    'Platform',
    teaser:      'Between the language model and the business outcome sits a layer that most AI products skip entirely. Here is what it does and why its absence costs you.',
    publishedAt: '2026-02-12T09:00:00.000Z',
  },
  {
    id:          'pg5',
    title:       'Hosting your own AI: what it actually takes',
    slug:        'hosting-your-own-ai',
    category:    'Integration',
    teaser:      'Self-hosted AI sounds simple until you are three days into configuring dependencies on a rented server. We have done it enough times to know exactly where it goes wrong.',
    publishedAt: '2026-01-30T09:00:00.000Z',
  },
]

/* ─── Data fetching ───────────────────────────────────────────────────────── */

async function fetchArticles(): Promise<{ featured: ArticleItem; grid: ArticleItem[] }> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'articles',
      where:      { status: { equals: 'published' } },
      sort:       '-publishedAt',
      limit:      6,
      depth:      1,
    })

    if (!result.docs.length) return { featured: placeholderFeatured, grid: placeholderGrid }

    const docs: ArticleItem[] = result.docs.map((doc: any) => ({
      id:          String(doc.id),
      title:       doc.title,
      slug:        doc.slug,
      category:    doc.category,
      teaser:      doc.teaser,
      publishedAt: doc.publishedAt,
      heroImage:   doc.heroImage?.url
                     ? { url: doc.heroImage.url, alt: doc.heroImage.alt ?? '' }
                     : undefined,
    }))

    const [featured, ...grid] = docs
    return { featured, grid }
  } catch {
    return { featured: placeholderFeatured, grid: placeholderGrid }
  }
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function IntelligencePage() {
  const { featured, grid } = await fetchArticles()

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Hero
        height="medium"
        imageSrc="/images/hero-intelligence.jpg"
        imageAlt="Open notebook with a fountain pen, warm morning light"
        headline="What moves."
        subheading="Observations on AI, automation, and the businesses that get it right."
        primaryCta={{ label: 'Book a consultation', href: '/book' }}
      />

      {/* ── Featured article ──────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container flex flex-col gap-4">
          <AnimateIn>
            <EyebrowLabel>Featured</EyebrowLabel>
          </AnimateIn>

          <AnimateIn delay={100}>
            <Link
              href={`/intelligence/${featured.slug}`}
              className="group block"
              aria-label={`Read: ${featured.title}`}
            >
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-card overflow-hidden border border-[var(--color-gray-200)] hover:border-[var(--color-gray-500)] transition-colors">
                {/* Image */}
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[380px] bg-[var(--color-gray-200)]">
                  {featured.heroImage ? (
                    <Image
                      src={featured.heroImage.url}
                      alt={featured.heroImage.alt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[var(--color-gray-200)]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-12 bg-[var(--color-gray-100)]">
                  <div className="flex items-center gap-3">
                    {featured.publishedAt && (
                      <>
                        <time
                          dateTime={featured.publishedAt}
                          className="text-[12px] text-[var(--color-gray-500)]"
                        >
                          {formatDate(featured.publishedAt)}
                        </time>
                        <span className="text-[var(--color-gray-200)]" aria-hidden>·</span>
                      </>
                    )}
                    <span className="text-[11px] font-[500] uppercase tracking-[0.08em] text-[var(--color-accent)]">
                      {featured.category}
                    </span>
                  </div>

                  <h2
                    className="text-[var(--color-ink)] font-[400] leading-tight group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
                  >
                    {featured.title}
                  </h2>

                  <p className="text-[var(--color-ink)]/75 text-[1rem] leading-[1.75]">
                    {featured.teaser}
                  </p>

                  <span className="text-[13px] font-[500] text-[var(--color-ink)] underline underline-offset-4 group-hover:text-[var(--color-accent)] transition-colors self-start">
                    Read →
                  </span>
                </div>
              </article>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Article grid ──────────────────────────────────────────────────── */}
      {grid.length > 0 && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
              {grid.map((article, i) => (
                <AnimateIn
                  key={article.id}
                  delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}
                >
                  <ArticleCard
                    category={article.category}
                    title={article.title}
                    teaser={article.teaser}
                    slug={article.slug}
                    publishedAt={article.publishedAt}
                  />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA — light variant ────────────────────────────────────────────── */}
      <CtaSection variant="light" />
    </>
  )
}
