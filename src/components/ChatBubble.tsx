"use client";
// components/ChatBubble.tsx
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

marked.setOptions({
  highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
});

interface ChatBubbleProps {
  content: string;
  isUser: boolean;
}

export default function ChatBubble({ content, isUser }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`prose prose-sm dark:prose-invert max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? "bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
            : "bg-white text-black dark:bg-[#2a2a2a] dark:text-white"
        } prose-p:my-2 prose-pre:p-3 prose-code:before:content-none prose-code:after:content-none`}
        dangerouslySetInnerHTML={{
          __html: marked.parse(content),
        }}
      />
    </div>
  );
}
