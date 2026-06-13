import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { EmptyState } from "@/components/empty-state"
import { Package, Building2, TrendingUp, Trash2, Bookmark } from "lucide-react"
import { savedItems } from "@/lib/data"
import { cn } from "@/lib/utils"

const typeIcon = {
  Product: Package,
  Store: Building2,
  Trend: TrendingUp,
}

export default function SavedPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Saved"
          description="Opportunities, stores, and trends you've bookmarked for deeper review."
        />
        <div className="px-6 py-6 sm:px-10">
          {savedItems.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="Nothing saved yet"
              description="Bookmark promising products, stores, and trends from your research and they'll collect here for deeper review."
              actionLabel="Start researching"
              actionHref="/app"
            />
          ) : (
            <div className="flex flex-col gap-2.5">
            {savedItems.map((item) => {
              const Icon = typeIcon[item.type]
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-foreground/20"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type} · Saved {item.savedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p
                        className={cn(
                          "text-base font-semibold",
                          item.score >= 80
                            ? "text-[var(--color-success)]"
                            : item.score >= 60
                              ? "text-[var(--color-warning)]"
                              : "text-foreground",
                        )}
                      >
                        {item.score}
                      </p>
                      <p className="text-[11px] text-muted-foreground">score</p>
                    </div>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
