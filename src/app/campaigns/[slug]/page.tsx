import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import CampaignHero from '@/components/sections/CampaignHero'
import Button       from '@/components/ui/Button'
import AnimateIn    from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

/* ─── Types ───────────────────────────────────────────────────────────────── */

type PainPoint = {
  title:       string
  description: string
}

type CampaignDoc = {
  id:             string
  title:          string
  slug:           string
  vertical:       string
  heroHeadline:   string
  heroSubheading: string
  painPoints:     PainPoint[]
  ctaLabel:       string
  urgencyNote?:   string
  seo?: {
    metaTitle?:       string
    metaDescription?: string
  }
}

/* ─── Payload helpers ─────────────────────────────────────────────────────── */

async function getCampaignBySlug(slug: string): Promise<CampaignDoc | null> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'campaigns',
      where:      { slug: { equals: slug }, status: { equals: 'published' } },
      limit:      1,
      depth:      1,
    })
    if (!result.docs.length) return null
    const doc = result.docs[0] as any
    return {
      id:             String(doc.id),
      title:          doc.title,
      slug:           doc.slug,
      vertical:       doc.vertical,
      heroHeadline:   doc.heroHeadline,
      heroSubheading: doc.heroSubheading,
      painPoints:     (doc.painPoints ?? []).map((p: any) => ({
        title:       p.title,
        description: p.description,
      })),
      ctaLabel:       doc.ctaLabel ?? 'Book a free consultation',
      urgencyNote:    doc.urgencyNote,
      seo:            doc.seo,
    }
  } catch {
    return null
  }
}

/* ─── Static params ───────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'campaigns',
      where:      { status: { equals: 'published' } },
      limit:      100,
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
  const doc = await getCampaignBySlug(params.slug)
  if (!doc) return { title: 'Not found' }

  const title       = doc.seo?.metaTitle       ?? doc.heroHeadline
  const description = doc.seo?.metaDescription ?? doc.heroSubheading

  return {
    title,
    description,
    // Exclude campaign pages from search indexing — they are paid traffic targets
    robots: { index: false, follow: false },
    openGraph: { title, description },
  }
}

/* ─── Static solution copy ────────────────────────────────────────────────── */

const solutions = [
  {
    label:   'Day 1',
    title:   'We map it before we touch it.',
    body:    'A full Discovery session on day one produces a workflow audit, an AI strategy brief, and a scope of work. Nothing is assumed. Everything is documented before any build begins.',
  },
  {
    label:   'Days 2–5',
    title:   'Custom-built around your operations.',
    body:    'Your Atlas agent is designed from scratch using the OpenClaw orchestration framework — not adapted from a template. Integrations, reasoning chains, and escalation rules are all specific to your business.',
  },
  {
    label:   'Days 6–7',
    title:   'Live. Tested. Handed over.',
    body:    'The agent moves into production after a full validation pass. You receive it on your chosen channel with complete hosting setup and documentation — ready to run from day one.',
  },
]

const included = [
  'Full workflow audit and AI strategy brief',
  'Custom agent architecture (no templates)',
  'All integrations in scope',
  'Managed or self-hosted deployment',
  'Handover documentation',
  '30 days of post-launch support',
  'First monthly strategy call included',
]

/* ─── Minimal footer ──────────────────────────────────────────────────────── */

function CampaignFooter() {
  return (
    <footer className="bg-[var(--color-ink)] py-8">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-[500] text-[15px] tracking-[0.14em] hover:opacity-80 transition-opacity"
        >
          ATLASASCEND
        </Link>
        <p className="text-[13px] text-white/40">© 2026 AtlasAscend</p>
      </div>
    </footer>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function CampaignSlugPage({ params }: { params: { slug: string } }) {
  const doc = await getCampaignBySlug(params.slug)
  if (!doc) notFound()

  const painPoints = doc.painPoints.length > 0
    ? doc.painPoints
    : [
        { title: 'Too much manual work',      description: 'Repetitive tasks consume hours every week that should be spent on decisions, not execution.' },
        { title: 'Tools that don\'t connect',  description: 'Your stack is fragmented. Data lives in silos and someone has to manually move it between them.' },
        { title: 'No visibility without effort', description: 'Getting a clear picture of what\'s happening in your business requires pulling reports that should run themselves.' },
      ]

  return (
    <>
      {/* ── 1. Minimal nav + full-height hero ─────────────────────────────── */}
      <CampaignHero
        headline={doc.heroHeadline}
        subheading={doc.heroSubheading}
        ctaLabel={doc.ctaLabel}
        ctaHref="/book"
      />

      {/* ── 2. Pain points ────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex flex-col gap-3 max-w-[560px]">
            <EyebrowLabel>The problem</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              What's slowing your business down.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <AnimateIn
                key={point.title}
                delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}
                className="flex flex-col gap-4 p-8 bg-[var(--color-gray-100)] rounded-card"
              >
                <span
                  className="text-[var(--color-gray-200)] font-[300] leading-none select-none"
                  style={{ fontSize: '3.5rem' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[var(--color-ink)] font-[500] text-[1rem] leading-snug">
                  {point.title}
                </h3>
                <p className="text-[var(--color-ink)]/75 text-[0.9375rem] leading-[1.75]">
                  {point.description}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Solution ───────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-ink-soft)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex flex-col gap-3 max-w-[640px]">
            <EyebrowLabel light>How Atlas solves it</EyebrowLabel>
            <h2
              className="text-white font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              A custom agent. Live in 7 days.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {solutions.map((step, i) => (
              <AnimateIn
                key={step.title}
                delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}
                className="flex flex-col gap-4 py-10 md:py-0 md:px-10 first:pt-0 first:pl-0 last:pb-0 last:pr-0"
              >
                <span className="text-[11px] font-[500] uppercase tracking-[0.1em] text-white/40">
                  {step.label}
                </span>
                <h3 className="text-white font-[500] text-[1rem] leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/65 text-[0.9375rem] leading-[1.75]">
                  {step.body}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Testimonial placeholder ────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-gray-100)]">
        <div className="container max-w-[720px]">
          <AnimateIn>
            <figure className="flex flex-col gap-6">
              <blockquote className="relative">
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
                  Within the first week the agent had already saved us more time than we expected
                  from the entire first month. The process was faster and more thorough than
                  anything we had tried before.
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--color-gray-200)]" aria-hidden="true" />
                <span className="text-[0.9375rem] font-[500] text-[var(--color-ink)]/70">
                  Head of Operations — {doc.vertical} client
                </span>
              </figcaption>
            </figure>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. Offer ──────────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Pricing */}
            <AnimateIn className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <EyebrowLabel>The offer</EyebrowLabel>
                <h2
                  className="text-[var(--color-ink)] font-[400] leading-tight"
                  style={{ fontSize: 'var(--text-h2)' }}
                >
                  Everything you need. One fixed price.
                </h2>
              </div>

              <div className="flex items-end gap-2">
                <span
                  className="text-[var(--color-ink)] font-[400] leading-none"
                  style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
                >
                  $9,999
                </span>
                <span className="text-[var(--color-gray-500)] text-[1rem] mb-2">
                  one-time
                </span>
              </div>

              <p className="text-[var(--color-ink)]/75 text-[1.0625rem] leading-[1.75]">
                No retainer. No hidden costs. One engagement, one price — and your agent is
                live within seven days of our first call.
              </p>

              {doc.urgencyNote && (
                <div className="flex items-center gap-3 bg-[var(--color-gray-100)] rounded-btn px-5 py-3 self-start">
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--color-accent)] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] font-[500] text-[var(--color-ink)]">
                    {doc.urgencyNote}
                  </span>
                </div>
              )}
            </AnimateIn>

            {/* What's included */}
            <AnimateIn delay={100} className="flex flex-col gap-6">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-[var(--color-gray-500)]">
                What's included
              </p>
              <ul className="flex flex-col divide-y divide-[var(--color-gray-200)]" role="list">
                {included.map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-4 py-4 first:pt-0"
                  >
                    <span
                      className="flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <span className="text-[1rem] text-[var(--color-ink)]/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 6. Booking CTA ────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-ink-soft)]">
        <div className="container">
          <AnimateIn className="flex flex-col items-center text-center gap-6 max-w-[600px] mx-auto">
            <h2
              className="text-white font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              {doc.ctaLabel === 'Book a free consultation'
                ? 'Ready to automate your business?'
                : doc.heroHeadline}
            </h2>
            <p className="text-white/70 text-[1.0625rem]">
              Book a free 30-minute call. Jonas personally responds. No commitment required.
            </p>

            {doc.urgencyNote && (
              <p className="text-[var(--color-accent)] text-[0.9375rem] font-[500]">
                {doc.urgencyNote}
              </p>
            )}

            <Button variant="secondary" size="lg" href="/book">
              {doc.ctaLabel}
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 7. Minimal footer ─────────────────────────────────────────────── */}
      <CampaignFooter />
    </>
  )
}
