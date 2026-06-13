import { Sparkles, Lightbulb, Link2 } from "lucide-react"
import { Skeleton } from "@/components/skeleton"

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

export function AiInsightsPanel({
  insights,
  related,
}: {
  insights?: string[]
  related?: string[]
}) {
  const hasData = insights && insights.length > 0

  return (
    <aside className="hidden xl:flex w-80 shrink-0 flex-col border-l border-border bg-card/40">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <Sparkles className="h-4 w-4 text-foreground" strokeWidth={2} />
        <span className="text-sm font-medium text-foreground">AI Insights</span>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto">
        {!hasData ? (
          <div className="space-y-4 p-5">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
              Strategic takeaways will appear here as the research completes.
            </p>
          </div>
        ) : (
          <>
            <Section icon={Lightbulb} title="Strategic takeaways">
              <ul className="flex flex-col gap-2.5">
                {insights!.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            {related && related.length > 0 && (
              <Section icon={Link2} title="Key competitors">
                <div className="flex flex-wrap gap-2">
                  {related.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
