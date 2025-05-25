import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// 创建 OpenAI 实例
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL, // 你的代理 URL
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, id } = await req.json();

  // Call the language model
  // 待办 streamText是啥呢
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
      console.log(text, "text");
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}
