"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { SearchHome } from "@/components/search-home"
import { ResearchWorkspace } from "@/components/research-workspace"

export default function AppPage() {
  const [query, setQuery] = useState<string | null>(null)

  return (
    <AppShell>
      {query ? (
        <ResearchWorkspace query={query} onReset={() => setQuery(null)} onNewQuery={setQuery} />
      ) : (
        <SearchHome onSubmit={setQuery} />
      )}
    </AppShell>
  )
}
