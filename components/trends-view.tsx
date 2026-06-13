"use client"

import { useEffect, useState } from "react"
import { Bookmark, Search, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/skeleton"
import { discoverTrends } from "@/app/actions/ai"
import type { Trends } from "@/lib/ai/schemas"
import { useSaveItem } from "@/components/save-provider"

const stageTone: Record<string, string> = {
  Emerging: "bg-[var(--color-chart-2)]/12 text-[var(--color-chart-2)]",
  Rising: "bg-[var(--color-success)]/12 text-[var(--color-success)]",
  Peaking: "bg-[var(--color-warning)]/12 text-[var(--color-warning)]",
  Mature: "bg-muted text-muted-foreground",
}

export function TrendsView() {
  const [category, setCategory] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Trends["trends"]>([])
  const { requestSave } = useSaveItem()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    discoverTrends(category)
      .then((res) => {
        if (!cancelled) {
          setData(res.trends)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load trends. Try again.")
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [category])

  return (
    <div className="px-6 py-6 sm:px-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setCategory(input.trim())
        }}
        className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card p-2 focus-within:border-brand/50"
      >
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Explore a category, e.g. 'beauty', 'kitchen gadgets'..."
          className="flex-1 bg-transparent px-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          Discover
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)
          : data.map((trend) => (
              <div
                key={trend.name}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">{trend.name}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          stageTone[trend.stage] ?? "bg-muted text-muted-foreground",
                        )}
                      >
                        {trend.stage}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{trend.category}</p>
                  </div>
                  <button
                    onClick={() =>
                      requestSave({
                        kind: "trend",
                        title: trend.name,
                        subtitle: `${trend.category} · ${trend.growth}`,
                        data: trend,
                      })
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label={`Save ${trend.name}`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{trend.summary}</p>

                <div className="mt-1 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 font-medium text-[var(--color-success)]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {trend.growth}
                  </span>
                  <span className="text-muted-foreground">{trend.volume}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
