"use client";
import ChatWorkspace from "@/components/ChatWorkspace";
import { Suspense } from "react";
import useSWR from "swr";
import { getMessagesBySessionIdAction } from "./actions/message";
import { useChatStore } from "./store/chatStore";

const Home = () => {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const {
    data: historyMessages,
    error,
    mutate,
  } = useSWR(
    currentSessionId ? ["messages", currentSessionId] : null,
    () => getMessagesBySessionIdAction(currentSessionId!),
    {
      revalidateOnFocus: false,
      suspense: true,
    },
  );
  return (
    <div className="flex-1 overflow-y-scroll">
      <Suspense fallback={<p>Loading111...</p>}>
        <ChatWorkspace messages={historyMessages} />
      </Suspense>
    </div>
  );
};

export default Home;
