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
  const config = useChatStore((s) => s.config);

  const setChatStatus = useChatStore((s) => s.setChatStatus); // 加载历史消息（如数据库中的）
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
      console.log("Usage", usage);
      console.log("FinishReason", finishReason);
      setChatStatus("success");
      setIsSubmitting(false);
    },
    onError() {
      setChatStatus("error");
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
