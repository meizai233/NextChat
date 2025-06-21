// pages/index.js
"use client";

import { useChat } from "@ai-sdk/react";
export default function Chat() {
  const { error, input, status, handleInputChange, handleSubmit, messages, reload, stop } = useChat({
    onFinish(message, { usage, finishReason }) {
      console.log("Usage", usage);
      console.log("FinishReason", finishReason);
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 聊天记录 */}
      <div className="space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "text-right" : "text-left"}>
            <span className="bg-gray-100 rounded px-4 py-2 inline-block">{message.content}</span>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} placeholder="Type a message..." className="w-full border rounded p-2" />
      </form>
    </div>
  );
}
