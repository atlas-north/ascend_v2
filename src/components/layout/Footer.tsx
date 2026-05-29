import Link from 'next/link'

/* ─── Link data ───────────────────────────────────────────────────────────── */

const legalLinks = [
  { label: 'Privacy Policy',      href: '/privacy' },
  { label: 'Data Management',     href: '/data-management' },
  { label: 'Terms & Conditions',  href: '/terms' },
  { label: 'Cookie Policy',       href: '/cookies' },
  { label: 'GDPR Compliance',     href: '/gdpr' },
]

const quickLinks = [
  { label: 'FAQ',          href: '/faq' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Cases',        href: '/cases' },
  { label: 'Book a Call',  href: '/book' },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { label: 'X',        href: '#', icon: XIcon },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)]">
      <div className="container pt-[80px] pb-10">
        {/* ── Top: Logo + social ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <Link
            href="/"
            className="text-white font-[500] text-[15px] tracking-[0.14em] hover:opacity-80 transition-opacity"
          >
            ATLASASCEND
          </Link>

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

        {/* ── Menu columns ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
          {/* Column 1 — Legal / Required pages */}
          <div>
            <h3 className="text-white/40 text-[11px] tracking-[0.12em] uppercase mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 text-[14px] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="text-white/40 text-[11px] tracking-[0.12em] uppercase mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 text-[14px] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.08] mb-6" />

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[13px] text-white/40">© {new Date().getFullYear()} AtlasAscend</p>
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
