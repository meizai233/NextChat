"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useChatStore } from "@/app/providers/chat-store-provider";
import { availablePlugins } from "@/plugins";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { PluginKeyMetaForm } from "./plugin-key-meta-form";

export function PluginsForm() {
  const enabledPlugins = useChatStore((s) => s.enabledPlugins);
  const setEnabledPlugins = useChatStore((s) => s.setEnabledPlugins);

  const handleTogglePlugin = (id: string, enabled: boolean) => {
    if (enabled) {
      setEnabledPlugins([...enabledPlugins, id]);
    } else {
      setEnabledPlugins(enabledPlugins.filter((pid) => pid !== id));
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <h3 className="mb-6 text-lg font-medium">插件设置</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          启用或禁用各种功能增强插件
        </p>
        <div className="space-y-6">
          {availablePlugins.map((plugin) => (
            <div key={plugin.id} className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>{plugin.name}</Label>
                  <div className="text-muted-foreground text-sm">
                    {plugin.description}
                  </div>
                </div>
                <Switch
                  checked={enabledPlugins.includes(plugin.id)}
                  onCheckedChange={(checked) =>
                    handleTogglePlugin(plugin.id, checked)
                  }
                />
              </div>
              {plugin.apiKeys && (
                <Collapsible open={enabledPlugins.includes(plugin.id)}>
                  <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <PluginKeyMetaForm plugin={plugin} />
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
          {availablePlugins.length === 0 && (
            <div className="text-muted-foreground py-4 text-center text-sm">
              暂无可用插件
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
