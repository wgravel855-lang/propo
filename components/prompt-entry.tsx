"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function PromptEntry({
  placeholder,
  suggestions,
  cta = "Analyze",
}: {
  placeholder: string
  suggestions: string[]
  cta?: string
}) {
  const [value, setValue] = useState("")
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (value.trim()) setSubmitted(value.trim())
        }}
        className="rounded-2xl border border-border bg-card p-2 focus-within:border-foreground/30"
      >
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-2 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-30"
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setValue(s)}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-foreground/20 hover:bg-card"
          >
            {s}
          </button>
        ))}
      </div>

      {submitted && (
        <div className="mt-6 flex gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="h-2 w-2 mt-2 shrink-0 animate-pulse rounded-full bg-[var(--color-success)]" />
          <div>
            <p className="text-sm font-medium text-foreground">Researching “{submitted}”</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
              ProductPulse is gathering live demand, competition, and trend signals. Full results will stream into your
              workspace in a moment.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
