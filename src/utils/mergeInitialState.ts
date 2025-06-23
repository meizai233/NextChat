export const mergeInitialState = (
  serverState: Partial<ChatStore>,
): Partial<ChatStore> => {
  const merged = { ...serverState };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(
        process.env.NEXT_PUBLIC_CHAT_STORAGE_KEY || "chat-config",
      );
      const parsed = JSON.parse(raw ?? "{}");
      const state = parsed?.state ?? {};

      // 对每个 key，如果不在 serverState 中，就添加进来
      for (const key in state) {
        if (!(key in merged)) {
          merged[key as keyof ChatStore] = state[key];
        }
      }
    } catch {
      // ignore
    }
  }

  return merged;
};
