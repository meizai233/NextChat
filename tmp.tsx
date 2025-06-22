import OpenAI from "openai";
import fetch from "node-fetch";

// 你的 API Key，放在环境变量里更安全
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

if (!OPENAI_API_KEY || !OPENWEATHER_API_KEY) {
  throw new Error("请设置 OPENAI_API_KEY 和 OPENWEATHER_API_KEY 环境变量");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// 调用天气API
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
  // 第一次对话，告诉模型天气函数
  const userMessage = "今天天气怎么样？请告诉我北京的天气";

  // 1. 发送请求，让模型决定是否调用函数
  const response1 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userMessage }],
    functions: [
      {
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
    ],
    function_call: "auto", // 自动决定是否调用函数
  });

  const message1 = response1.choices[0].message;

  if (message1.function_call) {
    // 2. 模型想调用函数，解析参数
    const { name, arguments: argsString } = message1.function_call;
    debugger;
    const args = JSON.parse(argsString);

    if (name === "get_current_weather") {
      // 3. 调用真实天气接口
      const weather = await getWeather(args.location, args.unit);

      // 4. 把函数执行结果传回模型，让模型回复用户
      const response2 = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: userMessage },
          message1, // 函数调用请求
          {
            role: "function",
            name: "get_current_weather",
            content: JSON.stringify(weather),
          },
        ],
      });

      console.log("AI 回复：", response2.choices[0].message.content);
    }
  } else {
    // 如果模型不调用函数，直接输出内容
    console.log("AI 回复：", message1.content);
  }
}

main().catch(console.error);
