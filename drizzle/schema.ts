import { pgTable, pgEnum, pgSchema, AnyPgColumn, unique, uuid, varchar, text, boolean, foreignKey, timestamp, integer, serial, primaryKey } from "drizzle-orm/pg-core"


import { sql } from "drizzle-orm"

export const users = pgTable("users", {
	uuid: uuid("uuid").defaultRandom().primaryKey().notNull(),
	username: varchar("username", { length: 200 }).notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	image: varchar("image"),
	bio: text("bio"),
	onboarded: boolean("onboarded").default(false),
},
(table) => {
	return {
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});

export const communities = pgTable("communities", {
	uuid: uuid("uuid").defaultRandom().primaryKey().notNull(),
	username: varchar("username", { length: 200 }).notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	image: varchar("image"),
	bio: text("bio"),
	createdBy: uuid("created_by").notNull().references(() => users.uuid),
},
(table) => {
	return {
		communitiesUsernameUnique: unique("communities_username_unique").on(table.username),
	}
});

export const threadis = pgTable("threadis", {
	uuid: uuid("uuid").defaultRandom().primaryKey().notNull(),
	parentId: uuid("parent_id"),
	text: varchar("text", { length: 200 }).notNull(),
	author: uuid("author").notNull().references(() => users.uuid),
	community: uuid("community").references(() => communities.uuid),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	sharesCount: integer("shares_count").default(0),
	viewsCount: integer("views_count").default(0),
	likes: varchar("likes"),
	reposts: varchar("reposts"),
	commentsReplies: varchar("comments_replies"),
});

export const test = pgTable("test", {
	id: serial("d").primaryKey().notNull(),
	color: varchar("color"),
	names: text("names").array(),
});

export const usersCommunities = pgTable("users_communities", {
	userId: uuid("user_id").notNull().references(() => users.uuid),
	communityId: uuid("community_id").notNull().references(() => communities.uuid),
},
(table) => {
	return {
		usersCommunitiesUserIdCommunityId: primaryKey(table.userId, table.communityId)
	}
});