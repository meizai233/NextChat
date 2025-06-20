"use client";

import ChatWorkspace from "@/components/ChatWorkspace";
import { Suspense, useEffect } from "react";
import useSWR from "swr";
import { getMessagesBySessionIdAction } from "./actions/message";
import { useChatStore } from "@/app/store/chatStore";

export default function ClientHome({
  currentSessionId,
}: {
  currentSessionId: string | null;
}) {
  const setCurrentSessionId = useChatStore((s) => s.setCurrentSessionId);
  const hydratedSessionId = useChatStore((s) => s.currentSessionId);

  // 注入来自 SSR 的 sessionId 到 Zustand（只注入一次）
  useEffect(() => {
    if (currentSessionId && !hydratedSessionId) {
      setCurrentSessionId(currentSessionId);
    }
  }, [currentSessionId, hydratedSessionId]);

  const {
    data: historyMessages,
    error,
    mutate,
  } = useSWR(
    hydratedSessionId ? ["messages", hydratedSessionId] : null,
    () => getMessagesBySessionIdAction(hydratedSessionId!),
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
