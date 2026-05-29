'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Capabilities',  href: '/capabilities' },
  { label: 'Cases',         href: '/cases' },
  { label: 'Intelligence',  href: '/intelligence' },
  { label: 'About',         href: '/about' },
]

export default function Nav() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when route changes (click on a link)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-ink)]"
      style={{
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'border-color 0.2s ease',
      }}
    >
      <div className="container flex items-center justify-between h-[var(--nav-height)]">
        {/* Logo: pyramid icon + ATLAS thin / ASCEND bold */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M14 2L26 24H2L14 2Z" stroke="#B87333" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            <path d="M14 10L20 22H8L14 10Z" fill="#B87333" opacity="0.3"/>
          </svg>
          <span className="text-[15px] tracking-[0.14em]">
            <span style={{ fontWeight: 100 }}>ATLAS</span>
            <span style={{ fontWeight: 500, letterSpacing: '0.22em' }}>ASCEND</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-white text-[14px] opacity-70 hover:opacity-100 transition-opacity"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="secondary" size="sm" href="/book">
            Book a consultation
          </Button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span
            className="block w-5 h-px bg-white transition-transform duration-200"
            style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-white transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-white transition-transform duration-200"
            style={{ transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className="md:hidden overflow-hidden bg-[var(--color-ink)] transition-all duration-300 ease-in-out"
        style={{ maxHeight: menuOpen ? '400px' : '0' }}
        aria-hidden={!menuOpen}
      >
        <nav className="container flex flex-col pb-6 pt-2 gap-1" aria-label="Mobile navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-white text-[16px] opacity-70 hover:opacity-100 transition-opacity py-3 border-b border-white/[0.06] last:border-0"
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <Button variant="secondary" size="md" href="/book" className="w-full justify-center">
              Book a consultation
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
