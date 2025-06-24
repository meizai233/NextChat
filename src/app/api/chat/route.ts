import { pluginToolMap } from "@/plugins/registry";
import { createOpenAI } from "@ai-sdk/openai";
import { db } from "@lib/db";
import { chatMessage } from "@lib/db/schema";
import { streamText } from "ai";
import { nanoid } from "nanoid";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` and config from the body of the request
  const {
    messages,
    id: chatSessionId,
    config,
    plugins: enabledPluginIds,
  } = await req.json();

  const userMessage = messages[messages.length - 1]; // 用户发的最后一条消息
  // 使用用户配置创建 OpenAI 实例
  const openai = createOpenAI({
    apiKey: config?.openaiApiKey || process.env.OPENAI_API_KEY!, // 如果用户没有提供，使用环境变量
    baseURL: config?.openaiEndpoint || process.env.OPENAI_BASE_URL,
  });

  const enabledTools = Object.fromEntries(
    Object.entries(pluginToolMap).filter(([name]) =>
      enabledPluginIds.includes(name),
    ),
  );

  // Call the language model
  // 待办 streamText是啥呢
  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    tools: enabledTools,
    maxSteps: 3,

    async onFinish(a) {
      debugger;
      const { text } = a;
      await db.insert(chatMessage).values([
        {
          id: nanoid(),
          chatSessionId,
          role: "user",
          content: userMessage.content,
        },
        {
          id: nanoid(),
          chatSessionId,
          role: "assistant",
          content: text,
        },
      ]);
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}
