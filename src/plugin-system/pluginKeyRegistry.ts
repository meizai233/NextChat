import { PluginApiKeyConfig } from "./types";

export const pluginApiKeys: PluginApiKeyConfig = {
  get_current_weather: [
    {
      key: "OPENWEATHER_API_KEY",
      name: "OpenWeather API Key",
      description: "用于获取天气数据的 OpenWeather API 密钥",
      placeholder: "请输入 OpenWeather API Key",
      required: true,
    },
    {
      key: "AMAP_KEY",
      name: "高德地图 API Key",
      description: "用于地理编码的高德地图 API 密钥",
      placeholder: "请输入高德地图 API Key",
      required: true,
    },
  ],
  web_search: [
    {
      key: "BING_SEARCH_API_KEY",
      name: "Bing Search API Key",
      description: "用于网页搜索的 Bing API 密钥",
      placeholder: "请输入 Bing Search API Key",
      required: true,
    },
  ],
};

export const pluginRequiredKeysMap: Record<string, string[]> = Object.entries(
  pluginApiKeys,
).reduce(
  (acc, [pluginId, keys]) => ({
    ...acc,
    [pluginId]: keys.filter((k) => k.required).map((k) => k.key),
  }),
  {},
);

export function checkMissingKeys(pluginId: string): string[] {
  const requiredKeys = pluginRequiredKeysMap[pluginId] || [];
  return requiredKeys.filter((key) => !process.env[key]);
}
