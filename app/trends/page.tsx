import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { TrendsView } from "@/components/trends-view"

export default function TrendsPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Trend Discovery"
          description="What's heating up across ecommerce right now, surfaced by AI and ranked by momentum."
        />
        <TrendsView />
      </div>
    </AppShell>
  )
}
