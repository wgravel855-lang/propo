"use client"

import { useState } from "react"
import { ArrowUp, Compass, ScanSearch, Building2, TrendingUp } from "lucide-react"
import { LogoMark } from "@/components/logo"

const examples = [
  { label: "Find trending fitness products", icon: TrendingUp },
  { label: "Analyze portable blenders", icon: ScanSearch },
  { label: "Scan this Shopify store", icon: Building2 },
  { label: "Discover low competition opportunities", icon: Compass },
]

export function SearchHome({ onSubmit }: { onSubmit: (q: string) => void }) {
  const [value, setValue] = useState("")

  const submit = (q: string) => {
    const trimmed = q.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <div className="ambient-backdrop flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-elevated">
            <LogoMark size={30} />
          </div>
          <p className="mb-3 text-sm text-muted-foreground">Good afternoon, Jordan</p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What would you like to research?
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(value)
          }}
          className="w-full"
        >
          <div className="group rounded-2xl border border-border bg-card p-2 shadow-elevated transition-colors focus-within:border-brand/50">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  submit(value)
                }
              }}
              rows={3}
              placeholder="Describe a product, niche, or store you'd like to research..."
              className="w-full resize-none bg-transparent px-3 py-2 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="px-2 text-xs text-muted-foreground">
                ProductPulse researches live market signals
              </span>
              <button
                type="submit"
                disabled={!value.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
                aria-label="Research"
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => submit(ex.label)}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 text-left text-sm text-foreground/80 transition-colors hover:border-brand/40 hover:bg-card"
            >
              <ex.icon
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                strokeWidth={2}
              />
              <span className="text-pretty">{ex.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
