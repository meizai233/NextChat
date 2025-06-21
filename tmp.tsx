// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CounterStore,
  createCounterStore,
  initCounterStore,
} from "@/stores/counter-store";
// 消费 每个客户端组件都初始化创建一次createCounter
export type CounterStoreApi = ReturnType<typeof createCounterStore>;

// 创建一个ctx
export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}
// 基于ctx封装一个provider
export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCounterStore(initCounterStore());
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};
// useXXXStore 这样的情况是不是要把context包在最外面???
export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
