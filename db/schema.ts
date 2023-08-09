import { relations } from "drizzle-orm";
import { boolean, char, jsonb, pgEnum, pgTable, primaryKey, real, smallint, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const roleEnum = pgEnum("role", 
    ["VENDOR", "CUSTOMER", "ADMIN"]
)

export const users = pgTable('users', {
    uuid: uuid("uuid").defaultRandom().primaryKey(),
    username: varchar("username",{length: 200}).unique().notNull(),
    email: varchar("email",{length: 200}).unique().notNull(),
    phone: varchar("phone", {length: 11}).unique(),
    socialUser: boolean("social_user").default(false),
    password: varchar("password",{length: 200}),
    role: roleEnum("role").default("CUSTOMER"),
    cart: jsonb("cart").default([]),
})

export const couponCodes = pgTable("coupon_codes", {
    uuid: uuid("uuid").defaultRandom().primaryKey(),
    code: char("code",{length: 6}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    username: varchar("username").references(() => users.username).notNull().unique()
})

export const products = pgTable("products", {
    uuid: uuid("uuid").defaultRandom().primaryKey(),
    category: varchar("category", {length: 50}).notNull(),
    description: varchar("description", {length: 1000}).notNull(),
    price: real("price").notNull(),
    image: varchar("image", {length: 500}).notNull(),
    name: varchar("name", {length: 100}).notNull(),
    vendorId: uuid("vendor_id").references(() => users.uuid).notNull()
})

// Modelling many to many relationship
export const students = pgTable("students", {
    uuid: uuid("uuid").defaultRandom().primaryKey(),
    name: varchar("name", {length: 50}).notNull(),
    age: smallint("age").notNull()
})

export const classes = pgTable("classes", {
    uuid: uuid("uuid").defaultRandom().primaryKey(),
    name: varchar("name", {length: 50}).notNull(),
    teacher: varchar("teacher", {length: 50}).notNull(),
})

export const students_classes = pgTable("students_classes", {
    studentId: uuid("student_id").references(() => students.uuid).notNull(),
    classId: uuid("class_id").references(() => classes.uuid).notNull()
},
({classId, studentId}) => ({pkey: primaryKey(studentId, classId)})
)
////////////////////////////////////////////

// --------------- Relations ---------------

// users-couponCodes one-to-one and users-products one-to-many relations
export const usersRelations = relations(users, ({one, many}) => ({
    couponInfo: one(couponCodes, {
      fields: [users.username],
      references: [couponCodes.username]
    }),
    productsInfo: many(products)
  }))

// products-users one-to-many relation
export const productsRelations = relations(products, ({one}) => ({
    vendor: one(users, {
        fields: [products.vendorId],
        references: [users.uuid]
    })
}))

// students-classes many-to-many relations
export const studentsRelation = relations(students, ({many}) => ({students_classes: many(students_classes)}))

export const classesRealtion = relations(classes, ({many}) => ({students_classes: many(students_classes)}))

export const studentsClassesRelation = relations(students_classes, ({one}) => ({
  student: one(students, {
    fields: [students_classes.studentId],
    references: [students.uuid]
  }),
  class: one(classes, {
    fields: [students_classes.classId],
    references: [classes.uuid]
  })
}))
////////////////////////////////////////
