"use client";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";

export default function ChatWorkspace({ messages }: { messages: any[] }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);

  return (
    <div className="flex min-h-[360px] flex-col space-y-4 overflow-y-auto p-4 dark:bg-[#1a1a1a]">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} content={message.content} />
        ) : (
          <AIMessage key={message.id} content={message.content} />
        ),
      )}
    </div>
  );
}
