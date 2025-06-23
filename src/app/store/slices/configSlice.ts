import type { StateCreator } from "zustand";
import { defaultConfig } from "@/constants/defaultConfig";
import { loadFromStorage, persistToStorage } from "@/utils/storage";

export interface ConfigSlice {
  config: {
    openaiEndpoint: string;
    openaiApiKey: string;
  };
  setConfig: (newConfig: Partial<ConfigSlice["config"]>) => void;
  resetConfig: () => void;
}

const SLICE_KEY = "config";

export const createConfigSlice =
  (
    initConfig?: Partial<ConfigSlice["config"]>,
  ): StateCreator<ConfigSlice, [], [], ConfigSlice> =>
  (set) => {
    const localState =
      typeof window !== "undefined"
        ? loadFromStorage<ConfigSlice["config"]>(SLICE_KEY)
        : undefined;

    return {
      config: {
        ...defaultConfig,
        ...localState,
        ...initConfig,
      },

      setConfig: (newConfig) =>
        set((state) => {
          const updatedConfig = {
            ...state.config,
            ...newConfig,
          };

          if (typeof window !== "undefined") {
            persistToStorage(SLICE_KEY, updatedConfig);
          }

          return { config: updatedConfig };
        }),

      resetConfig: () => {
        if (typeof window !== "undefined") {
          persistToStorage(SLICE_KEY, defaultConfig);
        }
        set({ config: defaultConfig });
      },
    };
  };
