import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"

function Row({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border py-6 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-md">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <div
      className={`flex h-6 w-11 items-center rounded-full p-0.5 ${on ? "justify-end bg-foreground" : "justify-start bg-secondary"}`}
    >
      <div className={`h-5 w-5 rounded-full ${on ? "bg-background" : "bg-muted-foreground"}`} />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader title="Settings" description="Manage your workspace, research preferences, and account." />
        <div className="mx-auto w-full max-w-3xl px-6 py-6 sm:px-10">
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Profile</h3>
          <div className="rounded-2xl border border-border bg-card px-6">
            <Row title="Display name" description="The name shown across your workspace.">
              <input
                defaultValue="Jordan Diaz"
                className="w-56 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none"
              />
            </Row>
            <Row title="Email" description="Used for trend alerts and account notices.">
              <input
                defaultValue="jordan@productpulse.ai"
                className="w-56 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none"
              />
            </Row>
          </div>

          <h3 className="mb-1 mt-10 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Research preferences
          </h3>
          <div className="rounded-2xl border border-border bg-card px-6">
            <Row title="Auto-save high scorers" description="Automatically save opportunities that score above 85.">
              <Toggle on />
            </Row>
            <Row title="Daily trend digest" description="Email me a summary of emerging trends each morning.">
              <Toggle on />
            </Row>
            <Row title="Competitor alerts" description="Notify me when a tracked store launches a new product.">
              <Toggle />
            </Row>
          </div>

          <h3 className="mb-1 mt-10 text-xs font-medium uppercase tracking-wider text-muted-foreground">Plan</h3>
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-6 py-5">
            <div>
              <p className="text-sm font-medium text-foreground">Pro plan</p>
              <p className="mt-1 text-sm text-muted-foreground">Unlimited research · $49/mo</p>
            </div>
            <button className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary">
              Manage billing
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
