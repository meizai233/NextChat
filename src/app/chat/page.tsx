"use client";

import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/app/providers/chat-store-provider";
import HeaderPanel from "@/components/HeaderPanel";
import ChatWorkspace from "@/components/ChatWorkspace";
import InputPanel from "@/components/InputPanel";
import { useMessages } from "@/hooks/useMessages";
import { useInitialMessages } from "@/hooks/useInitialMessages";
import { useCallback, useEffect, useMemo, useState } from "react";
import { startPluginStepStream } from "@/hooks/startPluginStepStream";

export default function ChatPage() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setChatStatus = useChatStore((s) => s.setChatStatus);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const config = useChatStore((s) => s.config);
  const enabledPlugins = useChatStore((s) => s.enabledPlugins);
  const pluginKeys = useChatStore((s) => s.pluginKeys);
  const addStep = useChatStore((s) => s.addStep);
  const [stopPluginStream, setStopPluginStream] = useState<(() => void) | null>(
    null,
  );
  const { messages: historyMessages, mutate } = useMessages();

  const initialMessages = useMemo(() => {
    console.log(historyMessages, "history");
    return historyMessages && historyMessages.length > 1
      ? historyMessages
      : useInitialMessages();
  }, [historyMessages]);

  const {
    messages: sessionMessages,
    input,
    setInput,
    handleSubmit: baseHandleSubmit,
  } = useChat({
    id: currentSessionId!,
    initialMessages,
    body: { config, plugins: enabledPlugins, "plugin-keys": pluginKeys },
    onResponse() {
      setChatStatus("restoring");
    },
    // 在这里直接render一个UI即可
    onToolCall(obj) {
      console.log(obj, "onToolcall");
      setChatStatus("plugin-calling");
    },
    onToolCallResult(val) {
      // debugger;
      console.log(val, "onToolCallResult");
    },
    onFinish(msg, { finishReason }) {
      if (finishReason === "unknown") {
        setChatStatus("error");
        setErrorMessage("⚠️ AI 回复异常：finishReason 为 unknown");
      } else {
        setChatStatus("success");
        setErrorMessage(null);
      }
      stopPluginStream?.(); // 结束后关闭监听
      setStopPluginStream(null);
    },
    onError(error) {
      setChatStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "未知错误");
      stopPluginStream?.(); // 结束后关闭监听
      setStopPluginStream(null);
    },
  });

  useEffect(() => {
    console.log(sessionMessages, "sessionMessages");
  }, [sessionMessages]);

  const handleSubmit = useCallback(
    async (e) => {
      const stop = startPluginStepStream({
        currentSessionId,
        onMessage: (msg) => {
          addStep(msg);
          console.log("plugin step >>>", msg);
        },
      });
      setStopPluginStream(() => stop);

      baseHandleSubmit(e);
    },
    [baseHandleSubmit, currentSessionId],
  );

  return (
    <div className="flex h-dvh w-full min-w-0 flex-col">
      <HeaderPanel />
      <ChatWorkspace messages={[...sessionMessages]} />
      <InputPanel value={input} onChange={setInput} onSend={handleSubmit} />
    </div>
  );
}
