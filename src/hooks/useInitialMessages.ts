import { nanoid } from "nanoid";
import { ChatMessage } from "ai"; // 根据你的类型定义替换

export function useInitialMessages(): ChatMessage[] {
  const i = {
    id: nanoid(),
    role: "system",
    content: "你是一个助手",
  };
  return [i];
}
