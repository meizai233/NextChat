import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function streamTextLikeLLM({
  messages,
  onToolCall,
  onStepFinish,
  onToken,
  onFinish,
  tools = [],
}: {
  messages: any[];
  onToolCall?: (tool: any) => void;
  onStepFinish?: (step: any) => void;
  onToken?: (token: string) => void;
  onFinish?: (text: string) => void;
  tools;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages,
    tools,
  });

  let fullText = "";

  // 好像是从他的底层sdk读取
  for await (const chunk of response) {
    const delta = chunk.choices[0].delta;
    // token 增量
    if (delta.content) {
      fullText += delta.content;
      onToken?.(delta.content);
    }

    // function call 请求
    if (delta.tool_calls) {
      for (const tool of delta.tool_calls) {
        onToolCall?.({
          name: tool.function.name,
          args: JSON.parse(tool.function.arguments),
        });
      }
    }
  }
}
