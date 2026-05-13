import Image from 'next/image'
import Button from '@/components/ui/Button'
import EyebrowLabel from '@/components/ui/EyebrowLabel'

type Props = {
  headline:      string
  subheading?:   string
  eyebrow?:      string
  primaryCta:    { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageSrc:      string
  imageAlt:      string
  height?:       'full' | 'medium' | 'short'
}

const heightClass = {
  full:   'min-h-screen',
  medium: 'min-h-[65vh]',
  short:  'min-h-[40vh]',
}

export default function Hero({
  headline,
  subheading,
  eyebrow,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  height = 'full',
}: Props) {
  const lines = headline.split('\n')

  return (
    <section
      className={`relative flex items-center ${heightClass[height]} bg-[var(--color-ink)]`}
      aria-label={eyebrow ?? 'Hero'}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Content */}
      <div className="container relative z-10 pt-[var(--nav-height)]">
        <div className="max-w-[800px] text-left">
          {eyebrow && (
            <EyebrowLabel light className="mb-4">
              {eyebrow}
            </EyebrowLabel>
          )}

          <h1
            className="text-white font-[400] leading-[1.1]"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            {lines.map((line, i) => (
              <span key={i} className={i < lines.length - 1 ? 'block' : undefined}>
                {line}
              </span>
            ))}
          </h1>

          {subheading && (
            <p
              className="text-white/80 mt-4 max-w-[560px]"
              style={{ fontSize: '1.2rem', lineHeight: '1.6' }}
            >
              {subheading}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-8">
            <Button variant="secondary" size="lg" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button variant="outline" size="lg" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
