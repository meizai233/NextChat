import { pluginRequiredKeysMap } from "../pluginKeyRegistry";

export function checkMissingKeys(
  pluginId: string,
  keys: Record<string, string>,
): string[] {
  const requiredKeys = pluginRequiredKeysMap[pluginId] || [];
  return requiredKeys.filter((key) => !keys[key]);
}

type PluginExecuteFn<TParams, TResult> = (
  params: TParams,
  keys: Record<string, string>,
) => Promise<TResult>;

export function wrapPluginTool(
  baseTool: any,
  pluginId: string,
  pluginKeys: Record<string, Record<string, string>>,
) {
  return {
    ...baseTool,
    execute: async (params: any) => {
      try {
        const keys = pluginKeys[pluginId] || {};
        const missingKeys = checkMissingKeys(pluginId, keys);
        if (missingKeys.length > 0) {
          return {
            success: false,
            errorCode: "MISSING_API_KEY",
            error: "缺少必要的 API Key",
            meta: { missingKeys },
          };
        }
        // todo 修改其他插件的规范
        return await baseTool.execute({ ...params, __pluginKeys: keys });
      } catch (e: any) {
        return {
          success: false,
          errorCode: "EXECUTION_ERROR",
          error: e.message || "插件执行失败",
          stack: e.stack || "",
        };
      }
    },
  };
}
