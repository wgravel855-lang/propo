"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/mo",
    description: "For exploring your first product ideas.",
    features: ["10 research queries / mo", "Opportunity scoring", "Trend discovery", "Save up to 20 items"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    cadence: "/mo",
    description: "For operators researching daily.",
    features: [
      "Unlimited research queries",
      "Store X-Ray & competitor analysis",
      "Marketing generator",
      "Unlimited saved items",
      "Priority model access",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Team",
    price: "$199",
    cadence: "/mo",
    description: "For agencies and growing brands.",
    features: ["Everything in Pro", "5 team seats", "Shared research workspace", "API access", "Dedicated support"],
    cta: "Contact sales",
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-brand">Pricing</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simple pricing that scales with you
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Start free, no credit card required. Upgrade when you&apos;re ready to research at full speed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                t.featured ? "border-brand bg-card shadow-elevated" : "border-border bg-card",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold tracking-tight text-foreground">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-full bg-brand-muted px-2.5 py-0.5 text-[11px] font-medium text-brand">
                    Most popular
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-foreground">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>

              <Link
                href="/app"
                className={cn(
                  "mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90",
                  t.featured
                    ? "bg-brand text-brand-foreground"
                    : "border border-border bg-secondary text-foreground hover:border-foreground/20",
                )}
              >
                {t.cta}
              </Link>

              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.4} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
