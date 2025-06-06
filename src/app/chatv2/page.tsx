"use client";
import ChatWorkspace from "@/components/ChatWorkspace";
import InputPanel from "@/components/InputPanel";
import { useChat } from "@ai-sdk/react";
import { useState, useCallback } from "react";

export default function Chat(props) {
  const [isLoading, setIsLoading] = useState(false);

  // chat相关逻辑
  const {
    error,
    input,
    setInput,
    status,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    onFinish(message, { usage, finishReason }) {
      console.log("Usage", usage);
      console.log("FinishReason", finishReason);
      setIsLoading(false); // 完成时设置 loading 为 false
    },
  });

  const handleSendMessage = useCallback(() => {
    if (!input.trim()) return; // 如果输入为空，不发送

    // 发送消息
    setIsLoading(true);
    handleSubmit(new Event("submit")); // 触发 useChat 的提交
  }, [input]);

  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <ChatWorkspace messages={messages} />
      </div>
      <InputPanel
        value={input}
        onChange={setInput}
        isLoading={isLoading}
        onSend={handleSendMessage}
      />
    </>
  );
}
