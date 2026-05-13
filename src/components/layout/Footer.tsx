import Link from 'next/link'

const navLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Capabilities',  href: '/capabilities' },
  { label: 'Cases',         href: '/cases' },
  { label: 'Intelligence',  href: '/intelligence' },
  { label: 'About',         href: '/about' },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { label: 'X',        href: '#', icon: XIcon },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)]">
      <div className="container pt-[60px] pb-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-[500] text-[15px] tracking-[0.14em] hover:opacity-80 transition-opacity flex-shrink-0"
          >
            ATLASASCEND
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/60 text-[14px] hover:text-white/90 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/40 hover:text-white/70 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08] mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[13px] text-white/40">© 2026 AtlasAscend</p>
          <p className="text-[13px] text-white/40">Built by Jonas Bluhme</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Inline SVG icons ────────────────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4l16 16M20 4 4 20"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  )
}
