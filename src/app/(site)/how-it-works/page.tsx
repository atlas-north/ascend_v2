import type { Metadata } from 'next'

import Hero         from '@/components/sections/Hero'
import CtaSection   from '@/components/sections/CtaSection'
import FaqAccordion from '@/components/sections/FaqAccordion'
import AnimateIn    from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'How it works',
  description: 'From first call to live AI agent in 7 days. A transparent, five-step process built around your business.',
  openGraph: {
    title:       'How it works | AtlasAscend',
    description: 'From first call to live AI agent in 7 days.',
    images:      ['/images/hero-how-it-works.jpg'],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/images/hero-how-it-works.jpg'],
  },
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const steps = [
  {
    number:      '01',
    title:       'We map your business before we touch any code.',
    time:        'Day 1',
    body: [
      'Before any design or development starts, we spend a full day understanding how your business actually operates. That means mapping your workflows, identifying the decisions that cost you the most time, and documenting the tools and data sources already in play.',
      'Most AI projects fail because they start with the technology. We start with the problem. The output of Discovery is a complete picture of your operations — the foundation every subsequent step is built on.',
    ],
    deliverables: ['Workflow audit document', 'AI strategy brief', 'Scope of work'],
  },
  {
    number:      '02',
    title:       'Your agent is designed from scratch. No templates.',
    time:        'Day 2–3',
    body: [
      'With the workflow audit complete, we design the agent architecture specific to your requirements. This covers the reasoning chains the agent will use, the data it will need access to, the decisions it will make autonomously, and the points where it will escalate to you.',
      'The Design phase also produces the integration map — a clear specification of every tool, API, and data source the agent will connect to. Nothing is vague. By the end of Day 3, we know exactly what we are building and why.',
    ],
    deliverables: ['Agent architecture', 'Integration map', 'OpenClaw configuration plan'],
  },
  {
    number:      '03',
    title:       'We connect your tools. You keep control.',
    time:        'Day 3–5',
    body: [
      'Integration is where most AI implementations stall. Credentials expire, APIs behave unexpectedly, and edge cases multiply. We handle all of it — connecting your calendar, email, CRM, ClickUp, and any other tools specified in the integration map.',
      'You retain full ownership of every connection. We never store credentials, and every integration is tested in an isolated environment before it touches your live data. You see the test environment before anything goes to production.',
    ],
    deliverables: ['Calendar + email integration', 'CRM or ClickUp connection', 'Test environment'],
  },
  {
    number:      '04',
    title:       'Live. Tested. Yours.',
    time:        'Day 6–7',
    body: [
      'On day 6 the agent moves from the test environment into production. We run a full validation pass — verifying every workflow, stress-testing edge cases, and confirming the agent behaves exactly as designed under real conditions.',
      'Day 7 is the handover. You receive the live agent on your chosen channel, complete hosting setup, and full documentation covering how the agent works, how to adjust its behaviour, and how to reach us for support.',
    ],
    deliverables: ['Live agent on your chosen channel', 'Hosting setup (managed or self-hosted)', 'Handover documentation'],
  },
  {
    number:      '05',
    title:       'We review. We improve. Every month.',
    time:        'Ongoing',
    body: [
      'Deployment is not the end of the engagement — it is the beginning of the iteration cycle. Every month we review the agent\'s performance data with you: what tasks it completed, where it hesitated, and what new workflows could be brought under automation.',
      'The monthly strategy call gives you a structured opportunity to expand the agent\'s capabilities, adjust its behaviour as your business evolves, and plan the next phase of automation. Most clients are automating their third and fourth workflow before the end of the first quarter.',
    ],
    deliverables: ['Monthly strategy call', 'Performance review', 'Tuning + expansion of agent capabilities'],
  },
]

const faqItems = [
  {
    question: 'What if my workflows are complex?',
    answer:   'Complex workflows are where Atlas performs best. The Discovery phase is specifically designed to map multi-step, conditional, and exception-heavy processes — the kind that break generic automation tools. We have yet to encounter a workflow that cannot be designed for; the question is always scope and phasing, not feasibility.',
  },
  {
    question: 'Do I own the agent and its data?',
    answer:   'Yes, completely. You own the agent configuration, the data it processes, and the infrastructure it runs on. If you choose self-hosted deployment, we hand over everything via SSH and you have full control from day one. Even on managed hosting, your data is stored in EU data centres under your account and is never used for any purpose other than running your agent.',
  },
  {
    question: 'What happens after the first 7 days?',
    answer:   'The 7-day window gets your agent live and validated. After that, you move into the Iterate phase — a monthly engagement that covers performance review, tuning, and capability expansion. Most clients use the first month to stabilise the initial workflows before adding new ones. The pace is entirely up to you.',
  },
  {
    question: 'Can you integrate with any tool?',
    answer:   'If the tool has an API, a webhook, or a supported authentication method, yes. We have integrated with CRMs, project management platforms, accounting software, e-commerce back-ends, email providers, calendar systems, and custom internal tools. The Integration phase is scoped precisely so there are no surprises — if a tool presents a constraint, we identify it in Design, not on day 5.',
  },
  {
    question: 'What is the difference between managed and self-hosted?',
    answer:   'Managed hosting means AtlasAscend maintains the infrastructure — servers, uptime monitoring, updates, and security patches. You interact with the agent; we handle everything underneath. Self-hosted means we deploy the agent to your own server via SSH and hand over full administrative control. Self-hosted is ideal for businesses with strict data governance requirements or an existing infrastructure team. Both options are available at the same price.',
  },
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Hero
        height="medium"
        imageSrc="/images/hero-how-it-works.jpg"
        imageAlt="Two hands sketching a process diagram on white paper"
        headline="From first call to live agent — in 7 days."
        primaryCta={{ label: 'Book a consultation', href: '/book' }}
      />

      {/* ── Process steps ─────────────────────────────────────────────────── */}
      <div className="bg-[var(--color-white)]">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0
          return (
            <section
              key={step.number}
              className="section-spacing border-b border-[var(--color-gray-200)] last:border-0"
              aria-label={`Step ${step.number}`}
            >
              <div className="container">
                <div
                  className={`
                    flex flex-col gap-12
                    md:grid md:grid-cols-[1fr_2fr] md:gap-16 md:items-start
                    ${isEven ? '' : 'md:[&>*:first-child]:order-last'}
                  `}
                >
                  {/* Decorative number + time badge */}
                  <AnimateIn className="flex flex-col gap-6">
                    <span
                      className="text-[var(--color-gray-200)] font-[300] leading-none select-none block"
                      style={{ fontSize: '8rem' }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <EyebrowLabel>Typical time</EyebrowLabel>
                      <span className="text-[11px] font-[500] text-[var(--color-ink)] bg-[var(--color-gray-100)] px-3 py-1 rounded-full">
                        {step.time}
                      </span>
                    </div>
                  </AnimateIn>

                  {/* Content */}
                  <AnimateIn className="flex flex-col gap-8" delay={100}>
                    <div className="flex flex-col gap-4">
                      <EyebrowLabel>Step {step.number}</EyebrowLabel>
                      <h2
                        className="text-[var(--color-ink)] font-[400] leading-tight"
                        style={{ fontSize: 'var(--text-h2)' }}
                      >
                        {step.title}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      {step.body.map((para, i) => (
                        <p key={i} className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Deliverables */}
                    <div className="flex flex-col gap-3">
                      <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-[var(--color-gray-500)]">
                        What you get
                      </p>
                      <ul className="flex flex-col gap-2" role="list">
                        {step.deliverables.map(item => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[0.9375rem] text-[var(--color-ink)]/80"
                          >
                            <span
                              className="mt-[6px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[var(--color-accent)]"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimateIn>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FaqAccordion
        items={faqItems}
        eyebrow="Common questions"
        heading="Everything you need to know before we start."
      />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaSection />
    </>
  )
}
