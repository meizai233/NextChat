import type { StateCreator } from "zustand";
import { loadFromStorage, persistToStorage } from "@/utils/storage";

export interface PluginSlice {
  enabledPlugins: string[];
  setEnabledPlugins: (ids: string[]) => void;
  togglePlugin: (id: string) => void;
}

const SLICE_KEY = "plugins";

export const createPluginSlice =
  (initPlugins?: string[]): StateCreator<PluginSlice, [], [], PluginSlice> =>
  (set) => {
    const localState =
      typeof window !== "undefined"
        ? loadFromStorage<string[]>(SLICE_KEY)
        : undefined;

    return {
      enabledPlugins: localState || initPlugins || [],

      setEnabledPlugins: (ids) => {
        set(() => {
          if (typeof window !== "undefined") {
            persistToStorage(SLICE_KEY, ids);
          }
          return { enabledPlugins: ids };
        });
      },

      togglePlugin: (id) => {
        set((state) => {
          const newIds = state.enabledPlugins.includes(id)
            ? state.enabledPlugins.filter((pid) => pid !== id)
            : [...state.enabledPlugins, id];

          if (typeof window !== "undefined") {
            persistToStorage(SLICE_KEY, newIds);
          }

          return { enabledPlugins: newIds };
        });
      },
    };
  };
