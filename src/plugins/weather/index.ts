import { geocodeCity } from "./amap";
import { getWeather } from "./openweather";

// weather.ts 插件逻辑
export async function execute({
  location,
  __pluginKeys: keys,
}: {
  location: string;
  __pluginKeys: Record<string, string>;
}) {
  const geo = await geocodeCity({ cityName: location, keys });
  if (!geo.success) return geo;

  const weather = await getWeather({
    lat: geo.data.lat,
    lon: geo.data.lon,
    keys,
  });
  return weather;
}
