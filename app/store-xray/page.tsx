import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { StoreXrayView } from "@/components/store-xray-view"

export default function StoreXrayPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Store X-Ray"
          description="Reverse-engineer any competitor. See their estimated revenue, top products, strengths, and the openings you can exploit."
        />
        <StoreXrayView />
      </div>
    </AppShell>
  )
}
