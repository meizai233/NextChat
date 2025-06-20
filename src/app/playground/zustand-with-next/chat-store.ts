// 服务端 - 只负责导出createXXXStore工厂函数

import { createStore } from "zustand/vanilla";
// 定义状态类型
export type ChatState = {
  user: string;
  count: number;
  messages: string[];
};

// 定义操作类型
export type ChatActions = {
  setUser: (user: string) => void;
  increment: () => void;
  addMessage: (message: string) => void;
  reset: () => void;
};

// 组合 Store 类型
export type ChatStore = ChatState & ChatActions;

// 默认初始状态
export const defaultInitState: ChatState = {
  user: "游客",
  count: 0,
  messages: [],
};

// Store Factory 函数
export const createChatStore = (initState: ChatState = defaultInitState) => {
  return createStore<ChatStore>()((set, get) => ({
    // 初始状态
    ...initState,

    // 操作方法
    setUser: (user) => set({ user }),

    increment: () =>
      set((state) => ({
        count: state.count + 1,
      })),

    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, `${state.user}: ${message}`],
      })),

    reset: () => set(defaultInitState),
  }));
};
// 导出 Store API 类型
export type ChatStoreApi = ReturnType<typeof createChatStore>;
