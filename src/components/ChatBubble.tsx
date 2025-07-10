"use client";
import { ReactNode } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { IconButton } from "./ui/icon-buttom";

marked.setOptions({
  highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
});

interface ActionItem {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface ChatBubbleProps {
  content: string;
  isUser: boolean;
  error?: boolean;
  actions?: ActionItem[];
  children?: ReactNode;
}

export default function ChatBubble({
  content,
  isUser,
  error = false,
  actions = [],
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
    >
      {/* 气泡 */}
      <div
        className={`prose prose-sm max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm transition-colors ${isUser ? "bg-user-bubble-bg" : error ? "bg-red-50 text-red-600" : "bg-ai-bubble-bg"} prose-p:my-2 prose-pre:p-3 prose-code:before:content-none prose-code:after:content-none`}
      >
        <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
        {/* 插件插槽 */}
        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* 操作按钮区域，放气泡左下角 */}
      {actions.length > 0 && (
        <div className="mt-1 flex">
          {actions.map((action, index) => (
            <IconButton
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              aria-label={action.label}
              title={action.label}
            >
              {action.icon}
            </IconButton>
          ))}
        </div>
      )}
    </div>
  );
}
