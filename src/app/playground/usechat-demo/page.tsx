// pages/index.js
"use client";

import { useChat } from "./useChat";

// import { useChat } from "@ai-sdk/react";
export default function Chat() {
  const {
    error,
    input,
    status,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    onFinish(message, { usage, finishReason }) {
      console.log("Usage", usage);
      console.log("FinishReason", finishReason);
    },
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      {/* 聊天记录 */}
      <div className="mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <span className="inline-block rounded bg-gray-100 px-4 py-2">
              {message.content}
            </span>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="w-full rounded border p-2"
        />
      </form>
    </div>
  );
}
