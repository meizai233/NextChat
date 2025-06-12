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
        className={`prose prose-sm  max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm 
        ${isUser ? 'bg-user-bubble-bg' : 'bg-ai-bubble-bg'}     prose-p:my-2 prose-pre:p-3 prose-code:before:content-none prose-code:after:content-none`}
        dangerouslySetInnerHTML={{
          __html: marked.parse(content),
        }}
      />
    </div>
  );
}
