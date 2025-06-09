"use client";
import { useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // 可选：换成你喜欢的主题

marked.setOptions({
  highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
});

export default function ChatWorkspace({ messages }: { messages: any[] }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);

  return (
    <div className="flex min-h-[360px] flex-col space-y-4 overflow-y-auto p-4 dark:bg-[#1a1a1a]">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`prose prose-sm dark:prose-invert max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm ${
                isUser
                  ? "bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                  : "bg-white text-black dark:bg-[#2a2a2a] dark:text-white"
              } prose-p:my-2 prose-pre:p-3 prose-code:before:content-none prose-code:after:content-none`}
              dangerouslySetInnerHTML={{
                __html: marked.parse(message.content),
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
