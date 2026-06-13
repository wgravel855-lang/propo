"use client"

import { motion } from "framer-motion"
import { Compass, ScanSearch, Building2, TrendingUp, Sparkles } from "lucide-react"

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-brand">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

function Card({
  icon: Icon,
  title,
  body,
  className = "",
  children,
}: {
  icon: typeof Compass
  title: string
  body: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 ${className}`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {children}
    </div>
  )
}

export function FeatureBento() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="A full research team, available on demand"
          description="Ask in plain language. ProductPulse runs the analysis a team of analysts would, and returns decisions you can act on."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal>
            <Card
              icon={Compass}
              title="Opportunity Finder"
              body="Surface scored, under-served product niches with demand, competition, and margin signals weighed for you."
              className="h-full"
            >
              <div className="mt-5 flex items-end gap-1.5">
                {[40, 55, 48, 70, 82, 76, 94].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-brand/70" style={{ height: `${h * 0.5}px` }} />
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card
              icon={ScanSearch}
              title="Product Analyzer"
              body="Paste any product and get an instant opportunity score, pricing read, and a launch-readiness verdict."
              className="h-full"
            >
              <div className="mt-5 flex items-center gap-4 rounded-xl border border-border bg-secondary/40 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand text-sm font-semibold text-foreground">
                  88
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-24 rounded bg-muted" />
                  <div className="h-2 w-16 rounded bg-muted" />
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Building2}
              title="Store X-Ray"
              body="Reverse-engineer any competitor's catalog, best-sellers, and pricing strategy in seconds."
              className="h-full"
            >
              <div className="mt-5 space-y-2">
                {["Best-seller velocity", "Avg. order value", "Catalog depth"].map((r) => (
                  <div key={r} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                    <span className="text-xs text-muted-foreground">{r}</span>
                    <span className="h-1.5 w-12 rounded bg-brand/60" />
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card
              icon={TrendingUp}
              title="Trend Discovery"
              body="Catch rising categories before they saturate, with momentum scoring across search and social demand."
              className="h-full md:col-span-2"
            >
              <div className="mt-5 flex h-24 items-end gap-1">
                {Array.from({ length: 28 }).map((_, i) => {
                  const h = 20 + Math.sin(i / 3) * 18 + i * 1.6
                  return <div key={i} className="flex-1 rounded-t bg-brand/50" style={{ height: `${h}%` }} />
                })}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Sparkles}
              title="Marketing Generator"
              body="Turn any opportunity into ready-to-run ad copy, product descriptions, and email hooks."
              className="h-full"
            >
              <div className="mt-5 space-y-2">
                {["Ad headline", "Product description", "Email subject"].map((r) => (
                  <div key={r} className="rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground">
                    {r}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
