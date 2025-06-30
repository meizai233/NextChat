import { loadFromStorage, persistToStorage } from "@/utils/storage";
import { StateCreator } from "zustand";

export interface PluginKeySlice {
  pluginKeys: Record<string, Record<string, string>>; // 插件ID -> keyName -> keyValue

  setPluginKey: (pluginId: string, keyName: string, keyValue: string) => void;
  removePluginKey: (pluginId: string, keyName: string) => void;
  getPluginKey: (pluginId: string, keyName: string) => string | undefined;
}

const PLUGIN_KEY_STORAGE = "plugin-keys";

export const createPluginKeySlice: StateCreator<
  PluginKeySlice,
  [],
  [],
  PluginKeySlice
> = (set, get) => {
  const localKeys =
    typeof window !== "undefined"
      ? loadFromStorage<Record<string, Record<string, string>>>(
          PLUGIN_KEY_STORAGE,
        )
      : {};

  return {
    pluginKeys: localKeys || {},

    setPluginKey: (pluginId, keyName, keyValue) => {
      set((state) => {
        debugger;
        const updated = {
          ...state.pluginKeys,
          [pluginId]: {
            ...(state.pluginKeys[pluginId] || {}),
            [keyName]: keyValue,
          },
        };
        debugger;

        persistToStorage(PLUGIN_KEY_STORAGE, updated);
        return { pluginKeys: updated };
      });
    },

    removePluginKey: (pluginId, keyName) => {
      set((state) => {
        const updatedPluginKeys = { ...state.pluginKeys };
        delete updatedPluginKeys[pluginId]?.[keyName];
        persistToStorage(PLUGIN_KEY_STORAGE, updatedPluginKeys);
        return { pluginKeys: updatedPluginKeys };
      });
    },

    getPluginKey: (pluginId, keyName) => {
      debugger;
      return get().pluginKeys?.[pluginId]?.[keyName];
    },
  };
};
