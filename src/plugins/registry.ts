// 注册插件函数
import { tool } from "ai";
import { z } from "zod";
import { getCurrentWeather } from "./weatherPlugin";
// import { searchWeb } from "./searchPlugin";

export const pluginToolMap = {
  get_current_weather: tool({
    description: "获取某地天气",
    parameters: z.object({
      location: z.string().describe("城市名称"),
    }),
    execute: async ({ location }) => await getCurrentWeather(location),
  }),
  // web_search: tool({
  //   description: "通过网络搜索信息",
  //   parameters: z.object({
  //     query: z.string().describe("用户查询内容"),
  //   }),
  //   execute: async ({ query }) => await searchWeb(query),
  // }),
};
