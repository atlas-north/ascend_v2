import AnimateIn from '@/components/ui/AnimateIn'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

export type FaqItem = {
  question: string
  answer:   string
}

type Props = {
  items:    FaqItem[]
  eyebrow?: string
  heading?: string
}

export default function FaqAccordion({
  items,
  eyebrow = 'FAQ',
  heading = 'Common questions',
}: Props) {
  return (
    <section className="section-spacing bg-[var(--color-gray-100)]">
      <div className="container">
        <AnimateIn className="flex flex-col gap-3 mb-12">
          <EyebrowLabel>{eyebrow}</EyebrowLabel>
          <h2
            className="text-[var(--color-ink)] font-[400] leading-tight"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {heading}
          </h2>
        </AnimateIn>

        <div className="max-w-[760px] flex flex-col divide-y divide-[var(--color-gray-200)]">
          {items.map((item, i) => (
            <AnimateIn key={i} delay={i < 4 ? ([0, 100, 200, 300] as const)[i] : 300}>
              <details className="group py-6">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-[var(--color-ink)] text-[1.0625rem] font-[500] leading-snug">
                    {item.question}
                  </span>
                  {/* Plus / minus indicator */}
                  <span
                    className="flex-shrink-0 w-5 h-5 relative text-[var(--color-gray-500)]"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-200 group-open:rotate-45">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-ink)]/75 text-[1rem] leading-[1.75] max-w-[640px]">
                  {item.answer}
                </p>
              </details>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
