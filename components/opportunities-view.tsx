"use client"

import { useEffect, useState } from "react"
import { Bookmark, Search, Loader2 } from "lucide-react"
import { LevelBadge } from "@/components/level-badge"
import { Skeleton } from "@/components/skeleton"
import { findOpportunities } from "@/app/actions/ai"
import type { Opportunities } from "@/lib/ai/schemas"
import { useSaveItem } from "@/components/save-provider"

export function OpportunitiesView() {
  const [niche, setNiche] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Opportunities["opportunities"]>([])
  const { requestSave } = useSaveItem()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    findOpportunities(niche)
      .then((res) => {
        if (!cancelled) {
          setData(res.opportunities)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load opportunities. Try again.")
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [niche])

  return (
    <div className="px-6 py-6 sm:px-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setNiche(input.trim())
        }}
        className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card p-2 focus-within:border-brand/50"
      >
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Filter by niche, e.g. 'home fitness' or 'pet products'..."
          className="flex-1 bg-transparent px-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          Find
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3.5 font-medium">Product</th>
              <th className="px-5 py-3.5 font-medium">Score</th>
              <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Demand</th>
              <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Competition</th>
              <th className="hidden px-5 py-3.5 font-medium md:table-cell">Momentum</th>
              <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Margin</th>
              <th className="px-5 py-3.5 font-medium text-right">Save</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4" colSpan={7}>
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              : data.map((op) => (
                  <tr key={op.product} className="transition-colors hover:bg-secondary/40">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{op.product}</p>
                      <p className="text-xs text-muted-foreground">{op.category}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{op.score}</span>
                        <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-secondary sm:block">
                          <div
                            className="h-full rounded-full bg-[var(--color-success)]"
                            style={{ width: `${op.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 sm:table-cell">
                      <LevelBadge level={op.demand} />
                    </td>
                    <td className="hidden px-5 py-4 sm:table-cell">
                      <LevelBadge level={op.competition} invert />
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <span className="text-[var(--color-success)]">{op.trend}</span>
                    </td>
                    <td className="hidden px-5 py-4 lg:table-cell text-muted-foreground">{op.margin}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          requestSave({
                            kind: "product",
                            title: op.product,
                            subtitle: op.category,
                            score: String(op.score),
                            data: op,
                          })
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        aria-label={`Save ${op.product}`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          ProductPulse is scanning the market{niche ? ` for "${niche}"` : ""}…
        </p>
      )}
    </div>
  )
}
