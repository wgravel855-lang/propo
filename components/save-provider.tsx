"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Check, Loader2, X } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { saveItem } from "@/app/actions/saved"
import { AuthModal } from "@/components/auth-modal"

type SavePayload = {
  kind: string
  title: string
  subtitle?: string
  score?: string
  data?: unknown
}

type SaveContextValue = {
  requestSave: (payload: SavePayload) => void
}

const SaveContext = createContext<SaveContextValue | null>(null)

export function useSaveItem() {
  const ctx = useContext(SaveContext)
  if (!ctx) throw new Error("useSaveItem must be used within SaveProvider")
  return ctx
}

export function SaveProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [pending, setPending] = useState<SavePayload | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  const requestSave = useCallback(
    (payload: SavePayload) => {
      if (!session?.user && !isPending) {
        setPending(payload)
        setAuthOpen(true)
        return
      }
      setPending(payload)
      setStatus("idle")
    },
    [session, isPending],
  )

  const confirm = async () => {
    if (!pending) return
    setStatus("saving")
    try {
      await saveItem(pending)
      setStatus("saved")
      setTimeout(() => {
        setPending(null)
        setStatus("idle")
      }, 1100)
    } catch {
      setStatus("idle")
    }
  }

  const showDialog = pending && (session?.user || isPending)

  return (
    <SaveContext.Provider value={{ requestSave }}>
      {children}

      {/* Save-to-collection dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => status !== "saving" && setPending(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <button
              onClick={() => status !== "saving" && setPending(null)}
              className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted">
              <Bookmark className="h-5 w-5 text-brand" strokeWidth={2} />
            </div>
            <h2 className="text-base font-semibold tracking-tight text-foreground">Save to your collection</h2>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              Bookmark <span className="text-foreground">{pending.title}</span> to revisit it anytime from your saved
              items.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setPending(null)}
                disabled={status === "saving"}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirm}
                disabled={status !== "idle"}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
              >
                {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "saved" && <Check className="h-4 w-4" />}
                {status === "idle" ? "Save" : status === "saving" ? "Saving" : "Saved"}
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthed={() => {
          setAuthOpen(false)
          router.refresh()
          // keep `pending` so the save dialog opens once session updates
        }}
        reason="Sign in to save this to your collection."
      />
    </SaveContext.Provider>
  )
}
