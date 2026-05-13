type Stat = {
  value:    string
  label:    string
}

const stats: Stat[] = [
  { value: '7 days',      label: 'From consultation to live agent' },
  { value: '24/7',        label: 'Never sleeps, never stops' },
  { value: '100% custom', label: 'No templates. Ever.' },
]

export default function StatsBar() {
  return (
    <div className="bg-[var(--color-ink-soft)]">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map(({ value, label }) => (
            <div
              key={value}
              className="flex flex-col gap-1 py-8 sm:px-8 first:pl-0 last:pr-0"
            >
              <span
                className="text-white font-[500] leading-none"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                {value}
              </span>
              <span className="text-white/50 text-[14px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
