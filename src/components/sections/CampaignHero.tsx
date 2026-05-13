import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

type Props = {
  headline:    string
  subheading:  string
  ctaLabel:    string
  ctaHref?:   string
  imageSrc?:  string
  imageAlt?:  string
}

export default function CampaignHero({
  headline,
  subheading,
  ctaLabel,
  ctaHref  = '/book',
  imageSrc = '/images/hero-home.jpg',
  imageAlt = 'AtlasAscend',
}: Props) {
  return (
    <>
      {/* ── Minimal campaign nav ──────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-ink)]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="container flex items-center justify-between h-[var(--nav-height)]">
          <Link
            href="/"
            className="text-white font-[500] text-[15px] tracking-[0.14em] hover:opacity-80 transition-opacity"
          >
            ATLASASCEND
          </Link>
          <Button variant="secondary" size="sm" href={ctaHref}>
            {ctaLabel}
          </Button>
        </div>
      </header>

      {/* ── Full-height hero ──────────────────────────────────────────────── */}
      <section className="relative flex items-center min-h-screen bg-[var(--color-ink)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        <div className="container relative z-10 pt-[var(--nav-height)]">
          <div className="max-w-[800px]">
            <h1
              className="text-white font-[400] leading-[1.1]"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              {headline}
            </h1>
            <p
              className="text-white/80 mt-5 max-w-[560px]"
              style={{ fontSize: '1.2rem', lineHeight: '1.6' }}
            >
              {subheading}
            </p>
            <div className="mt-8">
              <Button variant="secondary" size="lg" href={ctaHref}>
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
