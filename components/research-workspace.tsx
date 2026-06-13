"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUp, Gauge, Swords, Flame, Percent, ChevronDown, Bookmark, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScoreRing } from "@/components/score-ring"
import { CopyCard } from "@/components/copy-card"
import { AiInsightsPanel } from "@/components/ai-insights-panel"
import { LogoMark } from "@/components/logo"
import { Skeleton } from "@/components/skeleton"
import { StreamingText } from "@/components/streaming-text"
import { Reveal } from "@/components/reveal"
import { runResearch } from "@/app/actions/ai"
import type { ResearchResult } from "@/lib/ai/schemas"
import { useSaveItem } from "@/components/save-provider"

const iconMap = { gauge: Gauge, swords: Swords, flame: Flame, percent: Percent } as const

function AnalysisItem({ title, body, defaultOpen }: { title: string; body: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3.5 text-left"
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <p className="pb-4 text-sm leading-relaxed text-muted-foreground text-pretty">{body}</p>}
    </div>
  )
}

const thinkingSteps = [
  "Gathering live demand signals",
  "Mapping the competitive landscape",
  "Scoring the opportunity",
]

function ThinkingState() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, thinkingSteps.length - 1)), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-center gap-2">
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand" />
        </span>
        <span className="text-sm text-muted-foreground">{thinkingSteps[step]}…</span>
      </div>
      <div className="flex items-center gap-6 rounded-2xl border border-border bg-card p-8">
        <Skeleton className="h-[132px] w-[132px] rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-44 rounded-2xl" />
    </div>
  )
}

const months = ["", "", "", "", "", "", "", ""]

export function ResearchWorkspace({
  query,
  onReset,
  onNewQuery,
}: {
  query: string
  onReset: () => void
  onNewQuery: (q: string) => void
}) {
  const [followUp, setFollowUp] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ResearchResult | null>(null)
  const { requestSave } = useSaveItem()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setResult(null)
    runResearch(query)
      .then((res) => {
        if (!cancelled) {
          setResult(res)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("I couldn't complete this research. Please try again.")
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [query])

  const maxDemand = result ? Math.max(...result.demandTrend, 1) : 1

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-6 sm:px-10">
          <button
            onClick={onReset}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="New research"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{query}</p>
            <p className="text-xs text-muted-foreground">Research workspace</p>
          </div>
          {result && (
            <button
              onClick={() =>
                requestSave({
                  kind: "product",
                  title: result.productName,
                  subtitle: query,
                  score: String(result.opportunityScore),
                  data: result,
                })
              }
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <Bookmark className="h-3.5 w-3.5" strokeWidth={2} />
              Save
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10">
            {/* Conversational intro */}
            <div className="flex gap-4">
              <LogoMark size={28} />
              <div className="flex-1 pt-0.5">
                {loading ? (
                  <p className="text-[15px] leading-relaxed text-foreground/85 text-pretty">
                    {`Researching "${query}" across live demand, competition, and trend signals…`}
                  </p>
                ) : error ? (
                  <p className="flex items-center gap-2 text-[15px] leading-relaxed text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </p>
                ) : result ? (
                  <StreamingText text={result.summary} className="text-[15px] leading-relaxed text-foreground/85" />
                ) : null}
              </div>
            </div>

            {loading && <ThinkingState />}

            {!loading && result && (
              <>
                {/* Opportunity score */}
                <Reveal delay={0.1}>
                  <section className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-elevated sm:flex-row sm:items-center sm:gap-10">
                    <ScoreRing score={result.opportunityScore} />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground">{result.scoreVerdict}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                        {result.scoreRationale}
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* Key insights */}
                <Reveal delay={0.2}>
                  <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Key insights
                  </h3>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {result.keyInsights.map((k) => {
                      const Icon = iconMap[k.icon] ?? Gauge
                      return (
                        <div key={k.label} className="rounded-xl border border-border bg-card p-4">
                          <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                          <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">{k.value}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{k.label}</p>
                          <p className="mt-2 text-[11px] text-muted-foreground/70">{k.detail}</p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>

                {/* Demand trend */}
                <Reveal delay={0.3}>
                  <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Demand trend
                  </h3>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-end justify-between gap-2">
                      {result.demandTrend.map((v, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-2">
                          <div className="flex h-32 w-full items-end justify-center">
                            <motion.div
                              className="w-full max-w-9 rounded-t-md bg-[var(--color-success)]/70"
                              initial={{ height: 0 }}
                              animate={{ height: `${(v / maxDemand) * 100}%` }}
                              transition={{ duration: 0.5, delay: 0.35 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* AI analysis */}
                <Reveal delay={0.4}>
                  <h3 className="mt-10 mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    AI analysis
                  </h3>
                  <div className="rounded-2xl border border-border bg-card px-6">
                    {result.analysis.map((block, i) => (
                      <AnalysisItem key={block.title} title={block.title} body={block.body} defaultOpen={i === 0} />
                    ))}
                  </div>
                </Reveal>

                {/* Competitors */}
                <Reveal delay={0.5}>
                  <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Competitive landscape
                  </h3>
                  <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    {result.competitors.map((c, i) => (
                      <div
                        key={c.name}
                        className={cn(
                          "flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4",
                          i !== result.competitors.length - 1 && "border-b border-border",
                        )}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.priceRange}</p>
                        </div>
                        <div className="flex-1 text-xs">
                          <span className="text-[var(--color-success)]">Strength: </span>
                          <span className="text-muted-foreground">{c.strength}</span>
                        </div>
                        <div className="flex-1 text-xs">
                          <span className="text-destructive">Gap: </span>
                          <span className="text-muted-foreground">{c.weakness}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Marketing ideas */}
                <Reveal delay={0.6}>
                  <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Marketing ideas
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {result.marketingIdeas.map((idea) => (
                      <CopyCard key={idea.label} label={idea.label} text={idea.text} />
                    ))}
                  </div>
                </Reveal>
              </>
            )}

            {!loading && error && (
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => onNewQuery(query)}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
                >
                  Retry
                </button>
                <button
                  onClick={onReset}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  New search
                </button>
              </div>
            )}

            <div className="h-4" />
          </div>
        </div>

        {/* Follow-up input */}
        <div className="shrink-0 border-t border-border px-6 py-4 sm:px-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const q = followUp.trim()
              if (q) {
                onNewQuery(q)
                setFollowUp("")
              }
            }}
            className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-xl border border-border bg-card p-2 focus-within:border-brand/50"
          >
            <input
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Research another product, niche, or store..."
              className="flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!followUp.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
              aria-label="Send follow-up"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>

      <AiInsightsPanel insights={result?.insights} related={result?.competitors.map((c) => c.name)} />
    </div>
  )
}
