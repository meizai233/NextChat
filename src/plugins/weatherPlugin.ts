import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: ".env.local" });

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getCurrentWeather(location, unit = "celsius") {
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
