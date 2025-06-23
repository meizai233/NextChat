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
import { useState } from "react";

interface PluginsDialogProps {
  onClose: () => void;
}

export default function PluginsDialog({ onClose }: PluginsDialogProps) {
  const [plugins, setPlugins] = useState({
    imageGeneration: false,
    codeInterpreter: false,
    webBrowsing: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以保存插件设置到 store 中
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>可用插件</CardTitle>
          <CardDescription>启用或禁用各种功能增强插件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>图像生成</Label>
              <div className="text-muted-foreground text-sm">
                支持生成、编辑和变体图像
              </div>
            </div>
            <Switch
              checked={plugins.imageGeneration}
              onCheckedChange={(checked) =>
                setPlugins((prev) => ({ ...prev, imageGeneration: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>代码解释器</Label>
              <div className="text-muted-foreground text-sm">
                执行代码、处理数据和生成图表
              </div>
            </div>
            <Switch
              checked={plugins.codeInterpreter}
              onCheckedChange={(checked) =>
                setPlugins((prev) => ({ ...prev, codeInterpreter: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>网页浏览</Label>
              <div className="text-muted-foreground text-sm">
                访问和分析网页内容
              </div>
            </div>
            <Switch
              checked={plugins.webBrowsing}
              onCheckedChange={(checked) =>
                setPlugins((prev) => ({ ...prev, webBrowsing: checked }))
              }
            />
          </div>
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
