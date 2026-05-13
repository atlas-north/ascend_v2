import Link from 'next/link'

type Props = {
  industry:     string
  headline:     string
  resultMetric?: string
  tags?:        string[]
  slug:         string
}

export default function CaseCard({ industry, headline, resultMetric, tags = [], slug }: Props) {
  return (
    <article className="bg-[var(--color-gray-100)] rounded-card p-8 flex flex-col gap-4 hover:bg-[var(--color-gray-200)] transition-colors">
      {/* Industry pill */}
      <span className="self-start text-[11px] font-[500] uppercase tracking-[0.08em] text-[var(--color-gray-500)] bg-white px-3 py-1 rounded-full border border-[var(--color-gray-200)]">
        {industry}
      </span>

      {/* Headline */}
      <h3
        className="text-[var(--color-ink)] font-[400] leading-tight"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
      >
        {headline}
      </h3>

      {/* Result metric */}
      {resultMetric && (
        <p
          className="text-[var(--color-accent)] font-[500] leading-none"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
        >
          {resultMetric}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-[500] uppercase tracking-[0.06em] text-[var(--color-gray-500)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/cases/${slug}`}
        className="text-[14px] font-[500] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors mt-auto"
      >
        Read the case →
      </Link>
    </article>
  )
}
