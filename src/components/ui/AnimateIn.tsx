'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  delay?: 0 | 100 | 200 | 300
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function AnimateIn({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const ref  = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // @ts-expect-error — Tag is a valid intrinsic element
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
