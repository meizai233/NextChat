"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { useChatStore } from "@/app/providers/chat-store-provider";
import { availablePlugins } from "@/plugins";

interface PluginsDialogProps {
  onClose: () => void;
}

export default function PluginsDialog({ onClose }: PluginsDialogProps) {
  const enabledPlugins = useChatStore((s) => s.enabledPlugins);
  const setEnabledPlugins = useChatStore((s) => s.setEnabledPlugins);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleTogglePlugin = (id: string, enabled: boolean) => {
    if (enabled) {
      setEnabledPlugins([...enabledPlugins, id]);
    } else {
      setEnabledPlugins(enabledPlugins.filter((pid) => pid !== id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>可用插件</CardTitle>
          <CardDescription>启用或禁用各种功能增强插件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {availablePlugins.map((plugin) => (
            <div
              key={plugin.id}
              className="flex items-center justify-between space-x-2"
            >
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
          ))}
          {availablePlugins.length === 0 && (
            <div className="text-muted-foreground py-4 text-center text-sm">
              暂无可用插件
            </div>
          )}
        </CardContent>
      </Card>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button type="submit">保存</Button>
      </DialogFooter>
    </form>
  );
}
