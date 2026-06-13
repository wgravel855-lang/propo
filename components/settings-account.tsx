"use client"

import { useRouter } from "next/navigation"
import { LogOut, Zap } from "lucide-react"
import { signOut } from "@/lib/auth-client"

export function SettingsAccount({ name, email }: { name: string; email: string }) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  const openUpgrade = () => document.dispatchEvent(new Event("open-upgrade-modal"))

  return (
    <div className="flex flex-col gap-3 border-b border-border py-6 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-medium text-brand-foreground">
          {(name?.[0] || email[0] || "?").toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{name || "Account"}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={openUpgrade}
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          <Zap className="h-4 w-4" strokeWidth={2} />
          Upgrade
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Sign out
        </button>
      </div>
    </div>
  )
}
