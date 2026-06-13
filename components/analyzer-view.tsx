"use client"

import { useState } from "react"
import { ArrowRight, Bookmark, Check, X, Loader2 } from "lucide-react"
import { ScoreRing } from "@/components/score-ring"
import { Skeleton } from "@/components/skeleton"
import { analyzeProduct } from "@/app/actions/ai"
import type { Analyzer } from "@/lib/ai/schemas"
import { useSaveItem } from "@/components/save-provider"

const suggestions = ["Portable blender", "Collagen creamer", "Posture corrector", "LED sunset projector"]

export function AnalyzerView() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<Analyzer | null>(null)
  const { requestSave } = useSaveItem()

  async function run(query: string) {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError(null)
    setReport(null)
    try {
      setReport(await analyzeProduct(q))
    } catch {
      setError("Couldn't analyze that product. Try again.")
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
              placeholder="Enter a product name or paste a product URL..."
              className="flex-1 bg-transparent px-3 py-2 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!value.trim() || loading}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Analyze <ArrowRight className="h-4 w-4" /></>}
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
        <div className="mx-auto mt-10 w-full max-w-3xl space-y-4">
          <Skeleton className="h-40 rounded-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-44 rounded-2xl" />
            <Skeleton className="h-44 rounded-2xl" />
          </div>
        </div>
      )}

      {report && !loading && (
        <div className="mx-auto mt-10 w-full max-w-3xl">
          <section className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-elevated sm:flex-row">
            <ScoreRing score={report.viabilityScore} />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">{report.productName}</h2>
                  <p className="text-sm font-medium text-brand">{report.verdict}</p>
                </div>
                <button
                  onClick={() =>
                    requestSave({
                      kind: "product",
                      title: report.productName,
                      subtitle: report.verdict,
                      score: String(report.viabilityScore),
                      data: report,
                    })
                  }
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  Save
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{report.summary}</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <span>
                  <span className="text-muted-foreground">Suggested price: </span>
                  <span className="font-medium text-foreground">{report.suggestedPrice}</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Target: </span>
                  <span className="font-medium text-foreground">{report.targetAudience}</span>
                </span>
              </div>
            </div>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--color-success)]">Pros</h3>
              <ul className="flex flex-col gap-2">
                {report.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-destructive">Cons</h3>
              <ul className="flex flex-col gap-2">
                {report.cons.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-foreground/85">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
