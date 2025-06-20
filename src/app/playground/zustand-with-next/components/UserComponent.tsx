"use client";

import { useChatStore } from "../chat-store-provider";

export function UserComponent() {
  // 精确订阅：只有 user 变化时才重渲染
  const user = useChatStore((state) => state.user);
  const setUser = useChatStore((state) => state.setUser);

  console.log("UserComponent 重渲染");

  return (
    <div>
      <p className="mb-2">
        当前用户: <strong>{user}</strong>
      </p>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2"
        placeholder="输入用户名"
      />
    </div>
  );
}
