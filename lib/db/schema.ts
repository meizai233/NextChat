import {
  pgTable,
  text,
  varchar,
  timestamp,
  pgEnum,
  json,
  boolean,
} from "drizzle-orm/pg-core";

// Role 枚举定义
export const roleEnum = pgEnum("role", ["user", "assistant"]);

// 会话表（原 uuid 改为 varchar(21)）
export const chatSession = pgTable("chat_session", {
  id: varchar("id", { length: 21 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 21 }), // 如果 user 表主键也是 nanoid，则这里也改成 varchar
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// 消息表（保持一致使用 nanoid）
export const chatMessage = pgTable("chat_message", {
  id: varchar("id", { length: 21 }).primaryKey(),
  chatSessionId: varchar("chat_session_id", { length: 21 }).notNull(),
  role: roleEnum("role").notNull(),
  content: text("content").notNull(),
  attachments: json("attachments").default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// 用户表（使用 varchar 作为主键）
export const user = pgTable("user", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: varchar("name", { length: 100 }),
  isGuest: boolean("is_guest").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
