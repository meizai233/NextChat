import OpenAI from "openai";
import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL, // 你的代理地址
});

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeather(location, unit = "celsius") {
  const units = unit === "celsius" ? "metric" : "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    location,
  )}&units=${units}&appid=${OPENWEATHER_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`获取天气失败: ${res.statusText}`);
  const data = await res.json();

  return {
    location: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
  };
}

async function main() {
  const userMessage = "帮我查一下北京现在的天气";

  const response1 = await openai.chat.completions.create({
    model: "gpt-4o", // 或 gpt-4o-mini 等
    messages: [{ role: "user", content: userMessage }],
    tools: [
      {
        type: "function",
        function: {
          name: "get_current_weather",
          description: "获取某地当前天气",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "城市名称，比如 Beijing",
              },
              unit: {
                type: "string",
                enum: ["celsius", "fahrenheit"],
                description: "温度单位",
              },
            },
            required: ["location"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  const message1 = response1.choices[0].message;
  const toolCall = message1.tool_calls?.[0];

  if (toolCall?.function?.name === "get_current_weather") {
    const args = JSON.parse(toolCall.function.arguments);
    const weather = await getWeather(args.location, args.unit);

    const response2 = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: userMessage },
        {
          role: "assistant",
          tool_calls: [toolCall],
        },
        {
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(weather),
        },
      ],
    });

    console.log("🌤 AI 回复：", response2.choices[0].message?.content);
  } else {
    console.log("🗣 AI 回复：", message1.content);
  }
}

main().catch(console.error);
