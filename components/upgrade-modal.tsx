"use client"

import { useEffect, useState } from "react"
import { X, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "For exploring your first product ideas.",
    features: ["10 research queries / mo", "Opportunity scoring", "Save up to 20 items"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For operators researching daily.",
    features: ["Unlimited research", "Store X-Ray & competitor analysis", "Unlimited saved items", "Priority model access"],
    featured: true,
  },
  {
    name: "Team",
    price: "$199",
    description: "For agencies and growing brands.",
    features: ["Everything in Pro", "5 team seats", "Shared workspace", "API access"],
    featured: false,
  },
]

export function UpgradeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener("open-upgrade-modal", handler)
    return () => document.removeEventListener("open-upgrade-modal", handler)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-7 shadow-elevated">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2.2} />
            Upgrade your plan
          </span>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">Research at full speed</h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Unlock unlimited AI research, competitor teardowns, and marketing generation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "flex flex-col rounded-xl border p-5",
                t.featured ? "border-brand bg-secondary/30" : "border-border",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-medium text-brand">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-semibold tracking-tight text-foreground">{t.price}</span>
                <span className="text-xs text-muted-foreground">/mo</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground text-pretty">{t.description}</p>
              <button
                className={cn(
                  "mt-4 rounded-lg px-3 py-2 text-sm font-medium transition-opacity hover:opacity-90",
                  t.featured
                    ? "bg-brand text-brand-foreground"
                    : "border border-border bg-secondary text-foreground",
                )}
              >
                {t.price === "$0" ? "Current plan" : `Choose ${t.name}`}
              </button>
              <ul className="mt-4 space-y-2 border-t border-border pt-4">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2.4} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
