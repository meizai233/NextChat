// components/UserMessage.tsx
"use client";

import { Copy, CheckCheck, Pencil, X, Send } from "lucide-react";
import { useCopy } from "@/app/hooks/useCopy";
import ChatBubble from "./ChatBubble";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function UserMessage({ content }: { content: string }) {
  const { isCopied, copyToClipboard } = useCopy();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleCopy = () => {
    copyToClipboard(content);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(content); // 重置为原始内容
  };

  const handleSave = () => {
    // TODO: 保存编辑后的内容
    console.log("Save edited message:", editedContent);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className={cn(
          "w-full rounded-lg p-4",
          "transition-all duration-200 ease-in-out",
        )}
      >
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[120px] resize-none bg-transparent"
          autoFocus
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X size={16} className="mr-1" />
            取消
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Send size={16} className="mr-1" />
            发送
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ChatBubble
      content={content}
      isUser={true}
      actions={[
        {
          icon: isCopied ? <CheckCheck size={16} /> : <Copy size={16} />,
          label: isCopied ? "已复制" : "复制",
          onClick: handleCopy,
        },
        {
          icon: <Pencil size={16} />,
          label: "编辑",
          onClick: handleEdit,
        },
      ]}
    />
  );
}
