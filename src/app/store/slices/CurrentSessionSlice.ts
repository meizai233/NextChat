import { StateCreator } from "zustand";
import Cookies from "js-cookie"; // 安装：npm install js-cookie

export type ChatStatus = "idle" | "loading" | "success" | "error" | "restoring";

export interface CurrentSessionSlice {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;

  chatStatus: ChatStatus;
  setChatStatus: (status: ChatStatus) => void;

  errorMessage: string | null; // 新增字段
  setErrorMessage: (message: string | null) => void; // 新增函数
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
      setCurrentSessionId: (id) => {
        set({ currentSessionId: id });

        // ✅ 同步设置 cookie，供 SSR 使用
        Cookies.set("currentSessionId", id, {
          path: "/",
          expires: 30, // 持久时间可调
          sameSite: "Lax",
        });
      },

      chatStatus: "idle",
      setChatStatus: (status) => set({ chatStatus: status }),

      errorMessage: null,
      setErrorMessage: (message) => set({ errorMessage: message }),
    };
  };
