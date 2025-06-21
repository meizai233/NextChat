"use client";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import { useChatStore } from "@/app/providers/chat-store-provider";
import { DotPulse } from "@uiball/loaders";
import ErrorMessage from "./ErrorMessage";
// todo 你是一个助手应该显示在最开始 而且应该加个判断
// todo key重复问题
export default function ChatWorkspace({ messages }: { messages: any[] }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);
  const chatStatus = useChatStore((s) => s.chatStatus);

  const bottomRef = useRef<HTMLDivElement>(null);
  // 每次 messages 或 status 变化 → 滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatStatus]);

  return (
    <div className="flex min-h-[360px] flex-col space-y-4 overflow-y-auto p-4">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} content={message.content} />
        ) : (
          <AIMessage key={message.id} content={message.content} />
        ),
      )}

      {/* loading 气泡：只显示在 assistant 回复还没回来时 */}
      {chatStatus === "loading" && (
        <div className="flex justify-start">
          <div className="max-w-[75%] px-4 py-3">
            <DotPulse size={40} speed={1.3} color="black" />
          </div>
        </div>
      )}
      {chatStatus === "error" && <ErrorMessage />}

      {/* 锚点元素：滚动的目标 */}
      <div ref={bottomRef} />
    </div>
  );
}
