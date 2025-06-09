import { createOpenAI } from "@ai-sdk/openai";
import { db } from "@lib/db";
import { chatMessage } from "@lib/db/schema";
import { streamText } from "ai";
import { nanoid } from "nanoid";

// 创建 OpenAI 实例
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL, // 你的代理 URL
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, id: chatSessionId } = await req.json();

  const userMessage = messages[messages.length - 1]; // 用户发的最后一条消息

  // Call the language model
  // 待办 streamText是啥呢
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
      console.log(text, "text");
      // 👇 插入用户的消息
      await db.insert(chatMessage).values({
        id: nanoid(),
        chatSessionId,
        role: "user",
        content: userMessage.content,
      });

      // 👇 插入 AI 的回复
      await db.insert(chatMessage).values({
        id: nanoid(),
        chatSessionId,
        role: "assistant",
        content: text,
      });
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}
