import { pgTable, pgEnum, pgSchema, AnyPgColumn, unique, uuid, varchar, text, boolean, integer, foreignKey, timestamp, primaryKey } from "drizzle-orm/pg-core"


import { sql } from "drizzle-orm"

export const users = pgTable("users", {
	uuid: uuid("uuid").defaultRandom().primaryKey().notNull(),
	email: varchar("email", { length: 200 }).notNull(),
	password: varchar("password"),
	name: varchar("name", { length: 200 }),
	image: varchar("image"),
	bio: text("bio"),
	onboarded: boolean("onboarded").default(false).notNull(),
	socialMediaUser: boolean("social_media_user").default(false).notNull(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const communities = pgTable("communities", {
	uuid: uuid("uuid").defaultRandom().primaryKey().notNull(),
	username: varchar("username", { length: 200 }).notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	image: varchar("image"),
	bio: text("bio"),
	createdBy: uuid("created_by").notNull(),
},
(table) => {
	return {
		communitiesUsernameUnique: unique("communities_username_unique").on(table.username),
	}
});

export const threadisCount = pgTable("threadis_count", {
	totalCount: integer("total_count").default(0),
	threadisCountUuid: uuid("threadis_count_uuid").defaultRandom().primaryKey().notNull(),
});

export const threadis = pgTable("threadis", {
	uuid: uuid("uuid").defaultRandom().primaryKey().notNull(),
	text: varchar("text", { length: 200 }).notNull(),
	author: uuid("author").notNull(),
	community: uuid("community"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	likes: text("likes").array(),
	reposts: text("reposts").array(),
	sharesCount: integer("shares_count").default(0),
	viewsCount: integer("views_count").default(0),
	parentId: uuid("parent_id"),
	replyCount: integer("reply_count").default(0),
},
(table) => {
	return {
		threadisParentIdFkey: foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.uuid]
		}),
		threadisParentIdThreadisUuidFk: foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.uuid]
		}),
	}
});

export const threadisWithTotalCount = pgTable("threadis_with_total_count", {
	uuid: uuid("uuid"),
	text: varchar("text", { length: 200 }),
	author: uuid("author"),
	community: uuid("community"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	likes: text("likes").array(),
	reposts: text("reposts").array(),
	sharesCount: integer("shares_count"),
	viewsCount: integer("views_count"),
	parentId: uuid("parent_id"),
	totalCount: integer("total_count"),
});

export const usersCommunities = pgTable("users_communities", {
	userId: uuid("user_id").notNull().references(() => users.uuid).references(() => users.uuid),
	communityId: uuid("community_id").notNull().references(() => communities.uuid).references(() => communities.uuid),
},
(table) => {
	return {
		usersCommunitiesUserIdCommunityId: primaryKey(table.userId, table.communityId)
	}
});