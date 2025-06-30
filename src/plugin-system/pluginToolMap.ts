import { tool } from "ai";
import { z } from "zod";
import * as weather from "@/plugins/weather";
import { crawlWebPage } from "../plugins/crawl";
import { searchWeb } from "@/plugins/search/searchWeb";

export const pluginToolMap = {
  get_current_weather: tool({
    description: "获取某地天气",
    parameters: z.object({
      location: z.string().describe("城市名称"),
    }),
    execute: async (params) => weather.execute(params),
  }),
  web_crawl: tool({
    description: "爬取网页正文内容",
    parameters: z.object({
      url: z.string().url().describe("网页链接"),
    }),
    execute: async (params) => await crawlWebPage(params),
  }),
  web_search: tool({
    description: "通过互联网搜索信息",
    parameters: z.object({
      query: z.string().describe("用户查询内容，例如：OpenAI 是什么"),
    }),
    async execute(params) {
      return await searchWeb(params);
    },
  }),
};
