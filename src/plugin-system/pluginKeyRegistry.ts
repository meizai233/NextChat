import { pluginsMeta } from "@/plugins/pluginsMeta";

export const pluginRequiredKeysMap: Record<string, string[]> =
  pluginsMeta.reduce(
    (acc, plugin) => ({
      ...acc,
      [plugin.id]:
        plugin.apiKeys?.filter((k) => k.required).map((k) => k.key) || [],
    }),
    {},
  );

export function checkMissingKeys(pluginId: string): string[] {
  const requiredKeys = pluginRequiredKeysMap[pluginId] || [];
  return requiredKeys.filter((key) => !process.env[key]);
}
