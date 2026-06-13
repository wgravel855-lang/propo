import { headers } from "next/headers"
import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { EmptyState } from "@/components/empty-state"
import { SavedList } from "@/components/saved-list"
import { Bookmark, LogIn } from "lucide-react"
import { auth } from "@/lib/auth"
import { getSavedItems } from "@/app/actions/saved"

export default async function SavedPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const items = session?.user ? await getSavedItems() : []

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Saved"
          description="Opportunities, stores, and trends you've bookmarked for deeper review."
        />
        <div className="px-6 py-6 sm:px-10">
          {!session?.user ? (
            <EmptyState
              icon={LogIn}
              title="Sign in to save your research"
              description="Create a free account to bookmark promising products, stores, and trends and revisit them anytime."
              actionLabel="Sign in"
              actionHref="/sign-in"
            />
          ) : items.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="Nothing saved yet"
              description="Bookmark promising products, stores, and trends from your research and they'll collect here for deeper review."
              actionLabel="Start researching"
              actionHref="/app"
            />
          ) : (
            <SavedList items={items} />
          )}
        </div>
      </div>
    </AppShell>
  )
}
