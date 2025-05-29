"use client";

import { Textarea } from "@/components/ui/textarea";
import { Mic, Image, Smile, Send } from "lucide-react";
import { useCallback } from "react";

export default function InputPanel({ value, onChange, isLoading, onSend }) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend],
  );

  // 处理文本变化
  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  // 处理发送按钮点击
  const handleSendClick = useCallback(() => {
    if (!isLoading) {
      onSend();
    }
  }, [isLoading, onSend]);

  return (
    <div className="relative mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
      <Textarea
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="h-24 resize-none pr-24 pb-10"
      />
      <div className="absolute bottom-0 mb-4 flex md:mb-6">
        {/* 左边图标 */}
        <div className="flex gap-3 p-4">
          <Mic className="hover:text-primary h-5 w-5 cursor-pointer" />
          <Image className="hover:text-primary h-5 w-5 cursor-pointer" />
          <Smile className="hover:text-primary h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <div className="absolute right-4 bottom-0 mb-4 md:mb-6">
        {/* 右边图标 */}
        <div className="flex gap-3 p-4">
          <Send
            onClick={handleSendClick}
            className="hover:text-primary h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
