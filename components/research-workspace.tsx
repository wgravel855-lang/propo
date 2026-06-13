"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowUp,
  Gauge,
  Swords,
  Flame,
  Percent,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScoreRing } from "@/components/score-ring"
import { Sparkline } from "@/components/sparkline"
import { CopyCard } from "@/components/copy-card"
import { AiInsightsPanel } from "@/components/ai-insights-panel"
import { LogoMark } from "@/components/logo"
import { Skeleton } from "@/components/skeleton"
import { StreamingText } from "@/components/streaming-text"
import { Reveal } from "@/components/reveal"

const keyInsights = [
  { label: "Demand level", value: "High", detail: "8.2K monthly searches", icon: Gauge },
  { label: "Competition", value: "Low", detail: "11 active sellers", icon: Swords },
  { label: "Trend momentum", value: "+38%", detail: "90-day growth", icon: Flame },
  { label: "Est. margin", value: "62%", detail: "$24.90 retail", icon: Percent },
]

const analysisBlocks = [
  {
    title: "Why this is an opportunity",
    body: "Demand for personal cooling products has accelerated sharply over the past two seasons, yet the segment remains fragmented with no dominant brand. Search volume is strong and rising while the number of established sellers stays low, which is the classic signature of an underserved niche. Margins hold up well because manufacturing costs are low relative to the perceived value of a convenience product.",
  },
  {
    title: "Competitive landscape",
    body: "Most current listings compete on price alone and present weak branding, generic imagery, and thin product education. A seller who leads with a clear point of view — quiet operation, battery life, and a premium unboxing — can command a higher price point and capture the segment of buyers who are not shopping on price.",
  },
  {
    title: "Risks to watch",
    body: "Demand is partially seasonal, so plan inventory around warm-weather peaks and diversify with adjacent products to smooth revenue. Watch for a flood of low-cost entrants if the category continues to surge; defensibility will come from brand and content rather than the product itself.",
  },
]

const marketingIdeas = [
  {
    label: "Ad hook",
    text: "Stay cool anywhere — the hands-free neck fan that runs all day on a single charge. No sweat, no noise, no excuses.",
  },
  {
    label: "Product title",
    text: "BreezeLoop Pro — Bladeless Portable Neck Fan with 16-Hour Battery & 3 Whisper-Quiet Speeds",
  },
  {
    label: "Email subject",
    text: "It's about to get hot — here's how to stay cool (hands-free)",
  },
  {
    label: "Value proposition",
    text: "Designed for commuters, parents, and anyone who refuses to overheat. Lightweight, bladeless, and quiet enough to wear at your desk.",
  },
]

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
    const id = setInterval(() => setStep((s) => Math.min(s + 1, thinkingSteps.length - 1)), 420)
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

const demandSeries = [22, 28, 31, 40, 52, 61, 70, 78]
const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]

export function ResearchWorkspace({ query, onReset }: { query: string; onReset: () => void }) {
  const [followUp, setFollowUp] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(id)
  }, [query])

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
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{query}</p>
            <p className="text-xs text-muted-foreground">Research workspace</p>
          </div>
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
                ) : (
                  <StreamingText
                    text={`I analyzed live demand, competition, and trend signals for "${query}". Here's what stands out — this looks like a strong, under-served opportunity with healthy margins and rising momentum.`}
                    className="text-[15px] leading-relaxed text-foreground/85"
                  />
                )}
              </div>
            </div>

            {loading ? (
              <ThinkingState />
            ) : (
              <>
            {/* Opportunity score */}
            <Reveal delay={0.15}>
              <section className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-elevated sm:flex-row sm:items-center sm:gap-10">
                <ScoreRing score={92} />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">Strong opportunity</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                    Portable Neck Fan scores in the top tier across our model. High demand, low competition, and
                    consistent upward momentum make this a candidate worth testing now.
                  </p>
                </div>
              </section>
            </Reveal>

            {/* Key insights */}
            <Reveal delay={0.25}>
              <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Key insights
              </h3>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {keyInsights.map((k) => (
                  <div key={k.label} className="rounded-xl border border-border bg-card p-4">
                    <k.icon className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                    <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">{k.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{k.label}</p>
                    <p className="mt-2 text-[11px] text-muted-foreground/70">{k.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Data visualization */}
            <Reveal delay={0.35}>
              <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Demand trend
              </h3>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-end justify-between gap-2">
                  {demandSeries.map((v, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-32 w-full items-end justify-center">
                        <motion.div
                          className="w-full max-w-9 rounded-t-md bg-[var(--color-success)]/70"
                          initial={{ height: 0 }}
                          animate={{ height: `${(v / 80) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.45 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* AI analysis */}
            <Reveal delay={0.45}>
            <h3 className="mt-10 mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              AI analysis
            </h3>
            <div className="rounded-2xl border border-border bg-card px-6">
              {analysisBlocks.map((block, i) => (
                <AnalysisItem key={block.title} title={block.title} body={block.body} defaultOpen={i === 0} />
              ))}
            </div>
            </Reveal>

            {/* Store analysis */}
            <Reveal delay={0.55}>
            <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Store analysis
            </h3>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Aurora Active</p>
                  <p className="text-xs text-muted-foreground">Top seller in this category</p>
                </div>
                <Sparkline data={[30, 36, 40, 44, 50, 58, 64]} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {[
                  { label: "Strength", value: 81 },
                  { label: "Weakness", value: 34 },
                  { label: "Opportunity", value: 67 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                      <span className="text-xs font-medium text-foreground">{m.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-foreground/60" style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>

            {/* Marketing ideas */}
            <Reveal delay={0.65}>
            <h3 className="mt-10 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Marketing ideas
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {marketingIdeas.map((idea) => (
                <CopyCard key={idea.label} label={idea.label} text={idea.text} />
              ))}
            </div>
            </Reveal>
              </>
            )}

            <div className="h-4" />
          </div>
        </div>

        {/* Follow-up input */}
        <div className="shrink-0 border-t border-border px-6 py-4 sm:px-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setFollowUp("")
            }}
            className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-xl border border-border bg-card p-2 focus-within:border-brand/50"
          >
            <input
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Ask a follow-up about this opportunity..."
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

      <AiInsightsPanel />
    </div>
  )
}
