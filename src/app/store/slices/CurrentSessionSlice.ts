import { StateCreator } from "zustand";

export type ChatStatus = "idle" | "loading" | "success" | "error";

export interface CurrentSessionSlice {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;

  chatStatus: ChatStatus;
  setChatStatus: (status: ChatStatus) => void;
}

export const createCurrentSessionSlice: StateCreator<
  CurrentSessionSlice,
  [],
  [],
  CurrentSessionSlice
> = (set) => ({
  currentSessionId: null,
  setCurrentSessionId: (id) => set({ currentSessionId: id }),

  chatStatus: "idle",
  setChatStatus: (status) => set({ chatStatus: status }),
});
