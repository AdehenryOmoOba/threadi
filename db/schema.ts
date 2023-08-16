import { relations } from "drizzle-orm";
import { boolean, char, integer, json, jsonb, pgEnum, pgTable, primaryKey, real, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  username: varchar("username",{length: 200}).unique().notNull(),
  name: varchar("name",{length: 200}).notNull(),
  image: varchar("image"),
  bio: text("bio"),
  onboarded: boolean("onboarded").default(false),
})

export const communities = pgTable("communities", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  username: varchar("username",{length: 200}).unique().notNull(),
  name: varchar("name",{length: 200}).notNull(),
  image: varchar("image"),
  bio: text("bio"),
  createdBy: uuid("created_by").notNull().references(() => users.uuid).notNull(),
})
// 
export const threadis = pgTable("threadis", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  text: varchar("text", {length: 200}).notNull(),
  author: uuid("author").references(() => users.uuid).notNull(),
  community: uuid("community").references(() => communities.uuid),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  likes: text("likes").array(),
  reposts: text("reposts").array(),
  sharesCount: integer("shares_count").default(0),
  viewsCount: integer("views_count").default(0)
})

export const commentsReplies = pgTable("comments_replies", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  parentId: uuid("parent_id").notNull(),
  text: varchar("text", {length: 200}).notNull(),
  author: uuid("author").references(() => users.uuid).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  likes: text("likes").array(),
  reposts: text("reposts").array(),
  sharesCount: integer("shares_count").default(0),
  viewsCount: integer("views_count").default(0)
})

// Junction table
export const users_communities = pgTable("users_communities", {
  userId: uuid("user_id").notNull().references(() => users.uuid),
  communityId: uuid("community_id").notNull().references(() => communities.uuid)
},
(table) => ({
  pk: primaryKey(table.userId, table.communityId)
})
)

// test table
export const test = pgTable("test", {
  id: uuid("id").defaultRandom().primaryKey(),
  color: varchar("colors").notNull(),
  names: text("names").array() 
})


// Relations
export const usersRelations = relations(users, ({many}) => ({
  threadisList: many(threadis),
  communitiesInfo: many(users_communities)
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
  commentsList: many(commentsReplies)
}))

export const commentsRepliesRelations = relations(commentsReplies, ({one,many}) => ({
  parentThreadisInfo: one(threadis, {
    fields: [commentsReplies.parentId],
    references: [threadis.uuid]
  }),
  parentCommentInfo: one(commentsReplies, {
    fields: [commentsReplies.parentId],
    references: [commentsReplies.uuid]
  }),
  repliesInfo: many(commentsReplies)
}))

export const communitiesRelations = relations(communities, ({many, one}) => ({
  membersInfo: many(users_communities),
  threadisList: many(threadis),
  authorInfo: one(users, {
    fields: [communities.createdBy],
    references: [users.uuid]
  })
}))

export const usersCommunitiesRelations = relations(users_communities, ({one}) => ({
  userInfo: one(users, {
    fields: [users_communities.userId],
    references: [users.uuid]
  }),
  communityInfo: one(communities, {
    fields: [users_communities.communityId],
    references: [communities.uuid]
  })
}))

