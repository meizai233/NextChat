// src/plugins/dispatcher.ts
import { getCurrentWeather } from "./weatherPlugin";

export async function callPluginFunction(name: string, args: any) {
  if (name === "get_current_weather") {
    return await getCurrentWeather(args.location, args.unit);
  }

  throw new Error("未注册的插件函数: " + name);
}
