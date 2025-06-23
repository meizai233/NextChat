const STORAGE_KEY = process.env.NEXT_PUBLIC_CHAT_STORAGE_KEY || "chat-config";

interface ChatLocalState {
  state: Record<string, any>; // 多个 slice 状态都挂在这里
}

// 加载某个 slice 的 state
export function loadFromStorage<T = any>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: ChatLocalState = JSON.parse(raw ?? "{}");
    return parsed?.state?.[key];
  } catch {
    return undefined;
  }
}

// 写入某个 slice 的 state
export function persistToStorage<T = any>(key: string, value: T) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: ChatLocalState = raw ? JSON.parse(raw) : {};

    const next: ChatLocalState = {
      ...parsed,
      state: {
        ...parsed?.state,
        [key]: value,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.error("保存到 localStorage 失败:", err);
  }
}
