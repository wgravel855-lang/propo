"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { SearchHome } from "@/components/search-home"
import { ResearchWorkspace } from "@/components/research-workspace"

export default function HomePage() {
  const [query, setQuery] = useState<string | null>(null)

  return (
    <AppShell>
      {query ? (
        <ResearchWorkspace query={query} onReset={() => setQuery(null)} />
      ) : (
        <SearchHome onSubmit={setQuery} />
      )}
    </AppShell>
  )
}
