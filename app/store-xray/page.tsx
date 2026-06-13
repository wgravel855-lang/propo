import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { PromptEntry } from "@/components/prompt-entry"
import { ArrowUpRight } from "lucide-react"
import { stores } from "@/lib/data"

function Bar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-medium text-foreground">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: tone }} />
      </div>
    </div>
  )
}

export default function StoreXrayPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Store X-Ray"
          description="Reverse-engineer any competitor. See their strengths, weaknesses, and the openings you can exploit."
        />
        <div className="px-6 py-10 sm:px-10">
          <PromptEntry
            placeholder="Paste a Shopify store URL to scan..."
            suggestions={["aurora-active.com", "homeglow.co", "pureroot.com"]}
            cta="Scan store"
          />

          <h3 className="mt-12 mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recent scans
          </h3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{store.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {store.niche} · {store.monthlyVisits} visits/mo
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Bar label="Strength" value={store.strength} tone="var(--color-chart-2)" />
                  <Bar label="Weakness" value={store.weakness} tone="var(--color-destructive)" />
                  <Bar label="Opportunity" value={store.opportunity} tone="var(--color-success)" />
                </div>
                <button className="flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm text-foreground transition-colors hover:bg-secondary">
                  View analysis
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
