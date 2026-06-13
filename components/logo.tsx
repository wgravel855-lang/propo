import { cn } from "@/lib/utils"

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[28%] bg-brand text-brand-foreground",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.66}
        height={size * 0.66}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rising pulse: flat baseline, sharp spike, settling higher than it started */}
        <path d="M2 15h4l2-7 3 11 2.5-8 1.5 4h6" />
      </svg>
    </span>
  )
}

export function Logo({
  size = 28,
  showWordmark = true,
  className,
}: {
  size?: number
  showWordmark?: boolean
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          ProductPulse
        </span>
      )}
    </span>
  )
}
