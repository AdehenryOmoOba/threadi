import { pgTable,foreignKey, uuid, varchar, timestamp, integer, unique, text, boolean, primaryKey, } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"


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
	replyCount: integer("reply_count").default(0)
},
(table) => {
	return {
		threadisParentIdFkey: foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.uuid]
		})
	}
});

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

export const usersCommunities = pgTable("users_communities", {
	userId: uuid("user_id").notNull().references(() => users.uuid),
	communityId: uuid("community_id").notNull().references(() => communities.uuid),
},
(table) => {
	return {
		usersCommunitiesUserIdCommunityId: primaryKey(table.userId, table.communityId)
	}
});


// Relations
export const usersRelations = relations(users, ({many}) => ({
  threadisList: many(threadis),
  communitiesInfo: many(usersCommunities)
}))

export const threadisRelations = relations(threadis, ({one, many}) => ({
  authorInfo: one(users, {
      fields: [threadis.author],
      references: [users.uuid]
  }),
  communitiesInfo: one(communities, {
    fields: [threadis.community],
    references: [communities.uuid]
  }),
  parentInfo: one(threadis, {
    fields: [threadis.parentId],
    references: [threadis.uuid]
  }),
}))



export const communitiesRelations = relations(communities, ({many, one}) => ({
  membersInfo: many(usersCommunities),
  threadisList: many(threadis),
  authorInfo: one(users, {
    fields: [communities.createdBy],
    references: [users.uuid]
  })
}))

export const usersCommunitiesRelations = relations(usersCommunities, ({one}) => ({
  userInfo: one(users, {
    fields: [usersCommunities.userId],
    references: [users.uuid]
  }),
  communityInfo: one(communities, {
    fields: [usersCommunities.communityId],
    references: [communities.uuid]
  })
}))

