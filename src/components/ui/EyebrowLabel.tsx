type Props = {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export default function EyebrowLabel({ children, className = '', light = false }: Props) {
  return (
    <p
      className={`
        text-[11px] font-[500] uppercase tracking-[0.1em]
        ${light ? 'text-white/50' : 'text-[var(--color-gray-500)]'}
        ${className}
      `.trim()}
    >
      {children}
    </p>
  )
}
