import { cn } from "@/lib/utils"

export function ScoreRing({
  score,
  size = 132,
  stroke = 10,
  label = "Opportunity",
}: {
  score: number
  size?: number
  stroke?: number
  label?: string
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const tone =
    score >= 80 ? "text-[var(--color-success)]" : score >= 60 ? "text-[var(--color-warning)]" : "text-muted-foreground"

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-700", tone)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight text-foreground">{score}</span>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}
