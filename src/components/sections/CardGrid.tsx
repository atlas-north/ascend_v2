import AnimateIn from '@/components/ui/AnimateIn'

type Props = {
  children:    React.ReactNode[]
  columns?:    2 | 3 | 4
  className?:  string
}

const colClass: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export default function CardGrid({ children, columns = 3, className = '' }: Props) {
  return (
    <div className={`grid ${colClass[columns]} gap-6 ${className}`}>
      {children.map((child, i) => (
        <AnimateIn
          key={i}
          delay={i < 4 ? ([0, 100, 200, 300] as const)[i] : 0}
        >
          {child}
        </AnimateIn>
      ))}
    </div>
  )
}
