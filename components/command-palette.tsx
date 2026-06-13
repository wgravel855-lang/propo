"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { AnimatePresence, motion } from "framer-motion"
import {
  Home,
  Compass,
  ScanSearch,
  Building2,
  TrendingUp,
  Sparkles,
  Bookmark,
  Settings,
  Search,
  CornerDownLeft,
} from "lucide-react"

const pages = [
  { label: "Home", href: "/app", icon: Home, keywords: "research search start" },
  { label: "Opportunity Finder", href: "/opportunities", icon: Compass, keywords: "products niche" },
  { label: "Product Analyzer", href: "/analyzer", icon: ScanSearch, keywords: "analyze score" },
  { label: "Store X-Ray", href: "/store-xray", icon: Building2, keywords: "competitor shop" },
  { label: "Trend Discovery", href: "/trends", icon: TrendingUp, keywords: "trending momentum" },
  { label: "Marketing Generator", href: "/marketing", icon: Sparkles, keywords: "copy ads email" },
  { label: "Saved", href: "/saved", icon: Bookmark, keywords: "bookmarks" },
  { label: "Settings", href: "/settings", icon: Settings, keywords: "account preferences" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener("keydown", onKey)
    document.addEventListener("open-command-palette", onOpen)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("open-command-palette", onOpen)
    }
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            aria-label="Close command palette"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="relative w-full max-w-xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Command
              loop
              className="overflow-hidden rounded-2xl border border-border bg-popover shadow-elevated"
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  autoFocus
                  placeholder="Search pages and actions..."
                  className="h-12 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>
                <Command.Group
                  heading="Navigate"
                  className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
                >
                  {pages.map((p) => (
                    <Command.Item
                      key={p.href}
                      value={`${p.label} ${p.keywords}`}
                      onSelect={() => go(p.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-foreground data-[selected=true]:bg-secondary"
                    >
                      <p.icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
                      <span className="flex-1">{p.label}</span>
                      <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground opacity-0 data-[selected=true]:opacity-100" />
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
