import { db } from "@lib/db"; // 你的 drizzle client 实例
import { chatMessage } from "../schema"; // 表定义
import { eq } from "drizzle-orm";

export async function getMessagesBySessionId(sessionId: string) {
  const messages = await db
    .select()
    .from(chatMessage)
    .where(eq(chatMessage.chatSessionId, sessionId))
    .orderBy(chatMessage.createdAt); // 重要：按时间排序

  return messages;
}
