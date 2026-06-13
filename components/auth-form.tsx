"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Logo } from "@/components/logo"
import { Loader2 } from "lucide-react"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
      router.push("/app")
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="ambient-backdrop flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Link href="/" className="mb-8">
        <Logo size={32} />
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-elevated">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isSignUp ? "Start finding winning products in minutes." : "Sign in to continue your research."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Smith"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60"
            />
          </div>

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

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  )
}
