import { defaultConfig } from "@/constants/defaultConfig"; // 或你自己的默认值
import type { StateCreator } from "zustand";

export interface ConfigSlice {
  config: {
    openaiEndpoint: string;
    openaiApiKey: string;
    // 你还可以加更多字段
  };
  setConfig: (newConfig: Partial<ConfigSlice["config"]>) => void;
  resetConfig: () => void;
}

// 用于持久化 config 到 localStorage 的 key
const CONFIG_STORAGE_KEY = "chat-config";

// 从 localStorage 读取已有 state
export const loadChatStoreFromStorage = (): Partial<ConfigSlice["config"]> => {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    const parsed = JSON.parse(raw ?? "{}");
    return parsed?.state ?? {};
  } catch {
    return {};
  }
};

// 写入 config 到 localStorage 的 state 结构
const persistConfigToStorage = (config: ConfigSlice["config"]) => {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    const next = {
      ...parsed,
      state: {
        ...parsed?.state,
        config, // 只更新 config 部分
      },
    };

    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.error("保存 config 到 localStorage 失败:", err);
  }
};

export const createConfigSlice =
  (
    initConfig?: Partial<Config>,
  ): StateCreator<ConfigSlice, [], [], ConfigSlice> =>
  (set) => ({
    config: {
      ...defaultConfig,
      ...initConfig,
    },

    setConfig: (newConfig) =>
      set((state) => {
        const updatedConfig = {
          ...state.config,
          ...newConfig,
        };

        if (typeof window !== "undefined") {
          persistConfigToStorage(updatedConfig);
        }

        return { config: updatedConfig };
      }),

    resetConfig: () => {
      if (typeof window !== "undefined") {
        persistConfigToStorage(defaultConfig);
      }
      set({ config: defaultConfig });
    },
  });
