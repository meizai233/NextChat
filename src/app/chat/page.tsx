"use client";
import ChatWorkspace from "@/components/ChatWorkspace";
import InputPanel from "@/components/InputPanel";
import { useChat } from "@ai-sdk/react";
import { useState, useCallback } from "react";
import { useMessages } from "../hooks/useMessages";
import { useChatStore } from "../store/chatStore";
import { useInitialMessages } from "../hooks/useInitialMessages";

export default function Chat() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const config = useChatStore((s) => s.config);
  const setChatStatus = useChatStore((s) => s.setChatStatus);

  const { messages: historyMessages, isLoading: isHistoryLoading } =
    useMessages();
  const initialMessages = useInitialMessages();
  const {
    messages: sessionMessages,
    input,
    setInput,
    handleSubmit,
    error,
    status,
    stop,
    reload,
  } = useChat({
    id: currentSessionId!,
    initialMessages, // ✅ 不会每次都变
    body: {
      config, // 传递配置到 API
    },
    onFinish(message, { usage, finishReason }) {
      if (finishReason === "unknown") {
        setChatStatus("error");
        setErrorMessage("⚠️ AI 回复异常：finishReason 为 unknown");
      } else {
        setChatStatus("success");
        setErrorMessage(null);
      }
    },
    onError(error) {
      let message = "发生未知错误";

      if (typeof error === "string") {
        message = error;
      } else if (error instanceof Error) {
        message = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        message = (error as any).message;
      }

      setChatStatus("error");
      setErrorMessage(message);
    },
  });

  const handleSendMessage = useCallback(() => {
    if (!input.trim()) return;

    setIsSubmitting(true);
    handleSubmit(new Event("submit"));
    setChatStatus("loading");
  }, [input]);

  // 合并历史和会话消息
  const allMessages = [...historyMessages, ...sessionMessages];

  if (isHistoryLoading) return <p>加载中...</p>;

  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <ChatWorkspace messages={allMessages} />
      </div>
      <InputPanel
        value={input}
        onChange={setInput}
        isLoading={isSubmitting}
        onSend={handleSendMessage}
      />
    </>
  );
}
