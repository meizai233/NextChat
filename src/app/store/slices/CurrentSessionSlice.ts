import { StateCreator } from "zustand";

export type ChatStatus = "idle" | "loading" | "success" | "error";

export interface CurrentSessionSlice {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;

  chatStatus: ChatStatus;
  setChatStatus: (status: ChatStatus) => void;

  errorMessage: string | null; // 新增字段
  setErrorMessage: (message: string | null) => void; // 新增函数
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

  errorMessage: null,
  setErrorMessage: (message) => set({ errorMessage: message }),
});
