import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { LevelBadge } from "@/components/level-badge"
import { Sparkline } from "@/components/sparkline"
import { Bookmark } from "lucide-react"
import { opportunities } from "@/lib/data"

export default function OpportunitiesPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Opportunity Finder"
          description="Ranked product opportunities scored across demand, competition, and momentum. Sorted by overall opportunity score."
        />
        <div className="px-6 py-6 sm:px-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5 font-medium">Product</th>
                  <th className="px-5 py-3.5 font-medium">Score</th>
                  <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Demand</th>
                  <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Competition</th>
                  <th className="hidden px-5 py-3.5 font-medium md:table-cell">Momentum</th>
                  <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Margin</th>
                  <th className="px-5 py-3.5 font-medium text-right">Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {opportunities.map((op) => (
                  <tr key={op.id} className="transition-colors hover:bg-secondary/40">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{op.name}</p>
                      <p className="text-xs text-muted-foreground">{op.category}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{op.score}</span>
                        <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-secondary sm:block">
                          <div
                            className="h-full rounded-full bg-[var(--color-success)]"
                            style={{ width: `${op.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 sm:table-cell">
                      <LevelBadge level={op.demand} />
                    </td>
                    <td className="hidden px-5 py-4 sm:table-cell">
                      <LevelBadge level={op.competition} invert />
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <span className="text-[var(--color-success)]">+{op.momentum}%</span>
                    </td>
                    <td className="hidden px-5 py-4 lg:table-cell text-muted-foreground">{op.margin}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        aria-label={`Save ${op.name}`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
