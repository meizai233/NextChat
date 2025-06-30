// plugin-system/gateway.ts
import { pluginToolMap } from "@/plugin-system/registry";
import { wrapPluginTool } from "./utils/wrapPluginTool";

export function getEnabledPlugins(
  enabledPluginIds: string[],
  pluginKeys: Record<string, Record<string, string>>,
) {
  return Object.fromEntries(
    enabledPluginIds
      .filter((id) => pluginToolMap[id])
      .map((id) => {
        const baseTool = pluginToolMap[id];
        const wrappedTool = wrapPluginTool(baseTool, id, pluginKeys);
        return [id, wrappedTool];
      }),
  );
}
