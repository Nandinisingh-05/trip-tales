import "server-only"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function getUserId() {
  const session = await getSession()
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

function slugifyUsername(base: string) {
  const cleaned = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 20)
  return cleaned || "traveller"
}

/**
 * Ensures the signed-in user has a profile row. Called from the app shell so
 * every authenticated user has a username/displayName. Returns the profile.
 */
export async function ensureProfile() {
  const session = await getSession()
  if (!session?.user) return null

  const existing = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1)

  if (existing.length > 0) return existing[0]

  // Generate a unique username from the user's name/email.
  const seed = slugifyUsername(
    session.user.name || session.user.email.split("@")[0],
  )
  let username = seed
  let attempt = 0
  // Avoid collisions by appending a numeric suffix.
  while (attempt < 50) {
    const clash = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.username, username))
      .limit(1)
    if (clash.length === 0) break
    attempt += 1
    username = `${seed}${attempt}`
  }

  const [created] = await db
    .insert(profiles)
    .values({
      userId: session.user.id,
      username,
      displayName: session.user.name || seed,
      avatarUrl: session.user.image ?? null,
    })
    .returning()

  return created
}

export type CurrentUser = {
  id: string
  email: string
  name: string
}
