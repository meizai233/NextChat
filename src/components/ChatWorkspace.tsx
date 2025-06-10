"use client";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import { useChatStore } from "@/app/store/chatStore";
import { DotPulse } from "@uiball/loaders";

export default function ChatWorkspace({ messages }: { messages: any[] }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);

  const chatStatus = useChatStore((s) => s.chatStatus);

  return (
    <div className="flex min-h-[360px] flex-col space-y-4 overflow-y-auto p-4 dark:bg-[#1a1a1a]">
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
          <div className="max-w-[75%] px-4 py-3 dark:bg-[#2a2a2a]">
            <DotPulse size={40} speed={1.3} color="black" />
          </div>
        </div>
      )}
    </div>
  );
}
