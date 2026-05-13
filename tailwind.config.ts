import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:        'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        white:      'var(--color-white)',
        'gray-100': 'var(--color-gray-100)',
        'gray-200': 'var(--color-gray-200)',
        'gray-500': 'var(--color-gray-500)',
        accent:     'var(--color-accent)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero:   ['clamp(2.8rem, 6vw, 5.5rem)', { lineHeight: 'var(--leading-tight)' }],
        h1:     ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: 'var(--leading-tight)' }],
        h2:     ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: 'var(--leading-tight)' }],
        body:   ['1.0625rem',                  { lineHeight: 'var(--leading-body)' }],
        eyebrow: ['11px',                      { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      lineHeight: {
        tight: 'var(--leading-tight)',
        body:  'var(--leading-body)',
      },
      spacing: {
        section: 'var(--space-section)',
        inner:   'var(--space-inner)',
        nav:     'var(--nav-height)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        btn:  'var(--radius-btn)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
      maxWidth: {
        prose:  '680px',
        copy:   '720px',
        hero:   '800px',
        narrow: '560px',
      },
      height: {
        nav: 'var(--nav-height)',
      },
      minHeight: {
        nav: 'var(--nav-height)',
      },
    },
  },
  plugins: [],
}

export default config
