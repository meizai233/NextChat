"use client";

import { ReactNode, createContext, useContext, useRef } from "react";
import { ChatStore, ChatStoreApi, createChatStore } from "./chat-store";
import { useStore } from "zustand";

// 创建ctx
export const ChatStoreContext = createContext<ChatStoreApi | undefined>(
  undefined,
);

// Provider Props 类型
export interface ChatStoreProviderProps {
  children: ReactNode;
  initialState?: Partial<ChatStore>;
}

// Provider 组件
export const ChatStoreProvider = ({
  children,
  initialState,
}: ChatStoreProviderProps) => {
  const storeRef = useRef<ChatStoreApi | null>(null);

  // 只创建一次 store
  if (storeRef.current === null) {
    storeRef.current = createChatStore(initialState);
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChatStore = <T,>(selector: (store: ChatStore) => T): T => {
  const chatStoreContext = useContext(ChatStoreContext);

  if (!chatStoreContext) {
    throw new Error("useChatStore must be used within ChatStoreProvider");
  }

  // 这里是真正的精确订阅！
  return useStore(chatStoreContext, selector);
};
