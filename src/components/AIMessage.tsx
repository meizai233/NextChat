// components/AIMessage.tsx
import { Copy, Trash } from "lucide-react";
import ChatBubble from "./ChatBubble";

export default function AIMessage({ content }: { content: string }) {
  return (
    <ChatBubble
      content={content}
      isUser={false}
      actions={[
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
