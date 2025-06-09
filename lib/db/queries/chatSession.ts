// lib/db/queries/chatSession.ts

import { db } from "@lib/db"; // 你的 drizzle client 实例
import { chatSession } from "../schema"; // 表定义
import { eq } from "drizzle-orm";

// 查询指定 userId 下的所有会话
// 待办 查询失败怎么办
export async function getSessionsByUserId(userId: string) {
  const sessions = await db
    .select()
    .from(chatSession)
    .where(eq(chatSession.userId, userId))
    .orderBy(chatSession.updatedAt); // 按更新时间排序（可选）

  return sessions;
}
