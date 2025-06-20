"use client";

import { useChatStore } from "../chat-store-provider";

export function CounterComponent() {
  // 精确订阅：只有 count 变化时才重渲染
  const count = useChatStore((state) => state.count);
  const increment = useChatStore((state) => state.increment);

  console.log("CounterComponent 重渲染");

  return (
    <div>
      <p className="mb-4 text-2xl font-bold">计数: {count}</p>
      <button
        onClick={increment}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        +1
      </button>
    </div>
  );
}
