import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { OpportunitiesView } from "@/components/opportunities-view"

export default function OpportunitiesPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Opportunity Finder"
          description="AI-ranked product opportunities scored across demand, competition, and momentum. Search a niche to generate fresh ideas."
        />
        <OpportunitiesView />
      </div>
    </AppShell>
  )
}
