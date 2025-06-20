"use client";

import { useChatStore } from "../chat-store-provider";

export function ControlPanel() {
  // 获取重置函数（不订阅状态，所以状态变化不会重渲染这个组件）
  const reset = useChatStore((state) => state.reset);

  // 获取所有状态用于显示（会在任何状态变化时重渲染）
  const allState = useChatStore((state) => ({
    user: state.user,
    count: state.count,
    messageCount: state.messages.length,
  }));

  console.log("ControlPanel 重渲染");

  return (
    <div>
      <div className="mb-4 rounded border bg-white p-3">
        <h3 className="mb-2 font-semibold">当前状态:</h3>
        <div className="space-y-1 text-sm">
          <div>用户: {allState.user}</div>
          <div>计数: {allState.count}</div>
          <div>消息数: {allState.messageCount}</div>
        </div>
      </div>

      <button
        onClick={reset}
        className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        重置所有状态
      </button>
    </div>
  );
}
