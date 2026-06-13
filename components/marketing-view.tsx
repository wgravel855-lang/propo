"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { CopyCard } from "@/components/copy-card"
import { Skeleton } from "@/components/skeleton"
import { generateMarketing } from "@/app/actions/ai"
import type { Marketing } from "@/lib/ai/schemas"

const suggestions = ["Portable neck fan", "Collagen creamer", "Resistance bands"]

export function MarketingView() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Marketing | null>(null)

  async function run(query: string) {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      setResult(await generateMarketing(q))
    } catch {
      setError("Couldn't generate copy. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(value)
          }}
          className="rounded-2xl border border-border bg-card p-2 focus-within:border-brand/50"
        >
          <div className="flex items-center gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe the product you want copy for..."
              className="flex-1 bg-transparent px-3 py-2 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!value.trim() || loading}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Generate <ArrowRight className="h-4 w-4" /></>}
            </button>
          </div>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setValue(s)
                run(s)
              }}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-foreground/20 hover:bg-card"
            >
              {s}
            </button>
          ))}
        </div>

        {error && <p className="mt-6 text-sm text-destructive">{error}</p>}
      </div>

      {loading && (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      )}

      {result && !loading && (
        <>
          <h3 className="mx-auto mt-12 mb-4 max-w-5xl text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Generated copy for {result.productName}
          </h3>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {result.assets.map((s) => (
              <CopyCard key={s.label} label={s.label} text={s.text} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
