import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Sparkline } from "@/components/sparkline"
import { cn } from "@/lib/utils"
import { trends } from "@/lib/data"

const statusTone: Record<string, string> = {
  Surging: "bg-[var(--color-success)]/12 text-[var(--color-success)]",
  Rising: "bg-[var(--color-chart-2)]/12 text-[var(--color-chart-2)]",
  Steady: "bg-muted text-muted-foreground",
  Cooling: "bg-[var(--color-destructive)]/12 text-[var(--color-destructive)]",
}

export default function TrendsPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Trend Discovery"
          description="What's heating up across ecommerce right now, ranked by 90-day growth momentum."
        />
        <div className="px-6 py-6 sm:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {trends.map((trend) => {
              const positive = trend.growth >= 0
              return (
                <div
                  key={trend.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">{trend.name}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          statusTone[trend.status],
                        )}
                      >
                        {trend.status}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 text-sm font-medium",
                        positive ? "text-[var(--color-success)]" : "text-[var(--color-destructive)]",
                      )}
                    >
                      {positive ? "+" : ""}
                      {trend.growth}% growth
                    </p>
                  </div>
                  <Sparkline data={trend.spark} positive={positive} width={120} height={40} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
