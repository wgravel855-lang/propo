"use client"

import { useState } from "react"
import { ArrowRight, Bookmark, Check, X, Loader2, Building2 } from "lucide-react"
import { Skeleton } from "@/components/skeleton"
import { analyzeStore } from "@/app/actions/ai"
import type { StoreReport } from "@/lib/ai/schemas"
import { useSaveItem } from "@/components/save-provider"

const suggestions = ["aurora-active.com", "homeglow.co", "pureroot.com"]

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  )
}

export function StoreXrayView() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<StoreReport | null>(null)
  const { requestSave } = useSaveItem()

  async function run(query: string) {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError(null)
    setReport(null)
    try {
      const res = await analyzeStore(q)
      setReport(res)
    } catch {
      setError("Couldn't scan that store. Try again.")
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
              placeholder="Paste a Shopify store URL or name to scan..."
              className="flex-1 bg-transparent px-3 py-2 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!value.trim() || loading}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Scan store <ArrowRight className="h-4 w-4" /></>}
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
          <Skeleton className="h-8 w-56" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      )}

      {report && !loading && (
        <div className="mx-auto mt-10 w-full max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted">
                <Building2 className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{report.storeName}</h2>
                <p className="text-sm text-muted-foreground text-pretty">{report.summary}</p>
              </div>
            </div>
            <button
              onClick={() =>
                requestSave({
                  kind: "store",
                  title: report.storeName,
                  subtitle: `${report.estMonthlyRevenue}/mo`,
                  data: report,
                })
              }
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <Bookmark className="h-3.5 w-3.5" />
              Save
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat label="Est. monthly revenue" value={report.estMonthlyRevenue} />
            <Stat label="Est. monthly visits" value={report.estMonthlyVisits} />
            <Stat label="Products" value={report.productCount} />
          </div>

          <h3 className="mt-8 mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Top products
          </h3>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {report.topProducts.map((p, i) => (
              <div
                key={p.name}
                className={cnRow(i, report.topProducts.length)}
              >
                <span className="text-sm font-medium text-foreground">{p.name}</span>
                <span className="text-sm text-muted-foreground">{p.price}</span>
                <span className="text-sm text-[var(--color-success)]">{p.estSales}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--color-success)]">
                Strengths
              </h3>
              <ul className="flex flex-col gap-2">
                {report.strengths.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-destructive">Weaknesses</h3>
              <ul className="flex flex-col gap-2">
                {report.weaknesses.map((w) => (
                  <li key={w} className="flex gap-2 text-sm text-foreground/85">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    {w}
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

function cnRow(i: number, total: number) {
  return `grid grid-cols-3 gap-4 p-4 ${i !== total - 1 ? "border-b border-border" : ""}`
}
