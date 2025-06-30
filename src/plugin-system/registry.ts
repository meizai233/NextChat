// 注册插件函数
import { tool } from "ai";
import { z } from "zod";
import * as weather from "@/plugins/weather";
import { crawlWebPage } from "../plugins/crawlPlugin";

export const pluginToolMap = {
  get_current_weather: tool({
    description: "获取某地天气",
    parameters: z.object({
      location: z.string().describe("城市名称"),
    }),
    execute: async (parmas) => await weather.execute(parmas),
  }),
  web_crawl: tool({
    description: "爬取网页正文内容",
    parameters: z.object({
      url: z.string().url().describe("网页链接"),
    }),
    execute: async ({ url }) => await crawlWebPage(url),
  }),
  // web_search: tool({
  //   description: "通过互联网搜索信息",
  //   parameters: z.object({
  //     query: z.string().describe("用户查询内容"),
  //   }),
  //   execute: async ({ query }) => await searchWeb(query),
  // }),
};
