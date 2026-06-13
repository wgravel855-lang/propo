import { cn } from "@/lib/utils"
import type { Level } from "@/lib/data"

export function LevelBadge({ level, invert = false }: { level: Level; invert?: boolean }) {
  // For demand: High is good. For competition: invert so Low is good.
  const goodWhenHigh = !invert
  const tone =
    (level === "High" && goodWhenHigh) || (level === "Low" && !goodWhenHigh)
      ? "good"
      : level === "Medium"
        ? "mid"
        : "bad"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "good" && "bg-[var(--color-success)]/12 text-[var(--color-success)]",
        tone === "mid" && "bg-[var(--color-warning)]/12 text-[var(--color-warning)]",
        tone === "bad" && "bg-muted text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "good" && "bg-[var(--color-success)]",
          tone === "mid" && "bg-[var(--color-warning)]",
          tone === "bad" && "bg-muted-foreground",
        )}
      />
      {level}
    </span>
  )
}
