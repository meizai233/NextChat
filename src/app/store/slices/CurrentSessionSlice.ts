import { StateCreator } from "zustand";

export type ChatStatus = "idle" | "loading" | "success" | "error";

export interface CurrentSessionSlice {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;
}

export interface CurrentSessionSliceInit {
  currentSessionId?: string | null;
}

export const createCurrentSessionSlice =
  (
    init?: CurrentSessionSliceInit,
  ): StateCreator<CurrentSessionSlice, [], [], CurrentSessionSlice> =>
  (set) => {
    return {
      currentSessionId: init?.currentSessionId ?? null,
      setCurrentSessionId: (id) => set({ currentSessionId: id }),
    };
  };
