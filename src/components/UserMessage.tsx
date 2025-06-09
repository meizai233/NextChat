// components/UserMessage.tsx
"use client";

import ChatBubble from "./ChatBubble";

export default function UserMessage({ content }: { content: string }) {
  return <ChatBubble content={content} isUser={true} />;
}
