"use client";
import useSWR from "swr";
import { useChatStore } from "@/app/providers/chat-store-provider";
import { getMessagesBySessionIdAction } from "../app/actions/message";

// 用于获取当前会话消息
export function useMessages() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
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
      // suspense: true,
    },
  );

  return {
    messages: messages ?? [],
    isLoading,
    error,
    mutate, // 可用于重新拉取
  };
}
