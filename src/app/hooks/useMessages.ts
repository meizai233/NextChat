import useSWR from "swr";
import { useChatStore } from "@store/chat-store";
import { getMessagesBySessionIdAction } from "../actions/message";

// 用于获取当前会话消息
export function useMessages() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  // 待办 这里要研究一下
  const {
    data: messages,
    error,
    isLoading,
    mutate,
  } = useSWR(
    currentSessionId ? ["messages", currentSessionId] : null,
    () => getMessagesBySessionIdAction(currentSessionId!),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    messages: messages ?? [],
    isLoading,
    error,
    refreshMessages: mutate, // 可用于重新拉取
  };
}
