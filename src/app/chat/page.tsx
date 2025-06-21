"use client";

import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/app/providers/chat-store-provider";
import HeaderPanel from "@/components/HeaderPanel";
import ChatWorkspace from "@/components/ChatWorkspace";
import InputPanel from "@/components/InputPanel";
import { useMessages } from "@/hooks/useMessages";
import { useInitialMessages } from "@/hooks/useInitialMessages";
import { useMemo } from "react";

export default function ChatPage() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setChatStatus = useChatStore((s) => s.setChatStatus);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const config = useChatStore((s) => s.config);

  const { messages: historyMessages, mutate } = useMessages();

  const initialMessages = useMemo(() => {
    return historyMessages && historyMessages.length > 1
      ? historyMessages
      : useInitialMessages();
  }, [historyMessages]);

  const {
    messages: sessionMessages,
    input,
    setInput,
    handleSubmit,
  } = useChat({
    id: currentSessionId!,
    initialMessages,
    body: { config },
    onResponse() {
      setChatStatus("restoring");
    },
    onFinish(_, { finishReason }) {
      if (finishReason === "unknown") {
        setChatStatus("error");
        setErrorMessage("⚠️ AI 回复异常：finishReason 为 unknown");
      } else {
        setChatStatus("success");
        setErrorMessage(null);
      }
    },
    onError(error) {
      setChatStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "未知错误");
    },
  });

  return (
    <div className="flex h-dvh w-full min-w-0 flex-col">
      <HeaderPanel />
      <ChatWorkspace messages={[...sessionMessages]} />
      <InputPanel value={input} onChange={setInput} onSend={handleSubmit} />
    </div>
  );
}
