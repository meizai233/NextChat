import { ChatStore } from "@/app/store/chatStore";
import { loadChatStoreFromStorage } from "@/app/store/slices/configSlice";

export const mergeInitialState = (
  serverState: Partial<ChatStore>,
): Partial<ChatStore> => {
  const persisted = loadChatStoreFromStorage();
  return {
    ...persisted,
    ...serverState, // 优先以服务端状态为准（比如最新的 userId）
  };
};
