"use client";
import ChatContainer from "@/components/ChatContainer";
import InputPanelWrapper from "@/components/InputPanelWrapper";
import { Suspense } from "react";

export default function ChatPage() {
  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <Suspense fallback={<p>loading...</p>}>
          <ChatContainer />
        </Suspense>
      </div>
      <InputPanelWrapper />
    </>
  );
}
