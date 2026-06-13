import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { MarketingView } from "@/components/marketing-view"

export default function MarketingPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Marketing Generator"
          description="Turn any product into ready-to-ship copy — ad hooks, headlines, emails, and social captions in one pass."
        />
        <MarketingView />
      </div>
    </AppShell>
  )
}
