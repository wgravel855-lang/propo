"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  PanelLeftClose,
  PanelLeftOpen,
  LogIn,
  LogOut,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { useSession, signOut } from "@/lib/auth-client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const nav = [
  { label: "Home", href: "/app", icon: Home },
  { label: "Opportunity Finder", href: "/opportunities", icon: Compass },
  { label: "Product Analyzer", href: "/analyzer", icon: ScanSearch },
  { label: "Store X-Ray", href: "/store-xray", icon: Building2 },
  { label: "Trend Discovery", href: "/trends", icon: TrendingUp },
  { label: "Marketing Generator", href: "/marketing", icon: Sparkles },
]

const footerNav = [
  { label: "Saved", href: "/saved", icon: Bookmark },
  { label: "Settings", href: "/settings", icon: Settings },
]

type NavItem = { label: string; href: string; icon: typeof Home }

function NavLink({
  item,
  active,
  collapsed,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
}) {
  const link = (
    <Link
      href={item.href}
      aria-label={item.label}
      className={cn(
        "group flex items-center rounded-lg text-sm transition-colors",
        collapsed ? "h-9 w-9 justify-center" : "gap-3 px-3 py-2",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  )

  if (!collapsed) return link

  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  // Read the saved state synchronously so the first paint is already correct.
  // This prevents the sidebar from flashing open→closed when it remounts on
  // navigation (each page mounts its own AppShell, so Sidebar remounts).
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("pp-sidebar-collapsed") === "true"
  })
  // Enable the width animation only after the first paint, so a remount never
  // animates — but a user-initiated toggle still does.
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem("pp-sidebar-collapsed", String(next))
      return next
    })
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const openSearch = () => document.dispatchEvent(new Event("open-command-palette"))
  const openUpgrade = () => document.dispatchEvent(new Event("open-upgrade-modal"))
  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "?"

  const isCollapsed = collapsed

  return (
    <TooltipProvider delay={0}>
      <aside
        suppressHydrationWarning
        className={cn(
          "hidden md:flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar",
          animate && "transition-[width] duration-200 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center",
            isCollapsed ? "justify-center px-2" : "px-5",
          )}
        >
          <Logo size={28} showWordmark={!isCollapsed} />
        </div>

        <div className={cn("pb-1", isCollapsed ? "px-2" : "px-3")}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    onClick={openSearch}
                    aria-label="Search"
                    className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  >
                    <Search className="h-4 w-4" strokeWidth={2} />
                  </button>
                }
              />
              <TooltipContent side="right">Search</TooltipContent>
            </Tooltip>
          ) : (
            <button
              type="button"
              onClick={openSearch}
              className="flex w-full items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/70"
            >
              <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span className="flex-1 text-left">Search</span>
              <kbd className="rounded border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-[10px] font-medium">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        <nav
          className={cn(
            "flex flex-1 flex-col gap-0.5 py-2",
            isCollapsed ? "items-center px-2" : "px-3",
          )}
        >
          {nav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(item.href)}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        <div
          className={cn(
            "flex flex-col gap-0.5 py-2",
            isCollapsed ? "items-center px-2" : "px-3",
          )}
        >
          {footerNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(item.href)}
              collapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="border-t border-sidebar-border p-3">
          {user ? (
            <div
              className={cn(
                "flex items-center rounded-lg",
                isCollapsed ? "justify-center" : "gap-3 px-2 py-2",
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-brand-foreground">
                {initials}
              </div>
              {!isCollapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{user.name || "Account"}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    aria-label="Sign out"
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={2} />
                  </button>
                </>
              )}
            </div>
          ) : isCollapsed ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    href="/sign-in"
                    aria-label="Sign in"
                    className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  >
                    <LogIn className="h-4 w-4" strokeWidth={2} />
                  </Link>
                }
              />
              <TooltipContent side="right">Sign in</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={openUpgrade}
                className="flex items-center gap-2 rounded-lg bg-brand-muted px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
              >
                <Zap className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span>Upgrade to Pro</span>
              </button>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-sidebar-accent/60"
              >
                <LogIn className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span>Sign in</span>
              </Link>
            </div>
          )}

          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  className={cn(
                    "mt-1 flex items-center rounded-lg text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    isCollapsed ? "h-9 w-9 justify-center mx-auto" : "w-full gap-3 px-2 py-2",
                  )}
                >
                  {isCollapsed ? (
                    <PanelLeftOpen className="h-4 w-4 shrink-0" strokeWidth={2} />
                  ) : (
                    <PanelLeftClose className="h-4 w-4 shrink-0" strokeWidth={2} />
                  )}
                  {!isCollapsed && <span>Collapse</span>}
                </button>
              }
            />
            {isCollapsed && <TooltipContent side="right">Expand sidebar</TooltipContent>}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
