"use client";

import ChatWorkspace from "@/components/ChatWorkspace";
import { Suspense, useEffect } from "react";
import useSWR from "swr";
import { getMessagesBySessionIdAction } from "./actions/message";
import { useChatStore } from "@/app/providers/chat-store-provider";

export default function Page() {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setCurrentSessionId = useChatStore((s) => s.setCurrentSessionId);
  // 注入来自 SSR 的 sessionId 到 Zustand（只注入一次）
  useEffect(() => {
    if (currentSessionId) {
      setCurrentSessionId(currentSessionId);
    }
  }, [currentSessionId]);

  const {
    data: historyMessages,
    error,
    mutate,
  } = useSWR(
    ["messages", currentSessionId],
    () => getMessagesBySessionIdAction(currentSessionId!),
    {
      revalidateOnFocus: false,
      suspense: true,
    },
  );

  return (
    <div className="flex-1 overflow-y-scroll">
      <Suspense fallback={<p>Loading...</p>}>
        <ChatWorkspace messages={historyMessages} />
      </Suspense>
    </div>
  );
}
