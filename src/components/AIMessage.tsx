// components/AIMessage.tsx
import { Copy, CheckCheck } from "lucide-react";
import { useCopy } from "@/app/hooks/useCopy";
import ChatBubble from "./ChatBubble";

export default function AIMessage({ content }: { content: string }) {
  const { isCopied, copyToClipboard } = useCopy();

  const handleCopy = () => {
    copyToClipboard(content);
  };

  return (
    <ChatBubble
      content={content}
      isUser={false}
      actions={[
        {
          icon: isCopied ? <CheckCheck size={16} /> : <Copy size={16} />,
          label: isCopied ? "已复制" : "复制",
          onClick: handleCopy,
        },
      ]}
    />
  );
}
