"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useChatStore } from "@/app/providers/chat-store-provider";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface ToolResult {
  type: string;
  toolCallId: string;
  toolName: string;
  result: {
    success: boolean;
    data: SearchResult[];
  };
}

interface SearchUIProps {
  pluginId: string;
  data: ToolResult;
}

export const SearchUI: React.FC<SearchUIProps> = ({ data }) => {
  const chatStatus = useChatStore((s) => s.chatStatus);
  const [isOpen, setIsOpen] = React.useState(chatStatus === "plugin-calling");

  if (!data?.result?.success) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-red-500">搜索失败</div>
        </CardContent>
      </Card>
    );
  }

  const searchResults = data.result.data;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full rounded-lg border"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <span className="text-base font-medium">搜索结果</span>
          <Badge variant="secondary" className="text-xs">
            {searchResults.length} 条结果
          </Badge>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t">
          <ScrollArea className="h-[400px] px-4">
            <div className="flex flex-col gap-4 py-4">
              {searchResults.map((item, index) => (
                <div key={index} className="space-y-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item.title}
                  </a>
                  <div className="text-sm text-gray-600">{item.snippet}</div>
                  <div className="text-xs text-gray-400">{item.link}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
