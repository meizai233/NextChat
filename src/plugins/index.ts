import { PluginApiKey } from "@/plugin-system/types";
import { pluginKeyMeta } from "@/plugin-system/pluginKeyRegistry";

// 插件元信息列表（UI 显示用）
export interface PluginMeta {
  id: string;
  name: string;
  description: string;
  icon?: string; // 可选图标路径
  apiKeys?: PluginApiKey[]; // API Key 配置
}

export const availablePlugins: PluginMeta[] = [
  {
    id: "get_current_weather",
    name: "天气查询",
    description: "获取指定城市的当前天气情况",
    icon: "/icons/weather.png",
    apiKeys: pluginKeyMeta.get_current_weather,
  },
  {
    id: "web_crawl",
    name: "网页爬虫",
    description: "抓取并提取网页正文内容",
    icon: "/icons/web_crawl.png", // 你可以放个合适图标
  },
  {
    id: "web_search",
    name: "网页搜索",
    description: "通过互联网搜索获取实时信息",
    icon: "/icons/search.png",
    apiKeys: pluginKeyMeta.web_search,
  },
];
