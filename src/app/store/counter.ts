// src/store/counter.ts
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  // persist(
  (set) => ({
    count: Math.random(), // 每次渲染都会生成不同的值
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  }),
  //   {
  //     name: "counter-storage",
  //   },
  // ),
);
