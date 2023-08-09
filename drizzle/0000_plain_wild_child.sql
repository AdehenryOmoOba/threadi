DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('VENDOR', 'CUSTOMER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classes" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"teacher" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupon_codes" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" char(6) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"username" varchar NOT NULL,
	CONSTRAINT "coupon_codes_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" real NOT NULL,
	"image" varchar(500) NOT NULL,
	"name" varchar(100) NOT NULL,
	"vendor_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"age" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students_classes" (
	"student_id" uuid NOT NULL,
	"class_id" uuid NOT NULL,
	CONSTRAINT students_classes_student_id_class_id PRIMARY KEY("student_id","class_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(200) NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone" varchar(11),
	"social_user" boolean DEFAULT false,
	"password" varchar(200),
	"role" "role" DEFAULT 'CUSTOMER',
	"cart" jsonb DEFAULT '[]'::jsonb,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_codes" ADD CONSTRAINT "coupon_codes_username_users_username_fk" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_users_uuid_fk" FOREIGN KEY ("vendor_id") REFERENCES "users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students_classes" ADD CONSTRAINT "students_classes_student_id_students_uuid_fk" FOREIGN KEY ("student_id") REFERENCES "students"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students_classes" ADD CONSTRAINT "students_classes_class_id_classes_uuid_fk" FOREIGN KEY ("class_id") REFERENCES "classes"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
