import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { AnalyzerView } from "@/components/analyzer-view"

export default function AnalyzerPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Product Analyzer"
          description="Enter a product and get a full AI intelligence report — viability score, pros and cons, pricing, and a launch verdict."
        />
        <AnalyzerView />
      </div>
    </AppShell>
  )
}
