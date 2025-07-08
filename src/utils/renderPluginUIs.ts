import React from "react";
import { pluginsMeta } from "@/plugins/pluginsMeta";

interface ToolResult {
  type: string;
  toolCallId: string;
  toolName: string;
  args: {
    [key: string]: string | number | boolean;
  };
  result: {
    success: boolean;
    data: unknown;
  };
}

export function renderPluginUIs(toolResults: ToolResult[]): React.ReactNode[] {
  if (!toolResults?.length) return [];

  return toolResults
    .map((result) => {
      const { toolName } = result;

      // 从 pluginsMeta 中找到对应的插件配置
      const plugin = pluginsMeta.find((p) => p.id === toolName);
      if (!plugin?.ui?.component) return null;

      const PluginUI = plugin.ui.component;

      return React.createElement(PluginUI, {
        key: result.toolCallId,
        pluginId: toolName,
        data: result,
      });
    })
    .filter(Boolean);
}
