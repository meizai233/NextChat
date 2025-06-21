"use client";

import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/app/providers/chat-store-provider";
import HeaderPanel from "@/components/HeaderPanel";
import ChatWorkspace from "@/components/ChatWorkspace";
import InputPanelWrapper from "@/components/InputPanelWrapper";
import { useMessages } from "@/hooks/useMessages";
import { useInitialMessages } from "@/hooks/useInitialMessages";

export default function ChatPage() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setChatStatus = useChatStore((s) => s.setChatStatus);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const config = useChatStore((s) => s.config);

  const { messages: historyMessages, mutate } = useMessages();
  const initialMessages = useInitialMessages();

  const {
    messages: sessionMessages,
    input,
    setInput,
    handleSubmit,
  } = useChat({
    id: currentSessionId!,
    initialMessages,
    body: { config },
    onFinish(_, { finishReason }) {
      if (finishReason === "unknown") {
        setChatStatus("error");
        setErrorMessage("⚠️ AI 回复异常：finishReason 为 unknown");
      } else {
        setChatStatus("success");
        setErrorMessage(null);
        mutate([...historyMessages, ...sessionMessages], false); // 合并新消息
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
      <ChatWorkspace messages={historyMessages} />
      <InputPanelWrapper
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
