"use client";

import { ReactNode, createContext, useContext, useRef } from "react";
import { ChatStore, ChatStoreApi, createChatStore } from "../store/chatStore";
import { useStore } from "zustand";
import { mergeInitialState } from "@/utils/mergeInitialState";

// 创建ctx
export const ChatStoreContext = createContext<ChatStoreApi | undefined>(
  undefined,
);

// Provider Props 类型
export interface ChatStoreProviderProps {
  children: ReactNode;
  initialState?: Partial<ChatStore>;
}

// Provider 提供一个全局storeRef变量 注入给所有children
export const ChatStoreProvider = ({
  children,
  initialState,
}: ChatStoreProviderProps) => {
  const storeRef = useRef<ChatStoreApi | null>(null);
  // 只创建一次 store
  if (storeRef.current === null) {
    const mergedState = mergeInitialState(initialState ?? {});
    storeRef.current = createChatStore(mergedState);
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

  return useStore(chatStoreContext, selector);
};
