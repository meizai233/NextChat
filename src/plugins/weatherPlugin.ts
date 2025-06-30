import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: ".env.local" });

// const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
// const AMAP_KEY = process.env.AMAP_KEY;
const OPENWEATHER_API_KEY = "";
const AMAP_KEY = "";

export async function geocodeCity(cityName) {
  const url = `https://restapi.amap.com/v3/geocode/geo?key=${AMAP_KEY}&address=${encodeURIComponent(
    cityName,
  )}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`请求失败：${res.statusText}`);

  const data = await res.json();
  console.log(data, "dataa");
  const info = data.geocodes[0]; // 默认取第一个匹配项
  console.log(info, "info");
  const [lng, lat] = info.location.split(",");

  return {
    formattedAddress: info.formatted_address,
    lon: parseFloat(lng),
    lat: parseFloat(lat),
    province: info.province,
    city: info.city || info.province, // 有时 city 字段为空
  };
}

// 集成到天气查询函数
export async function getCurrentWeather(location, unit = "celsius") {
  // 先用地理编码获取坐标

  const { lat, lon } = await geocodeCity(location);
  console.log(lat, lon, "getCurrentWeather");
  console.log(lat, lon, "lat, lon");
  const units = unit === "celsius" ? "metric" : "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}&lang=zh_cn`;
  console.log("urlll", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`获取天气失败: ${res.statusText}`);

  const data = await res.json();

  return {
    location: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    unit: unit === "celsius" ? "°C" : "°F",
  };
}
