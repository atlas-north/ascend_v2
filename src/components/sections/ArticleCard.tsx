import Link from 'next/link'

type Props = {
  category:    string
  title:       string
  teaser:      string
  slug:        string
  publishedAt?: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

export default function ArticleCard({ category, title, teaser, slug, publishedAt }: Props) {
  return (
    <article className="flex flex-col gap-3 group">
      {/* Meta row */}
      <div className="flex items-center gap-3">
        {publishedAt && (
          <time
            dateTime={publishedAt}
            className="text-[12px] text-[var(--color-gray-500)]"
          >
            {formatDate(publishedAt)}
          </time>
        )}
        {publishedAt && <span className="text-[var(--color-gray-200)]" aria-hidden>·</span>}
        <span className="text-[11px] font-[500] uppercase tracking-[0.08em] text-[var(--color-accent)]">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[var(--color-ink)] font-[400] leading-snug group-hover:text-[var(--color-accent)] transition-colors"
        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
      >
        {title}
      </h3>

      {/* Teaser */}
      <p className="text-[var(--color-ink)]/70 text-[0.9375rem] leading-relaxed line-clamp-2">
        {teaser}
      </p>

      <Link
        href={`/intelligence/${slug}`}
        className="text-[13px] font-[500] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors mt-1"
      >
        Read →
      </Link>
    </article>
  )
}
