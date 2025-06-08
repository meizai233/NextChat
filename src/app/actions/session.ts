"use server";

import { createChatSessionData } from "@/lib/utils/createChatSessionData";
import { db } from "@lib/db"; // 数据库连接实例
import { chatSession } from "@lib/db/schema"; // 你的表定义
import { eq } from "drizzle-orm";
import { getSessionsByUserId } from "@lib/db/queries/chatSession";

export async function getUserSessions(userId: string) {
  return await getSessionsByUserId(userId);
}
export async function createSession(userId, title = "新会话") {
  const session = createChatSessionData(userId, title);

  await db.insert(chatSession).values(session);

  return session; // 直接返回完整结构
}

export async function renameSessionInDB(id: string, newTitle: string) {
  await db
    .update(chatSession)
    .set({
      title: newTitle,
      updatedAt: new Date(),
    })
    .where(eq(chatSession.id, id));
}

export async function deleteSessionInDB(id: string) {
  await db.delete(chatSession).where(eq(chatSession.id, id));
}
