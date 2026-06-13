#!/usr/bin/env bash
# Paste this whole block into the v0 Terminal (Ctrl+`) and press Enter.
# It creates the new files and installs packages. It does NOT touch your
# existing app/layout.tsx, landing page, or sidebar — you merge those by hand.
set -e

mkdir -p app/api/chat app/chat components components/landing components/modals components/providers lib/auth lib/collections

# proxy.ts
cat > proxy.ts << 'CLAUDE_EOF'
// Next.js 16 renamed the middleware file to proxy.ts (on Next.js <=15 this
// same code lives in middleware.ts instead — only the filename differs).
import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless referenced in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
CLAUDE_EOF

# app/api/chat/route.ts
cat > app/api/chat/route.ts << 'CLAUDE_EOF'
import { anthropic } from "@ai-sdk/anthropic"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

/**
 * Streaming chat endpoint. The client (useChat) POSTs the full message list here.
 *
 * Message structure — two shapes, on purpose:
 *  - UI messages (what useChat holds + sends): { id, role, parts: [{type, ...}] }
 *  - Model messages (what the LLM wants): { role, content }
 * convertToModelMessages() bridges them, so the UI can carry rich parts (text,
 * files, tool calls) while the model still receives clean role/content turns.
 */

export const maxDuration = 30

// Change this to any current Anthropic model id if you like.
const MODEL = "claude-sonnet-4-5"

const SYSTEM_PROMPT =
  "You are a helpful assistant for this app. Be concise and friendly."

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: anthropic(MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
CLAUDE_EOF

# app/chat/page.tsx
cat > app/chat/page.tsx << 'CLAUDE_EOF'
import { Chat } from "@/components/chat"

export default function ChatPage() {
  return (
    <main className="min-h-dvh px-4 py-10">
      <Chat />
    </main>
  )
}
CLAUDE_EOF

# components/chat.tsx
cat > components/chat.tsx << 'CLAUDE_EOF'
"use client"

import { useState } from "react"
import { Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

/**
 * Minimal streaming chat UI.
 *
 * AI SDK v5 notes (different from v4 tutorials you'll find online):
 *  - useChat no longer manages the input box — you own it with useState.
 *  - You send with sendMessage({ text }), not handleSubmit.
 *  - Each message has `parts` (an array), not a `content` string. Render text
 *    by walking parts and picking the ones where part.type === "text".
 *  - `status` is "ready" | "submitted" | "streaming" | "error".
 */
export function Chat() {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const busy = status === "submitted" || status === "streaming"

  function submit() {
    const text = input.trim()
    if (!text || busy) return
    sendMessage({ text })
    setInput("")
  }

  return (
    <div className="mx-auto flex h-[600px] w-full max-w-2xl flex-col rounded-lg border">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Ask anything to get started.
          </p>
        ) : null}

        {messages.map((message) => {
          const text = message.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join("")
          return (
            <div
              key={message.id}
              className={
                message.role === "user" ? "text-right" : "text-left"
              }
            >
              <span
                className={
                  "inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm " +
                  (message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted")
                }
              >
                {text}
              </span>
            </div>
          )
        })}

        {status === "submitted" ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Thinking…
          </div>
        ) : null}

        {error ? (
          <p className="text-sm text-destructive">
            Something went wrong. Try again.
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2 border-t p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder="Type a message…"
          disabled={status === "error"}
        />
        <Button onClick={submit} disabled={busy || !input.trim()}>
          {busy ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
CLAUDE_EOF

# components/sidebar-user.tsx
cat > components/sidebar-user.tsx << 'CLAUDE_EOF'
"use client"

import { ChevronsUpDown, LogOut, Settings, Sparkles } from "lucide-react"

import { useModals } from "@/components/providers/modal-provider"
import { useSession } from "@/components/providers/session-provider"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "@/lib/auth/types"

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

/**
 * Drop this into your sidebar footer:
 *
 *   import { SidebarUser } from "@/components/sidebar-user"
 *   ...
 *   <SidebarFooter>
 *     <SidebarUser />
 *   </SidebarFooter>
 *
 * It reads session from context and renders the right state. If you use
 * shadcn's <Sidebar>, wrap this in <SidebarMenu><SidebarMenuItem>…</…>.
 */
export function SidebarUser() {
  const { user, status, signOut } = useSession()
  const { openAuth, openUpgrade } = useModals()

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5">
        <div className="size-8 animate-pulse rounded-full bg-muted" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || !user) {
    return (
      <div className="grid gap-2 px-1 py-1.5">
        <Button
          size="sm"
          className="w-full"
          onClick={() => openAuth({ mode: "sign-up" })}
        >
          Sign up
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-full"
          onClick={() => openAuth({ mode: "sign-in" })}
        >
          Sign in
        </Button>
      </div>
    )
  }

  return <AccountMenu user={user} onUpgrade={() => openUpgrade()} onSignOut={signOut} />
}

function AccountMenu({
  user,
  onUpgrade,
  onSignOut,
}: {
  user: User
  onUpgrade: () => void
  onSignOut: () => void | Promise<void>
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md p-1.5 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar className="size-8">
          {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
          <AvatarFallback>{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 leading-tight">
          <span className="truncate text-sm font-medium">{user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user.plan === "pro" ? "Pro plan" : "Free plan"}
          </span>
        </div>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top" className="min-w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate font-medium">{user.name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.plan !== "pro" ? (
          <DropdownMenuItem onClick={onUpgrade}>
            <Sparkles className="size-4" />
            Upgrade to Pro
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem>
          <Settings className="size-4" />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onSignOut()}>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
CLAUDE_EOF

# components/save-button.tsx
cat > components/save-button.tsx << 'CLAUDE_EOF'
"use client"

import { Bookmark } from "lucide-react"

import { useModals } from "@/components/providers/modal-provider"
import { Button } from "@/components/ui/button"

/**
 * Example trigger. Put it on any item/card. It opens the save-to-collection
 * modal, which itself handles the signed-out case by routing to sign-in.
 *
 *   <SaveButton itemId={post.id} itemTitle={post.title} />
 */
export function SaveButton({
  itemId,
  itemTitle,
}: {
  itemId: string
  itemTitle?: string
}) {
  const { openSaveToCollection } = useModals()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => openSaveToCollection({ itemId, itemTitle })}
    >
      <Bookmark className="size-4" />
      Save
    </Button>
  )
}
CLAUDE_EOF

# components/landing/landing-ctas.tsx
cat > components/landing/landing-ctas.tsx << 'CLAUDE_EOF'
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useModals } from "@/components/providers/modal-provider"
import { useSession } from "@/components/providers/session-provider"
import { Button, buttonVariants } from "@/components/ui/button"

/** The app route to send signed-in users to. Change to match your routing. */
const APP_HOME = "/app"

export function LandingHeroCtas() {
  const { status } = useSession()
  const { openAuth } = useModals()

  if (status === "authenticated") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link href={APP_HOME} className={buttonVariants({ size: "lg" })}>
          Go to your workspace
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="lg"
        onClick={() => openAuth({ mode: "sign-up" })}
        disabled={status === "loading"}
      >
        Get started
        <ArrowRight className="size-4" />
      </Button>
      <Button
        size="lg"
        variant="ghost"
        onClick={() => openAuth({ mode: "sign-in" })}
        disabled={status === "loading"}
      >
        Sign in
      </Button>
    </div>
  )
}

/** A header sign-in / sign-up cluster, e.g. top-right of the landing nav. */
export function LandingNavCta() {
  const { status } = useSession()
  const { openAuth } = useModals()

  if (status === "authenticated") {
    return (
      <Link
        href={APP_HOME}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        Open app
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => openAuth({ mode: "sign-in" })}
      >
        Sign in
      </Button>
      <Button size="sm" onClick={() => openAuth({ mode: "sign-up" })}>
        Sign up
      </Button>
    </div>
  )
}

/** A pricing CTA that opens the upgrade modal. */
export function LandingUpgradeCta() {
  const { openUpgrade } = useModals()
  return (
    <Button
      variant="outline"
      onClick={() => openUpgrade({ reason: "See everything Pro unlocks." })}
    >
      Compare plans
    </Button>
  )
}
CLAUDE_EOF

# components/modals/save-to-collection-modal.tsx
cat > components/modals/save-to-collection-modal.tsx << 'CLAUDE_EOF'
"use client"

import { useEffect, useState } from "react"
import { Check, FolderPlus, Loader2, Lock, Plus } from "lucide-react"

import { useModals } from "@/components/providers/modal-provider"
import { useSession } from "@/components/providers/session-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { collections as collectionsClient } from "@/lib/collections/client"
import type { Collection } from "@/lib/collections/client"
import { cn } from "@/lib/utils"

interface SaveToCollectionModalProps {
  open?: boolean
  onClose: () => void
  itemId: string
  itemTitle?: string
}

export function SaveToCollectionModal({
  open = false,
  onClose,
  itemId,
  itemTitle,
}: SaveToCollectionModalProps) {
  const { status } = useSession()
  const { openAuth } = useModals()

  const [items, setItems] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState("")
  const [showNewInput, setShowNewInput] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const authed = status === "authenticated"

  useEffect(() => {
    if (!open || !authed) return
    let active = true
    setLoading(true)
    setError(null)
    setSavedIds(new Set())
    setShowNewInput(false)
    setNewName("")
    collectionsClient
      .list()
      .then((list) => active && setItems(list))
      .catch(
        () => active && setError("Couldn't load your collections. Try again.")
      )
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [open, authed])

  async function handleSave(collection: Collection) {
    setError(null)
    setSavingId(collection.id)
    try {
      const added = await collectionsClient.addItem(collection.id, itemId)
      setSavedIds((prev) => new Set(prev).add(collection.id))
      if (added)
        setItems((prev) =>
          prev.map((c) =>
            c.id === collection.id ? { ...c, itemCount: c.itemCount + 1 } : c
          )
        )
    } catch {
      setError("Couldn't save to that collection. Try again.")
    } finally {
      setSavingId(null)
    }
  }

  async function handleCreate() {
    setError(null)
    setCreating(true)
    try {
      const created = await collectionsClient.create(newName)
      setItems((prev) => [created, ...prev])
      setNewName("")
      setShowNewInput(false)
      await handleSave(created)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't create that.")
    } finally {
      setCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save{itemTitle ? ` “${itemTitle}”` : ""}</DialogTitle>
          <DialogDescription>
            {authed
              ? "Add it to a collection, or start a new one."
              : "Sign in to save items to your collections."}
          </DialogDescription>
        </DialogHeader>

        {!authed ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Lock className="size-5 text-muted-foreground" />
            </span>
            <p className="text-sm text-muted-foreground">
              Your collections live with your account.
            </p>
            <Button
              onClick={() =>
                openAuth({ message: "Sign in to save to a collection." })
              }
            >
              Sign in to continue
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-muted-foreground">
                  <Loader2 className="size-5 animate-spin" />
                </div>
              ) : items.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No collections yet. Create your first one below.
                </p>
              ) : (
                items.map((c) => {
                  const saved = savedIds.has(c.id)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSave(c)}
                      disabled={savingId === c.id || saved}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                        "hover:bg-accent disabled:cursor-default",
                        saved && "text-muted-foreground"
                      )}
                    >
                      <span className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {c.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {c.itemCount} {c.itemCount === 1 ? "item" : "items"}
                        </span>
                      </span>
                      {savingId === c.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : saved ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                          <Check className="size-4" /> Saved
                        </span>
                      ) : (
                        <Plus className="size-4 text-muted-foreground" />
                      )}
                    </button>
                  )
                })
              )}
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            {showNewInput ? (
              <div className="flex items-center gap-2">
                <Input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New collection name"
                  disabled={creating}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleCreate()
                    }
                  }}
                />
                <Button onClick={handleCreate} disabled={creating}>
                  {creating ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowNewInput(true)}
              >
                <FolderPlus className="size-4" />
                New collection
              </Button>
            )}

            <DialogFooter>
              <Button variant="ghost" onClick={onClose}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
CLAUDE_EOF

# components/modals/upgrade-modal.tsx
cat > components/modals/upgrade-modal.tsx << 'CLAUDE_EOF'
"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, Sparkles } from "lucide-react"

import { useModals } from "@/components/providers/modal-provider"
import { useSession } from "@/components/providers/session-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface UpgradeModalProps {
  open?: boolean
  onClose: () => void
  reason?: string
}

const FREE_FEATURES = [
  "Up to 3 collections",
  "Standard search",
  "Community support",
]

const PRO_FEATURES = [
  "Unlimited collections",
  "Advanced search & filters",
  "Priority support",
  "Early access to new features",
]

export function UpgradeModal({
  open = false,
  onClose,
  reason,
}: UpgradeModalProps) {
  const { user, status, refresh } = useSession()
  const { openAuth } = useModals()

  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setPending(false)
      setDone(false)
    }
  }, [open])

  const isPro = user?.plan === "pro"

  async function handleUpgrade() {
    if (status !== "authenticated") {
      openAuth({ message: "Create an account to upgrade to Pro." })
      return
    }
    setPending(true)
    // Replace this with your real checkout (Clerk Billing or a Stripe redirect).
    // After the plan changes server-side (set user.publicMetadata.plan = "pro"),
    // refresh() re-reads the Clerk user so the UI reflects it.
    await new Promise((r) => setTimeout(r, 900))
    await refresh()
    setPending(false)
    setDone(true)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5" />
            {done ? "You're on Pro" : "Upgrade to Pro"}
          </DialogTitle>
          <DialogDescription>
            {done
              ? "Your new features are unlocked. Enjoy."
              : (reason ?? "Get more room to work and faster ways to find things.")}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-6" />
            </span>
            <Button onClick={onClose}>Back to app</Button>
          </div>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <PlanCard
                name="Free"
                price="$0"
                cadence="forever"
                features={FREE_FEATURES}
                current={!isPro}
              />
              <PlanCard
                name="Pro"
                price="$8"
                cadence="per month"
                features={PRO_FEATURES}
                highlighted
                current={isPro}
              />
            </div>

            {isPro ? (
              <Button className="w-full" variant="outline" onClick={onClose}>
                You're already on Pro
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={handleUpgrade}
                disabled={pending}
              >
                {pending ? <Loader2 className="size-4 animate-spin" /> : null}
                {status === "authenticated"
                  ? "Upgrade to Pro"
                  : "Sign in to upgrade"}
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function PlanCard({
  name,
  price,
  cadence,
  features,
  highlighted,
  current,
}: {
  name: string
  price: string
  cadence: string
  features: string[]
  highlighted?: boolean
  current?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        highlighted ? "border-primary bg-primary/5" : "bg-card"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
        {current ? (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            Current
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold">{price}</span>
        <span className="text-sm text-muted-foreground">{cadence}</span>
      </div>
      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
CLAUDE_EOF

# components/providers/app-providers.tsx
cat > components/providers/app-providers.tsx << 'CLAUDE_EOF'
"use client"

import { ModalProvider } from "@/components/providers/modal-provider"
import { SessionProvider } from "@/components/providers/session-provider"

/**
 * Single wrapper for the app's client-side context. Use it in app/layout.tsx:
 *
 *   import { AppProviders } from "@/components/providers/app-providers"
 *   ...
 *   <body>
 *     <AppProviders>{children}</AppProviders>
 *   </body>
 *
 * SessionProvider is outermost so modals (and everything else) can read session.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  )
}
CLAUDE_EOF

# components/providers/modal-provider.tsx
cat > components/providers/modal-provider.tsx << 'CLAUDE_EOF'
"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { useClerk } from "@clerk/nextjs"

import { SaveToCollectionModal } from "@/components/modals/save-to-collection-modal"
import { UpgradeModal } from "@/components/modals/upgrade-modal"

export type AuthMode = "sign-in" | "sign-up"

export interface AuthModalProps {
  mode?: AuthMode
}

export interface SaveToCollectionModalProps {
  itemId: string
  itemTitle?: string
}

export interface UpgradeModalProps {
  reason?: string
}

type ActiveModal =
  | { type: "save-to-collection"; props: SaveToCollectionModalProps }
  | { type: "upgrade"; props: UpgradeModalProps }
  | null

interface ModalContextValue {
  active: ActiveModal
  /** Opens Clerk's hosted sign-in / sign-up modal. */
  openAuth: (props?: AuthModalProps) => void
  openSaveToCollection: (props: SaveToCollectionModalProps) => void
  openUpgrade: (props?: UpgradeModalProps) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ActiveModal>(null)
  const clerk = useClerk()

  const closeModal = useCallback(() => setActive(null), [])

  const value = useMemo<ModalContextValue>(
    () => ({
      active,
      closeModal,
      // Auth is handled by Clerk's prebuilt modal — no custom auth UI to maintain.
      openAuth: (props = {}) =>
        props.mode === "sign-up" ? clerk.openSignUp() : clerk.openSignIn(),
      openSaveToCollection: (props) =>
        setActive({ type: "save-to-collection", props }),
      openUpgrade: (props = {}) => setActive({ type: "upgrade", props }),
    }),
    [active, closeModal, clerk]
  )

  return (
    <ModalContext.Provider value={value}>
      {children}
      <SaveToCollectionModal
        open={active?.type === "save-to-collection"}
        onClose={closeModal}
        itemId={
          active?.type === "save-to-collection" ? active.props.itemId : ""
        }
        itemTitle={
          active?.type === "save-to-collection"
            ? active.props.itemTitle
            : undefined
        }
      />
      <UpgradeModal
        open={active?.type === "upgrade"}
        onClose={closeModal}
        reason={active?.type === "upgrade" ? active.props.reason : undefined}
      />
    </ModalContext.Provider>
  )
}

export function useModals() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("useModals must be used within <ModalProvider>.")
  return ctx
}
CLAUDE_EOF

# components/providers/session-provider.tsx
cat > components/providers/session-provider.tsx << 'CLAUDE_EOF'
"use client"

import { useCallback, useMemo } from "react"
import { useClerk, useUser } from "@clerk/nextjs"

import type { Plan, SessionStatus, User } from "@/lib/auth/types"

/**
 * Session is now backed by Clerk. The rest of the app keeps using the same
 * useSession() shape, so nothing downstream changed.
 *
 * "Plan" comes from Clerk user publicMetadata.plan ("free" | "pro"). Set it from
 * a server action / webhook (or Clerk Billing) when a user upgrades.
 */
interface SessionContextValue {
  user: User | null
  status: SessionStatus
  signOut: () => Promise<void>
  /** Re-reads the Clerk user (e.g. after a plan change). */
  refresh: () => Promise<void>
}

export function useSession(): SessionContextValue {
  const { isLoaded, isSignedIn, user } = useUser()
  const clerk = useClerk()

  const status: SessionStatus = !isLoaded
    ? "loading"
    : isSignedIn
      ? "authenticated"
      : "unauthenticated"

  const mapped: User | null = useMemo(() => {
    if (!isSignedIn || !user) return null
    const email = user.primaryEmailAddress?.emailAddress ?? ""
    return {
      id: user.id,
      name: user.fullName ?? user.firstName ?? email.split("@")[0],
      email,
      avatarUrl: user.imageUrl,
      plan: ((user.publicMetadata?.plan as Plan) ?? "free"),
    }
  }, [isSignedIn, user])

  const signOut = useCallback(async () => {
    await clerk.signOut()
  }, [clerk])

  const refresh = useCallback(async () => {
    await user?.reload()
  }, [user])

  return { user: mapped, status, signOut, refresh }
}

/**
 * Kept so app/layout.tsx imports don't break, but Clerk's <ClerkProvider> is the
 * real provider now (added in layout). This is a no-op passthrough.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
CLAUDE_EOF

# lib/auth/types.ts
cat > lib/auth/types.ts << 'CLAUDE_EOF'
export type Plan = "free" | "pro"

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  plan: Plan
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated"

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput {
  name: string
  email: string
  password: string
}

export type OAuthProvider = "google" | "github"
CLAUDE_EOF

# lib/collections/client.ts
cat > lib/collections/client.ts << 'CLAUDE_EOF'
/**
 * Collections client — swap the mock for your real API the same way as auth.
 * The save-to-collection modal only depends on this interface.
 */

export interface Collection {
  id: string
  name: string
  itemCount: number
}

export interface CollectionsClient {
  list(): Promise<Collection[]>
  create(name: string): Promise<Collection>
  /** Returns true if the item was added, false if it was already present. */
  addItem(collectionId: string, itemId: string): Promise<boolean>
}

const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms))

let store: Collection[] = [
  { id: "c_read-later", name: "Read later", itemCount: 12 },
  { id: "c_inspiration", name: "Inspiration", itemCount: 5 },
  { id: "c_work", name: "Work", itemCount: 23 },
]

const membership = new Map<string, Set<string>>()

export const collections: CollectionsClient = {
  async list() {
    await wait(200)
    return [...store]
  },

  async create(name) {
    await wait()
    const trimmed = name.trim()
    if (!trimmed) throw new Error("Give the collection a name.")
    if (store.some((c) => c.name.toLowerCase() === trimmed.toLowerCase()))
      throw new Error("You already have a collection with that name.")
    const created: Collection = {
      id: `c_${crypto.randomUUID().slice(0, 8)}`,
      name: trimmed,
      itemCount: 0,
    }
    store = [created, ...store]
    return created
  },

  async addItem(collectionId, itemId) {
    await wait(250)
    const set = membership.get(collectionId) ?? new Set<string>()
    if (set.has(itemId)) return false
    set.add(itemId)
    membership.set(collectionId, set)
    store = store.map((c) =>
      c.id === collectionId ? { ...c, itemCount: c.itemCount + 1 } : c
    )
    return true
  },
}
CLAUDE_EOF

# install packages
pnpm add @clerk/nextjs ai @ai-sdk/react @ai-sdk/anthropic

# shadcn primitives used by the components (accept defaults if prompted)
pnpm dlx shadcn@latest add dialog button input avatar dropdown-menu

echo "Files created + packages installed."
echo "Next: 1) keys in .env.development.local  2) wrap app/layout.tsx in ClerkProvider+AppProviders  3) add <SidebarUser/> to your sidebar footer  4) add landing CTAs  5) open Preview."
