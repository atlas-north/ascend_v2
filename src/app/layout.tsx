import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['100', '400', '500', '800'],
  variable: '--font-inter',
  display:  'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | AtlasAscend',
    default:  'AtlasAscend — Custom AI agents for your business',
  },
  description: 'Custom AI agents built around your workflows — live in 7 days.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
