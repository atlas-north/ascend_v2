import type { Metadata } from 'next'
import Image from 'next/image'

import Hero        from '@/components/sections/Hero'
import CtaSection  from '@/components/sections/CtaSection'
import AnimateIn   from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'About',
  description: 'AtlasAscend is built by Jonas Bluhme — NLP Master Coach and autodidact systems architect. Custom AI agents designed around your business, not around a template.',
  openGraph: {
    title:       'About | AtlasAscend',
    description: 'Built by a systems thinker.',
    images:      ['/images/hero-about.jpg'],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/images/hero-about.jpg'],
  },
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const differentiators = [
  {
    title:       'Context over commands',
    description: 'Atlas maintains a persistent model of your business — your workflows, your decisions, your exceptions. It does not need to be re-briefed each session.',
  },
  {
    title:       'Orchestration over generation',
    description: 'Where a GPT wrapper generates a response, Atlas coordinates a sequence — calling tools, checking conditions, and completing multi-step tasks end-to-end.',
  },
  {
    title:       'Auditability over opacity',
    description: 'Every decision Atlas makes is logged. You can see what it did, why it did it, and what it would do differently — without reverse-engineering a prompt.',
  },
]

const values = [
  {
    title:       'Custom over generic',
    description: 'A tool built for everyone solves problems for no one in particular. Every Atlas agent is designed around a single business — its workflows, its team, its edge cases. Generic is a shortcut we do not take.',
  },
  {
    title:       'Clarity over complexity',
    description: 'AI is already complex enough. Our job is to make the agent\'s behaviour, its scope, and its reasoning transparent — so you know exactly what it is doing and why, without needing a technical background.',
  },
  {
    title:       'Ownership over dependency',
    description: 'You own the agent, the configuration, and the data. If you want to move infrastructure, take the SSH handover and go. We design for your independence, not our retention.',
  },
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Hero
        height="medium"
        imageSrc="/images/hero-about.jpg"
        imageAlt="Wide empty loft office space with a single warm desk lamp"
        headline="Built by a systems thinker."
        primaryCta={{ label: 'Book a consultation', href: '/book' }}
      />

      {/* ── Founder ───────────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 md:gap-20 items-start">

            {/* Portrait — left on desktop, top on mobile */}
            <AnimateIn className="relative w-full aspect-[4/5] md:aspect-auto md:h-[600px] bg-[var(--color-gray-200)] rounded-card overflow-hidden order-first">
              <Image
                src="/images/portrait-jonas.jpg"
                alt="Jonas Bluhme, founder of AtlasAscend"
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </AnimateIn>

            {/* Text — right on desktop */}
            <AnimateIn delay={100} className="flex flex-col gap-6 md:pt-4">
              <div className="flex flex-col gap-2">
                <EyebrowLabel>Founder</EyebrowLabel>
                <h2
                  className="text-[var(--color-ink)] font-[400] leading-tight"
                  style={{ fontSize: 'var(--text-h2)' }}
                >
                  Jonas Bluhme
                </h2>
                <p className="text-[0.9375rem] font-[500] text-[var(--color-gray-500)] tracking-[0.01em]">
                  NLP Master Coach — Autodidact systems architect
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                  Jonas Bluhme spent years working at the intersection of human behaviour and
                  systems design — first as an NLP Master Coach helping executives restructure
                  how they make decisions, then as a self-taught architect building the kind of
                  operational systems that most consultants only put on slides. The combination
                  produces a particular way of seeing businesses: as sequences of decisions, not
                  collections of tasks.
                </p>
                <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                  AtlasAscend came out of a simple observation: the businesses that were getting
                  real results from AI were not using off-the-shelf tools. They were building
                  systems — specific, integrated, designed for their actual workflows. Jonas built
                  Atlas and the OpenClaw framework to make that level of customisation accessible
                  without a six-month implementation cycle or an enterprise budget.
                </p>
                <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                  The 7-day deployment model is not a marketing promise. It is the result of a
                  process that has been refined across dozens of client engagements to eliminate
                  the phases that delay without adding value. Jonas personally takes every first
                  call — because the quality of the Discovery conversation determines everything
                  that follows.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Atlas technology ──────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-gray-100)]">
        <div className="container">

          {/* Centred header */}
          <AnimateIn className="max-w-[760px] mx-auto text-center flex flex-col gap-6 mb-16">
            <EyebrowLabel>The technology</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              Atlas is not a chatbot. It is an orchestrator.
            </h2>
            <div className="flex flex-col gap-4 text-left">
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                Most AI products on the market today are prompt interfaces — thin wrappers around
                a language model that generate a response when you ask a question. They are useful
                for drafting text and answering queries. They are not useful for running your
                business. The difference is not intelligence. It is architecture.
              </p>
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                Atlas is designed around a different set of constraints. It does not wait for
                instructions — it maintains an active model of your workflows and acts within
                the scope you have defined. It coordinates tool calls, manages multi-step
                sequences, and handles exceptions without requiring human intervention at each
                step. When it needs you, it asks. When it does not, it continues.
              </p>
            </div>
          </AnimateIn>

          {/* Differentiator cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((item, i) => (
              <AnimateIn
                key={item.title}
                delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}
                className="bg-[var(--color-white)] rounded-card p-8 flex flex-col gap-4"
              >
                <h3 className="text-[var(--color-ink)] text-[1rem] font-[500] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[var(--color-ink)]/75 text-[0.9375rem] leading-[1.75]">
                  {item.description}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-white)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex flex-col gap-3">
            <EyebrowLabel>Principles</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              What we stand for.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--color-gray-200)]">
            {values.map((value, i) => (
              <AnimateIn
                key={value.title}
                delay={i < 3 ? ([0, 100, 200] as const)[i] : 0}
                className="flex flex-col gap-4 py-10 md:py-0 md:px-10 first:pl-0 last:pr-0"
              >
                <h3
                  className="text-[var(--color-ink)] font-[500] leading-snug"
                  style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)' }}
                >
                  {value.title}
                </h3>
                <p className="text-[var(--color-ink)]/75 text-[0.9375rem] leading-[1.75]">
                  {value.description}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaSection />
    </>
  )
}
