import ChatWorkspace from "@/components/ChatWorkspace";

export default function ChatContainer({ messages = [] }) {
  return (
    <div className="flex min-h-[360px] flex-1 flex-col space-y-4 overflow-y-auto p-4">
      <ChatWorkspace messages={messages} />
    </div>
  );
}
