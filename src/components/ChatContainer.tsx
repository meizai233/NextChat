"use client";
import { useChat } from "@ai-sdk/react";
import ChatWorkspace from "@/components/ChatWorkspace";
import { useInitialMessages } from "@/hooks/useInitialMessages";
import { useMessages } from "@/hooks/useMessages";
import { useChatStore } from "@/app/providers/chat-store-provider";

export default function ChatContainer() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const setChatStatus = useChatStore((s) => s.setChatStatus);
  const config = useChatStore((s) => s.config);
  const { messages: historyMessages, mutate } = useMessages();
  const initialMessages = useInitialMessages();
  const { messages: sessionMessages } = useChat({
    id: currentSessionId!,
    initialMessages,
    body: { config },
    onFinish(_, { finishReason }) {
      debugger;
      if (finishReason === "unknown") {
        setChatStatus("error");
        setErrorMessage("⚠️ AI 回复异常：finishReason 为 unknown");
      } else {
        setChatStatus("success");
        setErrorMessage(null);
        mutate([...historyMessages, ...sessionMessages], false);
      }
    },
    onError(error) {
      setChatStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "未知错误");
    },
  });

  return <ChatWorkspace messages={historyMessages} />;
}
