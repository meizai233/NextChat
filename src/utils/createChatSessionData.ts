// src/lib/utils/createChatSession.ts
import { nanoid } from "nanoid";

export function createChatSessionData(userId, title = "新会话") {
  const id = nanoid();

  const now = new Date();

  return {
    id,
    userId,
    title,
    createdAt: now,
    updatedAt: now,
  };
}
