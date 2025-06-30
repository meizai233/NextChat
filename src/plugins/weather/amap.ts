import fetch from "node-fetch";
import { amapInfocodeMap } from "./errorMap";
import { PluginResult } from "./types";
import { config } from "dotenv";

config({ path: ".env.local" });

export async function geocodeCity({
  cityName,
  keys,
}: {
  cityName: string;
  keys: Record<string, string>;
}): Promise<PluginResult<{ lat: number; lon: number }>> {
  if (!keys.AMAP_KEY) {
    return { success: false, error: "未配置 AMAP_KEY" };
  }

  const url = `https://restapi.amap.com/v3/geocode/geo?key=${keys.AMAP_KEY}&address=${encodeURIComponent(
    cityName,
  )}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1") {
      const message =
        amapInfocodeMap[data.infocode] || `未知错误：${data.infocode}`;
      return { success: false, error: `AMap 错误：${message}` };
    }

    const loc = data.geocodes[0];
    const [lon, lat] = loc.location.split(",");

    return {
      success: true,
      data: { lat: parseFloat(lat), lon: parseFloat(lon) },
    };
  } catch (e) {
    return { success: false, error: `AMap 网络请求失败：${e.message}` };
  }
}
