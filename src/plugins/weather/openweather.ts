import fetch from "node-fetch";
import { PluginResult } from "./types";
import { config } from "dotenv";

config({ path: ".env.local" });
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeather({
  lat,
  lon,
  unit = "celsius",
  keys,
}: {
  lat: number;
  lon: number;
  unit?: "celsius" | "fahrenheit";
  keys: Record<string, string>;
}): Promise<
  PluginResult<{
    location: string;
    temperature: number;
    description: string;
    unit: string;
  }>
> {
  if (!keys.OPENWEATHER_API_KEY) {
    return { success: false, error: "未配置 OPENWEATHER_API_KEY" };
  }

  const units = unit === "celsius" ? "metric" : "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}&lang=zh_cn`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { success: false, error: `天气 API 请求失败：${res.statusText}` };
    }

    const data = await res.json();
    return {
      success: true,
      data: {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        unit: unit === "celsius" ? "°C" : "°F",
      },
    };
  } catch (e) {
    return { success: false, error: `天气接口异常：${e.message}` };
  }
}
