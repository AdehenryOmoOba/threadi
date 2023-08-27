CREATE TABLE IF NOT EXISTS "comments_replies" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid NOT NULL,
	"text" varchar(200) NOT NULL,
	"author" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"likes" text[],
	"reposts" text[],
	"shares_count" integer DEFAULT 0,
	"views_count" integer DEFAULT 0,
	"community" varchar(200) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "communities" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(200) NOT NULL,
	"name" varchar(200) NOT NULL,
	"image" varchar,
	"bio" text,
	"created_by" uuid NOT NULL,
	CONSTRAINT "communities_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"colors" varchar NOT NULL,
	"names" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "threadis" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar(200) NOT NULL,
	"author" uuid NOT NULL,
	"community" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"likes" text[],
	"reposts" text[],
	"shares_count" integer DEFAULT 0,
	"views_count" integer DEFAULT 0,
	"parent_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar,
	"name" varchar(200),
	"image" varchar,
	"bio" text,
	"onboarded" boolean DEFAULT false NOT NULL,
	"social_media_user" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_communities" (
	"user_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
	CONSTRAINT users_communities_user_id_community_id PRIMARY KEY("user_id","community_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_replies" ADD CONSTRAINT "comments_replies_author_users_uuid_fk" FOREIGN KEY ("author") REFERENCES "users"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "communities" ADD CONSTRAINT "communities_created_by_users_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "users"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "threadis" ADD CONSTRAINT "threadis_author_users_uuid_fk" FOREIGN KEY ("author") REFERENCES "users"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "threadis" ADD CONSTRAINT "threadis_community_communities_uuid_fk" FOREIGN KEY ("community") REFERENCES "communities"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_communities" ADD CONSTRAINT "users_communities_user_id_users_uuid_fk" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_communities" ADD CONSTRAINT "users_communities_community_id_communities_uuid_fk" FOREIGN KEY ("community_id") REFERENCES "communities"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
