"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { savedItems } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export async function getSavedItems() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return []
  return db
    .select()
    .from(savedItems)
    .where(eq(savedItems.userId, session.user.id))
    .orderBy(desc(savedItems.createdAt))
}

export async function saveItem(input: {
  kind: string
  title: string
  subtitle?: string
  score?: string
  data?: unknown
}) {
  const userId = await getUserId()
  await db.insert(savedItems).values({
    userId,
    kind: input.kind,
    title: input.title,
    subtitle: input.subtitle,
    score: input.score,
    data: input.data,
  })
  revalidatePath("/saved")
}

export async function deleteSavedItem(id: number) {
  const userId = await getUserId()
  await db.delete(savedItems).where(and(eq(savedItems.id, id), eq(savedItems.userId, userId)))
  revalidatePath("/saved")
}
