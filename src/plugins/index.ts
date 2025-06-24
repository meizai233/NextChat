// 插件元信息列表（UI 显示用）
export interface PluginMeta {
  id: string;
  name: string;
  description: string;
  icon?: string; // 可选图标路径
}

export const availablePlugins: PluginMeta[] = [
  {
    id: "get_current_weather",
    name: "天气查询",
    description: "获取指定城市的当前天气情况",
    icon: "/icons/weather.png",
  },
  // {
  //   id: "web_search",
  //   name: "网页搜索",
  //   description: "通过互联网搜索获取实时信息",
  //   icon: "/icons/search.png",
  // },
];
