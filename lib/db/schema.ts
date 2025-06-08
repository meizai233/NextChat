// schema.ts
import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  pgEnum,
  json,
} from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";

// Role 枚举定义
export const roleEnum = pgEnum("role", ["user", "assistant"]);

// 会话表
export const chatSession = pgTable("chat_session", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  userId: uuid("user_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// 消息表
export const chatMessage = pgTable("chat_message", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatSessionId: uuid("chat_session_id")
    .notNull()
    .references(() => chatSession.id),
  role: roleEnum("role").notNull(),
  content: text("content").notNull(),
  attachments: json("attachments").default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }), // 可选：登录用户的昵称
  isGuest: boolean("is_guest").notNull().default(true), // 区分是否为匿名用户
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
