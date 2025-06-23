import { z } from "zod";
import { streamText, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

async function main() {
  // 创建了1个天气插件
  const weatherTool = tool({
    description: "获取某地天气",
    parameters: z.object({
      location: z.string().describe("城市名称"),
    }),
    execute: async ({ location }) => ({
      location,
      temperature: 70,
    }),
  });

  // 2. 第一次发送，模型发起 tool 调用
  const result1 = await streamText({
    model: openai("gpt-4o"),
    tools: { weather: weatherTool },
    maxSteps: 2, // ✅ 自动执行工具调用 + 继续生成最终回答

    prompt: "请告诉我北京的天气",
  });

  for await (const delta of result1.textStream) {
    process.stdout.write(delta); // 实时输出内容
  }
}
main();
