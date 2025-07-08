import { FC } from "react";
import { SearchUI } from "./search/components/SearchUI";

// API Key 配置接口
interface ApiKeyConfig {
  key: string;
  name: string;
  description: string;
  placeholder: string;
  required: boolean;
}

// UI组件的类型定义
export type PluginUIComponent = FC<{
  pluginId: string;
  data?: {
    content?: string;
    url?: string;
    toolCallId?: string;
  };
}>;

// UI配置
export interface PluginUIConfig {
  component: PluginUIComponent;
  position: "sidebar" | "main" | "modal";
}

// 统一的插件配置接口
export interface Plugin {
  id: string;
  name: string;
  description: string;
  icon?: string;
  apiKeys?: ApiKeyConfig[];
  ui?: PluginUIConfig;
}

// 整合后的插件配置
export const pluginsMeta: Plugin[] = [
  {
    id: "get_current_weather",
    name: "天气查询",
    description: "获取指定城市的当前天气情况",
    icon: "/icons/weather.png",
    apiKeys: [
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
  },
  {
    id: "web_crawl",
    name: "网页爬虫",
    description: "抓取并提取网页正文内容",
    icon: "/icons/web_crawl.png",
  },
  {
    id: "web_search",
    name: "网页搜索",
    description: "通过互联网搜索获取实时信息",
    icon: "/icons/search.png",
    apiKeys: [
      {
        key: "SEARCH_API_IO_KEY",
        name: "SearchAPI.io Key",
        description: "用于网页搜索的 SearchAPI.io 密钥",
        placeholder: "请输入 SearchAPI.io 的 API Key",
        required: true,
      },
    ],
    ui: {
      component: SearchUI,
      position: "main",
    },
  },
];
