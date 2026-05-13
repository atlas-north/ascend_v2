import type { Metadata } from 'next'

import Hero       from '@/components/sections/Hero'
import CtaSection from '@/components/sections/CtaSection'
import AnimateIn  from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Capabilities',
  description: 'Custom agent design, flexible hosting, business intelligence, and workflow automation — everything your AI agent needs to run your business.',
  openGraph: {
    title:       'Capabilities | AtlasAscend',
    description: 'Everything your AI agent needs to run your business.',
    images:      ['/images/hero-capabilities.jpg'],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/images/hero-capabilities.jpg'],
  },
}

/* ─── Capability data ─────────────────────────────────────────────────────── */

const capabilities = [
  {
    eyebrow:  'Capability 01',
    headline: 'An agent that knows your business — not just your prompt.',
    body: [
      'Generic AI tools respond to whatever you type. Atlas is different — it is trained on the specific context of your business, your workflows, your terminology, and your decision-making patterns. The result is an agent that does not need to be re-explained every conversation.',
      'The OpenClaw orchestration layer manages how the agent sequences tasks, handles ambiguity, and escalates to you when a decision falls outside its defined scope. It is the difference between a tool you use and a system that works for you.',
    ],
    features: [
      'Workflow-specific training',
      'OpenClaw orchestration layer',
      'Multi-step reasoning chains',
      'Custom memory and context management',
      'Designed for your team structure',
    ],
    subNote: null,
  },
  {
    eyebrow:  'Capability 02',
    headline: 'Your data. Your infrastructure. Your choice.',
    body: [
      'Where your agent runs and who has access to its data should be a decision you make, not one made for you by a SaaS vendor. AtlasAscend offers two deployment options — managed hosting in EU data centres, or full self-hosted deployment via SSH handover — with no difference in capability between the two.',
      'GDPR compliance is not a checkbox on our end. It is a design constraint. No data processed by your agent is shared with third parties, used for model training, or stored beyond the retention period you define.',
    ],
    features: [
      'Managed hosting in EU data centres',
      'Self-hosted via SSH handover',
      'Full data sovereignty',
      'No third-party data sharing',
      'GDPR-compliant by design',
    ],
    subNote: 'Both hosting options are available at the same price.',
  },
  {
    eyebrow:  'Capability 03',
    headline: 'Your agent reports to you — every day.',
    body: [
      'Most businesses do not lack data. They lack synthesis. Your Atlas agent monitors the metrics that matter to your operations and delivers a structured daily briefing — not a dashboard you have to open, but a concise summary pushed directly to your inbox or messaging channel each morning.',
      'Beyond daily briefings, the agent tracks KPI thresholds in real time. When an expense exceeds its budget, a key metric drops below its baseline, or an anomaly appears in your data, you are notified before it becomes a problem — not after.',
    ],
    features: [
      'Daily briefing summaries',
      'KPI tracking and threshold alerts',
      'Expense and invoice monitoring',
      'Custom report generation',
      'Anomaly detection on key metrics',
    ],
    subNote: null,
  },
  {
    eyebrow:  'Capability 04',
    headline: 'Sequences that run while you sleep.',
    body: [
      'Workflow automation at the Atlas level is not about replacing a single repetitive task. It is about encoding entire operational sequences — the kind that currently require a human to initiate, monitor, and close each step. Multi-step task chains run end-to-end, with conditional logic and exception handling built in from the start.',
      'When a step requires human approval, the agent pauses and requests it via your preferred channel. When cross-platform synchronisation is needed — between your CRM, your project tool, and your calendar — the agent handles it without you acting as the connector.',
    ],
    features: [
      'Multi-step task chains',
      'Approval and escalation workflows',
      'Cross-platform synchronisation',
      'ClickUp productivity structure addon',
      'Natural-language task creation',
    ],
    subNote: null,
  },
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function CapabilitiesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Hero
        height="medium"
        imageSrc="/images/hero-capabilities.jpg"
        imageAlt="Server infrastructure in a data centre, long exposure lighting"
        headline="What your agent can do for your business."
        primaryCta={{ label: 'Book a consultation', href: '/book' }}
      />

      {/* ── Capability deep-dives ─────────────────────────────────────────── */}
      <div className="bg-[var(--color-white)]">
        {capabilities.map((cap, index) => {
          const isEven = index % 2 === 0
          return (
            <section
              key={cap.eyebrow}
              className="section-spacing border-b border-[var(--color-gray-200)] last:border-0"
              aria-label={cap.eyebrow}
            >
              <div className="container">
                <div
                  className={`
                    flex flex-col gap-12
                    md:grid md:grid-cols-2 md:gap-20 md:items-start
                    ${isEven ? '' : 'md:[&>*:first-child]:order-last'}
                  `}
                >
                  {/* Left column: eyebrow + headline + body + sub-note */}
                  <AnimateIn className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <EyebrowLabel>{cap.eyebrow}</EyebrowLabel>
                      <h2
                        className="text-[var(--color-ink)] font-[400] leading-tight"
                        style={{ fontSize: 'var(--text-h2)' }}
                      >
                        {cap.headline}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      {cap.body.map((para, i) => (
                        <p key={i} className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                          {para}
                        </p>
                      ))}
                    </div>

                    {cap.subNote && (
                      <p className="text-[0.9375rem] text-[var(--color-gray-500)] italic border-l-2 border-[var(--color-gray-200)] pl-4">
                        {cap.subNote}
                      </p>
                    )}
                  </AnimateIn>

                  {/* Right column: feature list */}
                  <AnimateIn delay={100} className="flex flex-col gap-4 md:pt-[3.5rem]">
                    <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-[var(--color-gray-500)]">
                      What's included
                    </p>
                    <ul className="flex flex-col divide-y divide-[var(--color-gray-200)]" role="list">
                      {cap.features.map((feature, i) => (
                        <li
                          key={feature}
                          className="flex items-center gap-4 py-4 first:pt-0"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          <span
                            className="flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[var(--color-accent)]"
                            aria-hidden="true"
                          />
                          <span className="text-[1rem] text-[var(--color-ink)]/85">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AnimateIn>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* ── Platform section ──────────────────────────────────────────────── */}
      <section className="section-spacing bg-[var(--color-gray-100)]">
        <div className="container flex flex-col gap-12">
          <AnimateIn className="flex flex-col gap-3">
            <EyebrowLabel>The engine</EyebrowLabel>
            <h2
              className="text-[var(--color-ink)] font-[400] leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              Powered by Atlas.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Atlas */}
            <AnimateIn className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-[var(--color-gray-500)]">
                  Atlas
                </p>
                <h3
                  className="text-[var(--color-ink)] font-[400] leading-tight"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
                >
                  The orchestrator at the centre of everything.
                </h3>
              </div>
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                Atlas is not a chatbot or a prompt interface. It is an orchestration layer — a
                system that coordinates multiple reasoning steps, tool calls, and data sources to
                complete complex, multi-stage tasks without human intervention at each step. Where
                a prompt-based tool requires you to drive every interaction, Atlas drives the
                workflow itself.
              </p>
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                The architecture is built around persistent context — Atlas remembers what it has
                done, what decisions were made, and what the current state of your workflows looks
                like. This is what allows it to pick up where it left off, handle exceptions
                gracefully, and report back to you with substance rather than status updates.
              </p>
            </AnimateIn>

            {/* OpenClaw */}
            <AnimateIn delay={100} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-[var(--color-gray-500)]">
                  OpenClaw
                </p>
                <h3
                  className="text-[var(--color-ink)] font-[400] leading-tight"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
                >
                  The framework that keeps the agent in scope.
                </h3>
              </div>
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                OpenClaw is the configuration and constraint framework built on top of Atlas. It
                defines the agent's scope — what it can do autonomously, what requires approval,
                and what it will never do regardless of instruction. Every agent deployed by
                AtlasAscend is configured through OpenClaw, which is why behaviour is predictable
                and auditable from day one.
              </p>
              <p className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75]">
                OpenClaw also manages the integration layer — abstracting the complexity of
                connecting to multiple external APIs so that the agent's reasoning logic stays
                clean and the integration layer stays replaceable. When a tool changes its API or
                you switch providers, OpenClaw handles the update without touching the core agent
                behaviour.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaSection />
    </>
  )
}
