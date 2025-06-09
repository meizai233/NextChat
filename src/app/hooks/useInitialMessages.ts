import { useMemo } from "react";
import { nanoid } from "nanoid";
import { ChatMessage } from "ai"; // 根据你的类型定义替换

export function useInitialMessages(): ChatMessage[] {
  return useMemo(
    () => [
      {
        id: nanoid(),
        role: "system",
        content: "你是一个助手",
      },
    ],
    [], // ✅ 只生成一次
  );
}
