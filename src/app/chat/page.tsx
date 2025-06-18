"use client";
import ChatWorkspace from "@/components/ChatWorkspace";
import InputPanel from "@/components/InputPanel";
import { useChat } from "@ai-sdk/react";
import { useState, useCallback, Suspense } from "react";
import { useMessages } from "../hooks/useMessages";
import { useChatStore } from "../store/chatStore";
import { useInitialMessages } from "../hooks/useInitialMessages";

export default function Chat() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const config = useChatStore((s) => s.config);
  const setChatStatus = useChatStore((s) => s.setChatStatus);

  const { messages: historyMessages, mutate: updateMessages } = useMessages();
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
    initialMessages,
    body: {
      config, // 传递配置到 API
    },
    onFinish(message, { usage, finishReason }) {
      console.log("sessionMessages", sessionMessages);
      console.log("message", message);
      if (finishReason === "unknown") {
        setChatStatus("error");
        setErrorMessage("⚠️ AI 回复异常：finishReason 为 unknown");
      } else {
        setChatStatus("success");
        setErrorMessage(null);
        updateMessages([...historyMessages, ...sessionMessages], false);
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

  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <Suspense fallback={<p>Loading...</p>}>
          <ChatWorkspace messages={historyMessages} />
        </Suspense>
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
