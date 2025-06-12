import { StateCreator } from "zustand";

export interface ChatConfig {
  openaiEndpoint: string;
  openaiApiKey: string;
}

export interface ConfigSlice {
  config: ChatConfig;
  setConfig: (config: Partial<ChatConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: ChatConfig = {
  openaiEndpoint:
    process.env.NEXT_PUBLIC_OPENAI_BASE_URL || "https://newapi.585dg.com",
  openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
};

export const createConfigSlice: StateCreator<
  ConfigSlice,
  [],
  [],
  ConfigSlice
> = (set) => ({
  config: defaultConfig,
  setConfig: (newConfig) =>
    set((state) => ({
      config: {
        ...state.config,
        ...newConfig,
      },
    })),
  resetConfig: () => set({ config: defaultConfig }),
});
