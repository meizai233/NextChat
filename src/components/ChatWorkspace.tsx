"use client";
import { useEffect, useRef } from "react";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import ErrorMessage from "./ErrorMessage";
import { renderPluginUIs } from "@/utils/renderPluginUIs";
import { useChatStore } from "@/app/providers/chat-store-provider";

interface ChatMessage {
  id: string;
  role: string;
  content: string;
}

interface Props {
  messages: ChatMessage[];
  error?: string | null;
}

export default function ChatWorkspace({ messages, error }: Props) {
  const chatStatus = useChatStore((s) => s.chatStatus);
  const steps = useChatStore((s) => s.steps);

  // 添加滚动到底部的功能
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatStatus]);

  useEffect(() => console.log(steps, "addstep", [steps]));

  return (
    <div className="flex min-h-[360px] flex-1 flex-col space-y-4 overflow-y-auto p-4">
      {messages.map((message) => {
        if (message.role === "user") {
          return <UserMessage key={message.id} content={message.content} />;
        }

        // if (message.role === "plugin-calling") {
        //   const pluginData = JSON.parse(message.content);
        //   return renderPluginUIs({
        //     finishReason: pluginData.finishReason,
        //     toolCalls: pluginData.toolCalls,
        //     toolResults: pluginData.toolResults,
        //   }).map((ui, index) => (
        //     <PluginMessage key={`${message.id}-${index}`} ui={ui} />
        //   ));
        // }

        return <AIMessage key={message.id} content={message.content} />;
      })}

      {/* 插件ui */}
      {steps.map((step) => {
        const toolResults = step.response?.messages?.find(
          (msg) => msg.role === "tool",
        )?.content;
        return toolResults ? renderPluginUIs(toolResults) : null;
      })}

      {/* loading 气泡：只显示在 assistant 回复还没回来时 */}
      {chatStatus === "loading" ||
        (chatStatus === "plugin-calling" && <AIMessage content="思考中..." />)}
      {error && <ErrorMessage content={error} />}

      {/* 滚动锚点 */}
      <div ref={bottomRef} />
    </div>
  );
}
