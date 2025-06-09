// components/AIMessage.tsx
import ChatBubble from "./ChatBubble";

export default function AIMessage({ content }: { content: string }) {
  return <ChatBubble content={content} isUser={false} />;
}
