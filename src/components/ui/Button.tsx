import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:   'bg-[var(--color-ink)] text-[var(--color-white)] hover:opacity-90',
  secondary: 'bg-[var(--color-white)] text-[var(--color-ink)] hover:opacity-90',
  outline:   'bg-transparent text-[var(--color-white)] border border-white/60 hover:border-white/100',
}

const sizeClasses: Record<Size, string> = {
  sm:  'px-4 py-2 text-[13px]',
  md:  'px-[18px] py-2 text-[14px]',
  lg:  'px-6 py-3 text-[15px]',
}

const base = 'inline-flex items-center justify-center rounded-btn font-[500] tracking-[0.02em] transition-[opacity,border-color] duration-[var(--transition)] whitespace-nowrap'

type SharedProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type AsButton = SharedProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type AsLink   = SharedProps & { href: string }     & AnchorHTMLAttributes<HTMLAnchorElement>
type Props    = AsButton | AsLink

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: Props) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsLink
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
