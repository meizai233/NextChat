"use client";
import { useState } from "react";
import { useChatStore } from "../chat-store-provider";

export function MessagesComponent() {
  // 精确订阅：只有 messages 变化时才重渲染
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  const [newMessage, setNewMessage] = useState("");

  console.log("MessagesComponent 重渲染");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      addMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div>
      {/* 消息列表 */}
      <div className="mb-4 h-32 overflow-y-auto rounded border bg-white p-2">
        {messages.map((message, index) => (
          <div key={index} className="mb-1 text-sm">
            {message}
          </div>
        ))}
      </div>

      {/* 发送消息 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="输入消息..."
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          发送
        </button>
      </form>
    </div>
  );
}
