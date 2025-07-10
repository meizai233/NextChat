import React from "react";
import { pluginsMeta } from "@/plugins/pluginsMeta";
import type { ToolResult } from "@/app/store/slices/CurrentSessionSlice";

export function renderPluginUIs(toolResults: ToolResult[]): React.ReactNode[] {
  debugger;
  if (!toolResults?.length) return [];

  return toolResults
    .map((result) => {
      const { toolCallId } = result;

      // 从 pluginsMeta 中找到对应的插件配置
      const plugin = pluginsMeta.find((p) => p.id === "web_search");
      if (!plugin?.ui?.component) return null;

      const PluginUI = plugin.ui.component;

      return React.createElement(PluginUI, {
        key: toolCallId,
        pluginId: "web_search",
        data: result,
      });
    })
    .filter(Boolean);
}
