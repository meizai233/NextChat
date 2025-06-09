CREATE TYPE "public"."role" AS ENUM('user', 'assistant');--> statement-breakpoint
CREATE TABLE "chat_message" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"chat_session_id" varchar(21) NOT NULL,
	"role" "role" NOT NULL,
	"content" text NOT NULL,
	"attachments" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_session" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"user_id" varchar(21),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"is_guest" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
