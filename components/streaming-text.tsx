"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Reveals text token-by-token (word-by-word) to mimic an LLM streaming a
 * response. Re-runs whenever `text` changes.
 */
export function StreamingText({
  text,
  className,
  speed = 28,
  showCaret = true,
}: {
  text: string
  className?: string
  speed?: number
  showCaret?: boolean
}) {
  const [count, setCount] = useState(0)
  const tokens = text.split(" ")

  useEffect(() => {
    setCount(0)
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= tokens.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed])

  const done = count >= tokens.length

  return (
    <p className={cn("text-pretty", className)}>
      {tokens.slice(0, count).join(" ")}
      {showCaret && !done && (
        <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-brand align-middle" />
      )}
    </p>
  )
}
