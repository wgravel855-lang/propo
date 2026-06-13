import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { PromptEntry } from "@/components/prompt-entry"
import { CopyCard } from "@/components/copy-card"

const samples = [
  {
    label: "Ad hook",
    text: "Stay cool anywhere — the hands-free neck fan that runs all day on a single charge. No sweat, no noise, no excuses.",
  },
  {
    label: "Headline",
    text: "The bladeless neck fan that office workers and commuters can't stop talking about.",
  },
  {
    label: "Email subject",
    text: "It's about to get hot — here's how to stay cool (hands-free)",
  },
  {
    label: "Instagram caption",
    text: "POV: it's 95°F and you're the only one not melting. Meet your new everyday essential. Link in bio.",
  },
  {
    label: "Product description",
    text: "Lightweight, bladeless, and whisper-quiet. BreezeLoop Pro delivers 16 hours of personal cooling on a single charge — wear it on your commute, at your desk, or on the trail.",
  },
  {
    label: "TikTok hook",
    text: "I stopped sweating through my shirt and it cost me less than lunch. Here's the neck fan everyone's buying.",
  },
]

export default function MarketingPage() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          title="Marketing Generator"
          description="Turn any product into ready-to-ship copy — ad hooks, headlines, emails, and social captions in one pass."
        />
        <div className="px-6 py-10 sm:px-10">
          <PromptEntry
            placeholder="Describe the product you want copy for..."
            suggestions={["Portable neck fan", "Collagen creamer", "Resistance bands"]}
            cta="Generate"
          />

          <h3 className="mx-auto mt-12 mb-4 max-w-5xl text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Generated copy
          </h3>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((s) => (
              <CopyCard key={s.label} label={s.label} text={s.text} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
