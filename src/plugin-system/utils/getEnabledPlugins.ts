import { wrapPluginTool } from "./wrapPluginTool";
import { pluginToolMap } from "../pluginToolMap";
export function getEnabledPlugins(
  enabledPluginIds: string[],
  pluginKeys: Record<string, Record<string, string>>,
) {
  return Object.fromEntries(
    enabledPluginIds
      ?.filter((id) => pluginToolMap[id])
      ?.map((id) => {
        const baseTool = pluginToolMap[id];
        const wrappedTool = wrapPluginTool(baseTool, id, pluginKeys);
        return [id, wrappedTool];
      }),
  );
}
