"use client";

import { RefreshCw, Copy, Trash } from "lucide-react";
import ChatBubble from "./ChatBubble";
import { useChatStore } from "@/app/store/chatStore";

export default function ErrorMessage() {
  const errorMessage = useChatStore((s) => s.errorMessage);

  return (
    <ChatBubble
      isUser={false}
      content={errorMessage!}
      error
      actions={[
        {
          icon: <RefreshCw size={16} />,
          label: "重试",
          onClick: () => console.log("retry"),
        },
        {
          icon: <Copy size={16} />,
          label: "复制",
          onClick: () => console.log("copy"),
        },
        {
          icon: <Trash size={16} />,
          label: "删除",
          onClick: () => console.log("delete"),
        },
      ]}
    />
  );
}
