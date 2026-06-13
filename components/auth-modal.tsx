"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { LogoMark } from "@/components/logo"

export function AuthModal({
  open,
  onClose,
  onAuthed,
  reason,
}: {
  open: boolean
  onClose: () => void
  onAuthed: () => void
  reason?: string
}) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const isSignUp = mode === "sign-up"

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isSignUp) {
        const { error } = await authClient.signUp.email({ email, password, name })
        if (error) {
          setError(error.message ?? "Could not create account")
          setLoading(false)
          return
        }
      } else {
        const { error } = await authClient.signIn.email({ email, password })
        if (error) {
          setError(error.message ?? "Invalid email or password")
          setLoading(false)
          return
        }
      }
      setLoading(false)
      onAuthed()
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-7 shadow-elevated">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex flex-col items-center text-center">
          <LogoMark size={30} />
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            {reason ?? (isSignUp ? "Start finding winning products in minutes." : "Sign in to continue.")}
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {isSignUp && (
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60"
          />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (8+ characters)"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60"
          />

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => {
              setMode(isSignUp ? "sign-in" : "sign-up")
              setError(null)
            }}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  )
}
