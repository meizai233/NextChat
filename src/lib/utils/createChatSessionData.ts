// src/lib/utils/createChatSession.ts
import { v4 as uuidv4 } from "uuid";

export function createChatSessionData(title = "新会话") {
  const id = uuidv4();
  const now = new Date();

  return {
    id,
    title,
    createdAt: now,
    updatedAt: now,
  };
}
