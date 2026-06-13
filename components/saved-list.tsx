"use client"

import { useState } from "react"
import { Package, Building2, TrendingUp, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { deleteSavedItem } from "@/app/actions/saved"

const typeIcon: Record<string, typeof Package> = {
  product: Package,
  store: Building2,
  trend: TrendingUp,
}

type Item = {
  id: number
  kind: string
  title: string
  subtitle: string | null
  score: string | null
  createdAt: Date
}

export function SavedList({ items }: { items: Item[] }) {
  const [list, setList] = useState(items)
  const [removing, setRemoving] = useState<number | null>(null)

  async function remove(id: number) {
    setRemoving(id)
    try {
      await deleteSavedItem(id)
      setList((prev) => prev.filter((i) => i.id !== id))
    } catch {
      setRemoving(null)
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      {list.map((item) => {
        const Icon = typeIcon[item.kind] ?? Package
        const score = item.score ? Number(item.score) : null
        return (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-foreground/20"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{item.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                <span className="capitalize">{item.kind}</span>
                {item.subtitle ? ` · ${item.subtitle}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {score !== null && (
                <div className="text-right">
                  <p
                    className={cn(
                      "text-base font-semibold",
                      score >= 80
                        ? "text-[var(--color-success)]"
                        : score >= 60
                          ? "text-[var(--color-warning)]"
                          : "text-foreground",
                    )}
                  >
                    {score}
                  </p>
                  <p className="text-[11px] text-muted-foreground">score</p>
                </div>
              )}
              <button
                onClick={() => remove(item.id)}
                disabled={removing === item.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
                aria-label={`Remove ${item.title}`}
              >
                {removing === item.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
