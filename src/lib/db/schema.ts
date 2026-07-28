import {
  boolean,
  date,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core"

/* ----------------------------- Better Auth ----------------------------- */
// These four tables match Better Auth's defaults. Do not rename their columns.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

/* ------------------------------- App tables ------------------------------ */
// App tables use a plain `userId` column for per-user scoping (no FK constraints).

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  username: text("username").notNull().unique(),
  displayName: text("displayName").notNull(),
  bio: text("bio"),
  location: text("location"),
  avatarUrl: text("avatarUrl"),
  coverUrl: text("coverUrl"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const tales = pgTable("tales", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  story: text("story").notNull().default(""),
  locationName: text("locationName"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  coverUrl: text("coverUrl"),
  startDate: date("startDate"),
  endDate: date("endDate"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const talePhotos = pgTable("tale_photos", {
  id: serial("id").primaryKey(),
  taleId: integer("taleId").notNull(),
  userId: text("userId").notNull(),
  url: text("url").notNull(),
  caption: text("caption"),
  sortOrder: integer("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const follows = pgTable(
  "follows",
  {
    id: serial("id").primaryKey(),
    followerId: text("followerId").notNull(),
    followingId: text("followingId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => ({
    uniqueFollow: unique().on(t.followerId, t.followingId),
  }),
)

export const likes = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    taleId: integer("taleId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => ({
    uniqueLike: unique().on(t.userId, t.taleId),
  }),
)

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  taleId: integer("taleId").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type Tale = typeof tales.$inferSelect
export type TalePhoto = typeof talePhotos.$inferSelect
export type Profile = typeof profiles.$inferSelect
export type Comment = typeof comments.$inferSelect
