"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, ArrowUp } from "lucide-react"
import { LogoMark } from "@/components/logo"

const examplePrompts = [
  "Find trending fitness products under $40",
  "Analyze my competitor's best-selling store",
  "What's gaining momentum in home decor?",
]

export function Hero() {
  return (
    <section className="ambient-backdrop relative overflow-hidden px-6 pt-36 pb-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2.2} />
            AI research agent for ecommerce
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Find your next winning product in plain English
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          ProductPulse analyzes live demand, competition, and trend signals, then hands you
          scored opportunities and ready-to-run marketing — just ask.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            Start researching free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </Link>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20"
          >
            See how it works
          </a>
        </motion.div>
      </div>

      {/* Product preview mock */}
      <motion.div
        className="mx-auto mt-16 w-full max-w-3xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="ml-3 text-xs text-muted-foreground">productpulse.ai/app</span>
          </div>
          <div className="space-y-5 p-6 text-left">
            <div className="flex gap-3">
              <LogoMark size={26} />
              <div className="flex-1 pt-0.5">
                <p className="text-sm leading-relaxed text-foreground/85">
                  I analyzed live demand, competition, and trend signals for{" "}
                  <span className="text-foreground">&quot;portable neck fan&quot;</span>. This looks like a
                  strong, under-served opportunity with healthy margins.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-xl border border-border bg-secondary/40 p-5">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand">
                <span className="text-lg font-semibold text-foreground">92</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Strong opportunity</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  High demand · Low competition · Rising momentum · 58% margin
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border p-2">
              <span className="flex-1 px-2 text-sm text-muted-foreground">Ask a follow-up...</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {examplePrompts.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
