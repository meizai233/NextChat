import { StateCreator } from "zustand";
import Cookies from "js-cookie";

export type ChatStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "restoring"
  | "plugin-calling";

// Step 相关类型定义
interface ToolCall {
  toolName: string;
  toolCallId: string;
}

export interface ToolResult {
  toolCallId: string;
  content?: string;
  url?: string;
}

export interface StepMessage {
  finishReason: string;
  text?: string;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}

export interface CurrentSessionSlice {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;

  chatStatus: ChatStatus;
  setChatStatus: (status: ChatStatus) => void;

  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;

  // 新增 steps 相关状态
  steps: StepMessage[];
  addStep: (step: StepMessage) => void;
  clearSteps: () => void;
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
        Cookies.set("currentSessionId", id, {
          path: "/",
          expires: 30,
          sameSite: "Lax",
        });
      },

      chatStatus: "idle",
      setChatStatus: (status) => set({ chatStatus: status }),

      errorMessage: null,
      setErrorMessage: (message) => set({ errorMessage: message }),

      // steps 相关状态实现
      steps: [],
      addStep: (step) =>
        set((state) => ({
          steps: [...state.steps, step],
        })),
      clearSteps: () => set({ steps: [] }),
    };
  };
