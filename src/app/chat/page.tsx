import { ChatPanelSkeleton } from "@/components/chat-ui/ChatPanelSkeleton";
import dynamic from "next/dynamic";

const ChatContainer = dynamic(() => import("@/components/ChatContainer"), {
  loading: () => <ChatPanelSkeleton />,
});

export default function ChatPage() {
  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <ChatContainer />
      </div>
    </>
  );
}
