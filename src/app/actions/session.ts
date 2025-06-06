"use server";

import { createChatSessionData } from "@/lib/utils/createChatSessionData";
import { db } from "@lib/db"; // 数据库连接实例
import { chatSession } from "@lib/db/schema"; // 你的表定义

export async function createSession(title = "新会话") {
  const session = createChatSessionData(title);

  await db.insert(chatSession).values(session);

  return session; // 直接返回完整结构
}
