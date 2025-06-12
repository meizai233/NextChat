"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/app/store/chatStore";

interface SettingsFormProps {
  onClose: () => void;
}

export function SettingsForm({ onClose }: SettingsFormProps) {
  const config = useChatStore((s) => s.config);
  const setConfig = useChatStore((s) => s.setConfig);

  const [formData, setFormData] = useState({
    openaiEndpoint: "",
    openaiApiKey: "",
  });

  const [showApiKey, setShowApiKey] = useState(false);

  // ✅ 初始化只执行一次（类似 componentDidMount）
  useEffect(() => {
    setFormData({
      openaiEndpoint: config?.openaiEndpoint || "https://newapi.585dg.com",
      openaiApiKey: config?.openaiApiKey || "",
    });
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig({
      openaiEndpoint: formData.openaiEndpoint.trim(),
      openaiApiKey: formData.openaiApiKey.trim(),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-lg font-medium">OpenAI 相关</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI 接口地址:</label>
              <Input
                value={formData.openaiEndpoint}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    openaiEndpoint: e.target.value,
                  }))
                }
                placeholder="请输入 OpenAI 接口地址"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI API Key:</label>
              <div className="relative">
                <Input
                  type={showApiKey ? "text" : "password"}
                  value={formData.openaiApiKey}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      openaiApiKey: e.target.value,
                    }))
                  }
                  placeholder="请输入 OpenAI Api Key"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className={cn(
                    "absolute top-1/2 right-3 -translate-y-1/2",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors",
                    "cursor-pointer",
                  )}
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
}
