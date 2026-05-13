'use client'

import { useState } from 'react'
import CaseCard from '@/components/sections/CaseCard'

export type CaseItem = {
  id:           string
  industry:     string
  headline:     string
  resultMetric?: string
  tags:         string[]
  slug:         string
}

type FilterValue = 'all' | 'automation' | 'intelligence' | 'integration'

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All',           value: 'all' },
  { label: 'Automation',    value: 'automation' },
  { label: 'Intelligence',  value: 'intelligence' },
  { label: 'Integration',   value: 'integration' },
]

type Props = { cases: CaseItem[] }

export default function CasesGrid({ cases }: Props) {
  const [active, setActive] = useState<FilterValue>('all')

  const visible = active === 'all'
    ? cases
    : cases.filter(c => c.tags.includes(active))

  return (
    <section className="section-spacing bg-[var(--color-white)]">
      <div className="container flex flex-col gap-10">

        {/* Filter bar */}
        <div
          role="group"
          aria-label="Filter cases by category"
          className="flex flex-wrap gap-2"
        >
          {filters.map(({ label, value }) => {
            const isActive = active === value
            return (
              <button
                key={value}
                onClick={() => setActive(value)}
                aria-pressed={isActive}
                className={`
                  px-4 py-2 rounded-btn text-[13px] font-[500] tracking-[0.02em]
                  transition-colors duration-[var(--transition)]
                  ${isActive
                    ? 'bg-[var(--color-ink)] text-white'
                    : 'bg-transparent text-[var(--color-ink)] border border-[var(--color-gray-200)] hover:border-[var(--color-ink)]/30'
                  }
                `}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(c => (
            <div
              key={c.id}
              className="transition-opacity duration-300"
              style={{ opacity: 1 }}
            >
              <CaseCard
                industry={c.industry}
                headline={c.headline}
                resultMetric={c.resultMetric}
                tags={c.tags}
                slug={c.slug}
              />
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-[var(--color-gray-500)] text-[1rem] py-8">
            No cases in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
