import type { Metadata } from 'next'
import Link from 'next/link'

import Hero        from '@/components/sections/Hero'
import StatsBar    from '@/components/sections/StatsBar'
import CaseCard    from '@/components/sections/CaseCard'
import ArticleCard from '@/components/sections/ArticleCard'
import CtaSection  from '@/components/sections/CtaSection'
import AnimateIn   from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import Button      from '@/components/ui/Button'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'AtlasAscend — Custom AI agents for your business',
  description: 'Custom AI agents built around your workflows — live in 7 days.',
  openGraph: {
    title:       'AtlasAscend — Custom AI agents for your business',
    description: 'Custom AI agents built around your workflows — live in 7 days.',
    images:      ['/images/hero-home.jpg'],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'AtlasAscend — Custom AI agents for your business',
    description: 'Custom AI agents built around your workflows — live in 7 days.',
    images:      ['/images/hero-home.jpg'],
  },
}

/* ─── Placeholder data (shown when Payload has no published content) ──────── */

const placeholderCases = [
  {
    id:           'placeholder-1',
    industry:     'E-commerce',
    headline:     'Order management fully automated',
    resultMetric: '18 hrs/week saved',
    tags:         ['automation'],
    slug:         'order-management',
  },
  {
    id:           'placeholder-2',
    industry:     'Legal',
    headline:     'Client intake handled end-to-end by Atlas',
    resultMetric: '3× faster response',
    tags:         ['integration'],
    slug:         'client-intake',
  },
]

const placeholderArticles = [
  {
    id:          'placeholder-1',
    category:    'Strategy',
    title:       'Why most AI implementations fail before they start',
    teaser:      'The gap between a demo and a deployed agent is where most projects quietly die. Here is what separates the ones that make it.',
    slug:        'why-ai-implementations-fail',
    publishedAt: '2026-04-10T09:00:00.000Z',
  },
  {
    id:          'placeholder-2',
    category:    'Automation',
    title:       'The case for 7-day deployment',
    teaser:      'Long implementation cycles kill momentum. We designed the Atlas process around a single constraint: seven days from first call to live agent.',
    slug:        'case-for-7-day-deployment',
    publishedAt: '2026-03-28T09:00:00.000Z',
  },
  {
    id:          'placeholder-3',
    category:    'Platform',
    title:       'What autonomous really means',
    teaser:      'Most tools labelled autonomous still require a human in the loop for every non-trivial decision. Real autonomy looks very different.',
    slug:        'what-autonomous-really-means',
    publishedAt: '2026-03-14T09:00:00.000Z',
  },
]

/* ─── Process steps ───────────────────────────────────────────────────────── */

const steps = [
  { number: '01', title: 'Discovery',    description: 'We map your workflows and pain points before a single line of code is written.' },
  { number: '02', title: 'Design',       description: 'Your agent is architected from scratch around your business — no templates.' },
  { number: '03', title: 'Integration',  description: 'We connect your existing tools. You keep full visibility and control.' },
  { number: '04', title: 'Deploy',       description: 'Live agent, tested, handed over to you on day 6 or 7.' },
  { number: '05', title: 'Iterate',      description: 'Monthly strategy calls. Continuous tuning and capability expansion.' },
]

/* ─── Capability cards ────────────────────────────────────────────────────── */

const capabilities = [
  {
    title:       'Custom agent design',
    description: 'Every agent is built for your specific workflows, not adapted from a generic template. The result is an agent that knows your business as well as you do.',
  },
  {
    title:       'Flexible hosting',
    description: 'Choose managed hosting in EU data centres or take full ownership via SSH handover. Your data never leaves your infrastructure without your permission.',
  },
  {
    title:       'Business intelligence',
    description: 'Daily briefings, KPI alerts, and anomaly detection delivered directly to your inbox. Your agent reports to you — every single day.',
  },
  {
    title:       'Workflow automation',
    description: 'Multi-step task chains that run around the clock. Approvals, escalations, cross-platform sync — all orchestrated without manual intervention.',
  },
]

/* ─── Data fetching ───────────────────────────────────────────────────────── */

type CaseItem = {
  id:           string
  industry:     string
  headline:     string
  resultMetric?: string
  tags:         string[]
  slug:         string
}

type ArticleItem = {
  id:          string
  category:    string
  title:       string
  teaser:      string
  slug:        string
  publishedAt?: string
}

async function fetchCases(): Promise<CaseItem[]> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'cases',
      where:      { status: { equals: 'published' } },
      sort:       '-createdAt',
      limit:      2,
    })
    if (!result.docs.length) return placeholderCases

    return result.docs.map((doc: any) => ({
      id:           String(doc.id),
      industry:     doc.industry,
      headline:     doc.headline,
      resultMetric: doc.resultMetric,
      tags:         (doc.tags ?? []).map((t: any) => t.tag ?? t),
      slug:         doc.slug,
    }))
  } catch {
    return placeholderCases
  }
}

async function fetchArticles(): Promise<ArticleItem[]> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'articles',
      where:      { status: { equals: 'published' } },
      sort:       '-publishedAt',
      limit:      3,
    })
    if (!result.docs.length) return placeholderArticles

    return result.docs.map((doc: any) => ({
      id:          String(doc.id),
      category:    doc.category,
      title:       doc.title,
      teaser:      doc.teaser,
      slug:        doc.slug,
      publishedAt: doc.publishedAt,
    }))
  } catch {
    return placeholderArticles
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function HomePage() {
  const [cases, articles] = await Promise.all([fetchCases(), fetchArticles()])

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <Hero
        height="full"
        imageSrc="/images/hero-home.jpg"
        imageAlt="Modern open-plan office at dusk"
        headline={"Your business.\nAutomated."}
        subheading="Custom AI agents built around your workflows — live in 7 days."
        primaryCta={{ label: 'Book a consultation', href: '/book' }}
        secondaryCta={{ label: 'See how it works',  href: '/how-it-works' }}
      />

      {/* ── 2. Stats bar ──────────────────────────────────────────────────── */}
      <StatsBar />

      {/* ── 3. Problem ────────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container">
          <AnimateIn className="max-w-[720px] mx-auto text-center flex flex-col gap-6">
            <EyebrowLabel>The problem</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              AI tools promise the world. Most deliver templates.
            </h2>
            <div className="flex flex-col gap-4 text-left">
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                The market is full of AI tools that claim to transform your business. In practice,
                they offer a prompt interface bolted onto a generic language model — the same tool
                your competitor is using, configured from the same dropdown menu, producing the same
                mediocre output. The gap between a demo and a deployed agent that actually knows your
                workflows is where most projects quietly die.
              </p>
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                Real automation is not about adding an AI layer on top of your existing chaos. It
                requires understanding your specific operations, your team structure, the tools you
                already use, and the decisions that actually cost you time. That depth cannot come from
                a template. It has to be built — deliberately, for you, from the ground up.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. How it works preview ───────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-gray-100)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex flex-col gap-3">
            <EyebrowLabel>Process</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              From first call to live agent in 7 days.
            </h2>
          </AnimateIn>

          {/* Steps grid */}
          <div className="flex gap-6 overflow-x-auto pb-4 md:overflow-visible md:pb-0 md:grid md:grid-cols-5">
            {steps.map(({ number, title, description }, i) => (
              <AnimateIn
                key={number}
                delay={i < 4 ? ([0, 100, 200, 300] as const)[i] : 300}
                className="flex-shrink-0 w-[220px] md:w-auto flex flex-col gap-3"
              >
                <span
                  className="text-[var(--color-gray-200)] font-[400] leading-none select-none"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <h3 className="text-[var(--color-ink)] text-[1rem] font-[500]">{title}</h3>
                <p className="text-[var(--color-ink)]/70 text-[0.9375rem] leading-relaxed">
                  {description}
                </p>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn>
            <Link
              href="/how-it-works"
              className="text-[14px] font-[500] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
            >
              See the full process →
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. Capabilities preview ───────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex flex-col gap-3">
            <EyebrowLabel>What we build</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              Everything your agent needs to run your business.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map(({ title, description }, i) => (
              <AnimateIn
                key={title}
                delay={i < 4 ? ([0, 100, 200, 300] as const)[i] : 0}
                className="bg-[var(--color-gray-100)] rounded-card p-7 flex flex-col gap-3"
              >
                {/* Icon placeholder — FLUX icon set to be added */}
                <div
                  className="w-9 h-9 rounded bg-[var(--color-gray-200)]"
                  aria-hidden="true"
                />
                <h3 className="text-[var(--color-ink)] text-[1rem] font-[500] leading-snug">
                  {title}
                </h3>
                <p className="text-[var(--color-ink)]/70 text-[0.9375rem] leading-relaxed">
                  {description}
                </p>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn>
            <Link
              href="/capabilities"
              className="text-[14px] font-[500] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
            >
              All capabilities →
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── 6. Cases preview ──────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-gray-100)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <EyebrowLabel>Client work</EyebrowLabel>
              <h2
                className="text-[var(--color-ink)] font-[400] leading-tight"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                Results that speak for themselves.
              </h2>
            </div>
            <Link
              href="/cases"
              className="text-[14px] font-[500] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
            >
              All cases →
            </Link>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c, i) => (
              <AnimateIn key={c.id} delay={i === 0 ? 0 : 100}>
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

      {/* ── 7. Intelligence preview ───────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <EyebrowLabel>Intelligence</EyebrowLabel>
              <h2
                className="text-[var(--color-ink)] font-[400] leading-tight"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                What moves.
              </h2>
            </div>
            <Link
              href="/intelligence"
              className="text-[14px] font-[500] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
            >
              All intelligence →
            </Link>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--color-gray-200)]">
            {articles.map((a, i) => (
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

      {/* ── 8. CTA ────────────────────────────────────────────────────────── */}
      <CtaSection />
    </>
  )
}
