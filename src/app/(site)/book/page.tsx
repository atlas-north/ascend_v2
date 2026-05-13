import type { Metadata } from 'next'

import Hero         from '@/components/sections/Hero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import AnimateIn    from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Book a consultation',
  description: 'Book a free 30-minute call with Jonas Bluhme. We map your workflows, identify automation opportunities, and deliver a custom AI strategy brief — no obligation.',
  openGraph: {
    title:       'Book a consultation | AtlasAscend',
    description: 'A free 30-minute call. Jonas personally responds.',
    images:      ['/images/hero-book.jpg'],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/images/hero-book.jpg'],
  },
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const expectations = [
  {
    title: '30-minute video call',
    body:  'No slides, no sales deck. A direct conversation about your business and where the time goes.',
  },
  {
    title: 'We map your workflows and pain points',
    body:  'Jonas asks specific questions about how your operations actually run — not generic discovery questions.',
  },
  {
    title: 'You get a custom AI strategy brief — free',
    body:  'Within 48 hours of the call you receive a written brief covering automation opportunities, recommended agent architecture, and a realistic scope.',
  },
  {
    title: 'Jonas personally takes every first call',
    body:  'No SDRs, no junior staff. The person who will build your agent is the person on the call.',
  },
]

const faqItems = [
  {
    question: 'Is the call really free?',
    answer:   'Yes, completely. The 30-minute consultation carries no cost and no obligation. The AI strategy brief you receive afterwards is also free. The only thing we ask for is 30 minutes of your time and honest answers about how your business operates.',
  },
  {
    question: 'What should I prepare?',
    answer:   'Nothing formal. It helps to have a rough sense of which tasks consume the most time in your week, and which tools your team currently uses — but you do not need to produce a document or a slide. Jonas will ask the right questions to get to the relevant information.',
  },
  {
    question: 'How quickly can we start?',
    answer:   'If the consultation confirms that Atlas is a good fit, the earliest available start date is typically within one to two weeks. The 7-day build clock starts on the day of Discovery — so from consultation to live agent is usually under three weeks total.',
  },
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function BookPage() {
  return (
    <>
      {/* ── Hero (short) ──────────────────────────────────────────────────── */}
      <Hero
        height="short"
        imageSrc="/images/hero-book.jpg"
        imageAlt="Glass-walled meeting room with two chairs, early morning light"
        headline="Let's talk about your business."
        subheading="A free 30-minute call. Jonas personally responds. No commitment."
        primaryCta={{ label: 'Jump to booking', href: '#booking' }}
      />

      {/* ── Two-column booking section ────────────────────────────────────── */}
      <section id="booking" className="section-spacing bg-[var(--color-white)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* Left — What to expect */}
            <AnimateIn className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <EyebrowLabel>What to expect</EyebrowLabel>
                <h2
                  className="text-[var(--color-ink)] font-[400] leading-tight"
                  style={{ fontSize: 'var(--text-h2)' }}
                >
                  A conversation, not a pitch.
                </h2>
              </div>

              <ul className="flex flex-col gap-8" role="list">
                {expectations.map(({ title, body }, i) => (
                  <li key={title} className="flex gap-5">
                    {/* Step number */}
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full border border-[var(--color-gray-200)] flex items-center justify-center text-[12px] font-[500] text-[var(--color-gray-500)] mt-0.5"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[var(--color-ink)] text-[1rem] font-[500] leading-snug">
                        {title}
                      </h3>
                      <p className="text-[var(--color-ink)]/70 text-[0.9375rem] leading-[1.75]">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Trust note */}
              <div className="border-t border-[var(--color-gray-200)] pt-8">
                <p className="text-[0.9375rem] text-[var(--color-ink)]/60 leading-[1.75]">
                  AtlasAscend takes a limited number of new clients each month to maintain the
                  quality of every engagement. If the timing is not right, we will tell you — and
                  keep your strategy brief on file for when it is.
                </p>
              </div>
            </AnimateIn>

            {/* Right — Calendly embed */}
            <AnimateIn delay={100} className="flex flex-col gap-4">
              <EyebrowLabel>Book your slot</EyebrowLabel>

              {/*
                TODO: Replace this placeholder with your Calendly inline embed widget.
                Instructions:
                1. Go to calendly.com → Event Types → your 30-min event
                2. Click "Add to website" → Inline embed
                3. Copy the <div class="calendly-inline-widget"> block and the <script> tag
                4. Paste them here in place of the placeholder div below
                5. Remove the placeholder div and this comment block
              */}
              <div
                className="
                  w-full rounded-card border-2 border-dashed border-[var(--color-gray-200)]
                  flex flex-col items-center justify-center text-center gap-4
                  bg-[var(--color-gray-100)] p-12
                "
                style={{ minHeight: '480px' }}
                aria-label="Calendly booking widget — coming soon"
              >
                <div
                  className="w-12 h-12 rounded-full bg-[var(--color-gray-200)] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <CalendarIcon />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[var(--color-ink)] font-[500] text-[1rem]">
                    Calendly embed
                  </p>
                  <p className="text-[var(--color-gray-500)] text-[0.9375rem] max-w-[280px]">
                    Add your Calendly booking link here — see code comment for instructions.
                  </p>
                </div>
              </div>

              <p className="text-[13px] text-[var(--color-gray-500)] text-center">
                Prefer email?{' '}
                <a
                  href="mailto:hello@atlasascend.ai"
                  className="text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
                >
                  hello@atlasascend.ai
                </a>
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FaqAccordion
        items={faqItems}
        eyebrow="Before you book"
        heading="Quick answers."
      />
    </>
  )
}

/* ─── Calendar icon ───────────────────────────────────────────────────────── */

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-gray-500)]" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[var(--color-gray-500)]" />
    </svg>
  )
}
