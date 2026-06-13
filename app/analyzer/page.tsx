import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { PromptEntry } from "@/components/prompt-entry"

export default function AnalyzerPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Product Analyzer"
          description="Paste a product name or URL and get a full intelligence report — demand, margins, competitors, and a launch verdict."
        />
        <div className="px-6 py-10 sm:px-10">
          <PromptEntry
            placeholder="Enter a product name or paste a product URL..."
            suggestions={["Portable blender", "Collagen creamer", "Posture corrector", "LED sunset projector"]}
          />
        </div>
      </div>
    </AppShell>
  )
}
