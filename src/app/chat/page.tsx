// 管理一个chat的通话
"use client";
import { useCallback, useEffect, useState } from "react";
// 待办 能不能自动引入 @xxx
import ChatWorkspace from "@app/ui/ChatWorkspace";
import HeaderPanel from "@app/ui/HeaderPanel";
import InputPanel from "@app/ui/InputPanel";
import { useChat } from "@ai-sdk/react";

export default function ChatPage(props) {
  // const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // chat相关逻辑
  const { error, input, setInput, status, handleInputChange, handleSubmit, messages, reload, stop } = useChat({
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

  useEffect(() => {
    console.log("eff", input);
  }, [input]);

  return (
    <>
      <HeaderPanel />
      <ChatWorkspace messages={messages} />
      <InputPanel value={input} onChange={setInput} isLoading={isLoading} onSend={handleSendMessage} />
    </>
  );
}
