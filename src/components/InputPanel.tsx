"use client";

import { Textarea } from "@/components/ui/textarea";
import { Mic, Image, Smile, Send } from "lucide-react";

export default function InputPanel(props) {
  return (
    <div className="relative mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
      <Textarea
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
          <Send className="hover:text-primary h-5 w-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
