import saveObjectToFile from "@/utils/saveObjectToFile";
import { createOpenAI } from "@ai-sdk/openai";
import { db } from "@lib/db";
import { chatMessage } from "@lib/db/schema";
import { streamText } from "ai";
import { nanoid } from "nanoid";
import { getEnabledPlugins } from "@/plugin-system/utils/getEnabledPlugins";
import { PluginResult } from "@/plugins/weather/types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` and config from the body of the request
  const {
    messages,
    id: chatSessionId,
    config,
    plugins: enabledPluginIds,
    "plugin-keys": pluginKeys,
  } = await req.json();

  const userMessage = messages[messages.length - 1]; // 用户发的最后一条消息
  // 使用用户配置创建 OpenAI 实例
  const openai = createOpenAI({
    apiKey: config?.openaiApiKey || process.env.OPENAI_API_KEY!, // 如果用户没有提供，使用环境变量
    baseURL: config?.openaiEndpoint || process.env.OPENAI_BASE_URL,
  });

  const enabledTools = getEnabledPlugins(enabledPluginIds, pluginKeys);

  console.log(enabledTools, "enabledTools");
  // Call the language model
  // 待办 streamText是啥呢
  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    tools: enabledTools,
    maxSteps: 3,
    async onError(err) {
      saveObjectToFile(err, "err");
    },
    // todo showUI步骤放在step好还是onfinish好
    async onStepFinish(step) {
      // todo 拦截所有错误回复并抛出
      for (const result of step.toolResults || []) {
        const toolResult = result.result as PluginResult<unknown>;
        if (
          !toolResult?.success &&
          toolResult?.errorCode === "MISSING_API_KEY"
        ) {
          const keys = toolResult.meta?.missingKeys || [];
          console.log("🧩 插件缺少 API Key:", keys.join(", "));
          // TODO: 你可以弹出 UI 引导设置这些 keys
        }
      }
    },

    async onFinish(a) {
      saveObjectToFile(a);
      // todo 此处显示错误
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
