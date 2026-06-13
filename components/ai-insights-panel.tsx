import { Sparkles, ArrowUpRight, AlertTriangle, Lightbulb, Link2 } from "lucide-react"
import { aiInsights } from "@/lib/data"

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="px-5 py-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export function AiInsightsPanel() {
  return (
    <aside className="hidden xl:flex w-80 shrink-0 flex-col border-l border-border bg-card/40">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <Sparkles className="h-4 w-4 text-foreground" strokeWidth={2} />
        <span className="text-sm font-medium text-foreground">AI Insights</span>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto">
        <Section icon={ArrowUpRight} title="Emerging opportunities">
          <ul className="flex flex-col gap-2.5">
            {aiInsights.emerging.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-foreground/80">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Link2} title="Related products">
          <div className="flex flex-wrap gap-2">
            {aiInsights.related.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section icon={AlertTriangle} title="Warnings">
          <ul className="flex flex-col gap-2.5">
            {aiInsights.warnings.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Lightbulb} title="Recommendations">
          <ul className="flex flex-col gap-2.5">
            {aiInsights.recommendations.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </aside>
  )
}
