"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PluginMeta } from "@/plugins/pluginsMeta";
import { useChatStore } from "@/app/providers/chat-store-provider";

interface pluginKeyMetaFormProps {
  plugin: PluginMeta;
}

export function PluginKeyMetaForm({ plugin }: pluginKeyMetaFormProps) {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const setPluginKey = useChatStore((s) => s.setPluginKey);
  const getPluginKey = useChatStore((s) => s.getPluginKey);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    plugin.apiKeys?.forEach((apiKey) => {
      initialValues[apiKey.key] = getPluginKey(plugin.id, apiKey.key) || "";
    });
    return initialValues;
  });

  if (!plugin.apiKeys?.length) {
    return null;
  }

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setPluginKey(plugin.id, key, value);
  };

  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {plugin.apiKeys.map((apiKey) => {
            const isVisible = showKeys[apiKey.key] || false;

            return (
              <div key={apiKey.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{apiKey.name}</Label>
                  {apiKey.required && (
                    <span className="text-destructive text-xs">*必填</span>
                  )}
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  {apiKey.description}
                </div>
                <div className="relative">
                  <Input
                    type={isVisible ? "text" : "password"}
                    value={values[apiKey.key]}
                    onChange={(e) => handleChange(apiKey.key, e.target.value)}
                    placeholder={apiKey.placeholder}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowKeys((prev) => ({
                        ...prev,
                        [apiKey.key]: !prev[apiKey.key],
                      }))
                    }
                    className={cn(
                      "absolute top-1/2 right-3 -translate-y-1/2",
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors",
                      "cursor-pointer",
                    )}
                  >
                    {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
