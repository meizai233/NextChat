"use client";
import { useEffect, useRef } from "react";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import ErrorMessage from "./ErrorMessage";
import { useChatStore } from "@/app/providers/chat-store-provider";

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  toolInvocations?: Array<{
    toolCallId: string;
    toolName: string;
    args: Record<string, string | number | boolean>;
  }>;
}

interface Props {
  messages: ChatMessage[];
  error?: string | null;
}

export default function ChatWorkspace({ messages, error }: Props) {
  const chatStatus = useChatStore((s) => s.chatStatus);

  // 添加滚动到底部的功能
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatStatus]);

  return (
    <div className="flex min-h-[360px] flex-1 flex-col space-y-4 overflow-y-auto p-4">
      {messages.map((message) => {
        if (message.role === "user") {
          return <UserMessage key={message.id} content={message.content} />;
        }

        return (
          <AIMessage
            key={message.id}
            content={message.content}
            toolInvocations={message.toolInvocations}
          />
        );
      })}
      {error && <ErrorMessage content={error} />}

      {/* 滚动锚点 */}
      <div ref={bottomRef} />
    </div>
  );
}
