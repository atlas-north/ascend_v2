import type { Metadata } from 'next'

import Hero       from '@/components/sections/Hero'
import CtaSection from '@/components/sections/CtaSection'
import CasesGrid  from '@/components/sections/CasesGrid'
import type { CaseItem } from '@/components/sections/CasesGrid'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Cases',
  description: 'Real results from real businesses. See how AtlasAscend has automated workflows and saved hundreds of hours across every industry.',
  openGraph: {
    title:       'Cases | AtlasAscend',
    description: 'Real results from real businesses.',
    images:      ['/images/hero-cases.jpg'],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/images/hero-cases.jpg'],
  },
}

/* ─── Placeholder data ────────────────────────────────────────────────────── */

const placeholderCases: CaseItem[] = [
  {
    id:           'p1',
    industry:     'E-commerce',
    headline:     'Order management fully automated',
    resultMetric: '18 hrs/week saved',
    tags:         ['automation'],
    slug:         'order-management',
  },
  {
    id:           'p2',
    industry:     'Legal',
    headline:     'Client intake handled end-to-end by Atlas',
    resultMetric: '3× faster response',
    tags:         ['integration'],
    slug:         'client-intake',
  },
  {
    id:           'p3',
    industry:     'SaaS',
    headline:     'Churn signals caught before they escalate',
    resultMetric: '22% reduction',
    tags:         ['intelligence'],
    slug:         'churn-signals',
  },
  {
    id:           'p4',
    industry:     'Operations',
    headline:     'Weekly reporting from 4 hours to 4 minutes',
    resultMetric: '98% time saving',
    tags:         ['automation'],
    slug:         'weekly-reporting',
  },
  {
    id:           'p5',
    industry:     'Finance',
    headline:     'Invoice tracking and alerts, zero manual input',
    resultMetric: '0 missed invoices',
    tags:         ['intelligence'],
    slug:         'invoice-tracking',
  },
  {
    id:           'p6',
    industry:     'Other',
    headline:     'Multi-channel support agent live in 6 days',
    resultMetric: '6 days deployment',
    tags:         ['integration'],
    slug:         'support-agent',
  },
]

/* ─── Data fetching ───────────────────────────────────────────────────────── */

async function fetchCases(): Promise<CaseItem[]> {
  try {
    const { getPayloadClient } = await import('@/lib/getPayload')
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'cases',
      where:      { status: { equals: 'published' } },
      sort:       '-createdAt',
      limit:      100,
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

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function CasesPage() {
  const cases = await fetchCases()

  return (
    <>
      <Hero
        height="medium"
        imageSrc="/images/hero-cases.jpg"
        imageAlt="Aerial photograph of a modern European city centre"
        headline="Results that speak for themselves."
        primaryCta={{ label: 'Book a consultation', href: '/book' }}
      />

      <CasesGrid cases={cases} />

      <CtaSection />
    </>
  )
}
