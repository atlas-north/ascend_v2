import Button from '@/components/ui/Button'
import AnimateIn from '@/components/ui/AnimateIn'

type Props = {
  variant?: 'dark' | 'light'
  heading?: string
  body?:    string
  cta?:     { label: string; href: string }
}

export default function CtaSection({
  variant = 'dark',
  heading = 'Your AI is one conversation away.',
  body    = 'Book a free 30-minute call. Jonas personally responds.',
  cta     = { label: 'Book a free consultation', href: '/book' },
}: Props) {
  const isDark = variant === 'dark'

  return (
    <section
      className="section-spacing"
      style={{ background: isDark ? 'var(--color-ink-soft)' : 'var(--color-gray-100)' }}
    >
      <div className="container">
        <AnimateIn className="flex flex-col items-center text-center gap-6 max-w-[640px] mx-auto">
          <h2
            className={`font-[400] leading-tight ${isDark ? 'text-white' : 'text-[var(--color-ink)]'}`}
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {heading}
          </h2>
          <p
            className={`text-[1.0625rem] ${isDark ? 'text-white/70' : 'text-[var(--color-ink)]/70'}`}
          >
            {body}
          </p>
          <Button
            variant={isDark ? 'secondary' : 'primary'}
            size="lg"
            href={cta.href}
          >
            {cta.label}
          </Button>
        </AnimateIn>
      </div>
    </section>
  )
}
