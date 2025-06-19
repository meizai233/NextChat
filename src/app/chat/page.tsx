import InputPanelWrapper from "@/components/InputPanelWrapper";
import ChatContainer from "@/components/ChatContainer";

export default function ChatPage() {
  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <ChatContainer />
      </div>
      <InputPanelWrapper />
    </>
  );
}
