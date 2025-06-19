"use client";
import { useChat } from "@ai-sdk/react";
import InputPanel from "@/components/InputPanel";
import { useCallback, useState } from "react";
import { useChatStore } from "@/app/store/chatStore";

export default function InputPanelWrapper() {
  const setChatStatus = useChatStore((s) => s.setChatStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { input, setInput, handleSubmit } = useChat(); // 会自动复用 ChatContainer 中的上下文

  const handleSendMessage = useCallback(() => {
    if (!input.trim()) return;
    setIsSubmitting(true);
    setChatStatus("loading");
    handleSubmit(new Event("submit"));
  }, [input]);

  return (
    <InputPanel
      value={input}
      onChange={setInput}
      isLoading={isSubmitting}
      onSend={handleSendMessage}
    />
  );
}
