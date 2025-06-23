import { StateCreator } from "zustand";

export interface PluginSlice {
  enabledPlugins: string[]; // 保存启用的插件ID
  togglePlugin: (id: string) => void;
  setEnabledPlugins: (ids: string[]) => void;
}

export const createPluginSlice: StateCreator<PluginSlice> = (set, get) => ({
  enabledPlugins: [],
  togglePlugin: (id) =>
    set((state) => ({
      enabledPlugins: state.enabledPlugins.includes(id)
        ? state.enabledPlugins.filter((pid) => pid !== id)
        : [...state.enabledPlugins, id],
    })),
  setEnabledPlugins: (ids) => set({ enabledPlugins: ids }),
});
