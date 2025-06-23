import type { StateCreator } from "zustand";
import { persistToStorage } from "@/utils/storage";

export interface PluginSlice {
  enabledPlugins: string[];
  setEnabledPlugins: (ids: string[]) => void;
  togglePlugin: (id: string) => void;
}

// todo 还没检查是否可用
export const createPluginSlice: StateCreator<PluginSlice> = (set) => ({
  enabledPlugins: [],

  setEnabledPlugins: (ids) => {
    set(() => {
      // 持久化更新
      if (typeof window !== "undefined") {
        persistToStorage("plugins", ids);
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
        persistToStorage("plugins", newIds);
      }

      return { enabledPlugins: newIds };
    });
  },
});
