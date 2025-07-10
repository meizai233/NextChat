"use client";

import { RefreshCw, Copy, Trash } from "lucide-react";
import ChatBubble from "./ChatBubble";
import { useCopy } from "@/hooks/useCopy";

interface Props {
  content: string;
}

export default function ErrorMessage({ content }: Props) {
  const { isCopied, copyToClipboard } = useCopy();

  const handleCopy = () => {
    copyToClipboard(content);
  };

  return (
    <ChatBubble
      content={content}
      isUser={false}
      error
      actions={[
        {
          icon: <RefreshCw size={16} />,
          label: "重试",
          onClick: () => console.log("retry"),
        },
        {
          icon: <Copy size={16} />,
          label: isCopied ? "已复制" : "复制",
          onClick: handleCopy,
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
