"use client";

import { useEffect } from "react";
import { initAnonymousUser } from "@/app/actions/user";
import { useChatStore } from "@store/chat-store";

export function useInitUserAndSession() {
  const userId = useChatStore((s) => s.userId);
  const setUserId = useChatStore((s) => s.setUserId);
  const initializeSessions = useChatStore((s) => s.initializeSessions);

  useEffect(() => {
    const init = async () => {
      if (!userId) {
        const newUserId = crypto.randomUUID();
        setUserId(newUserId); // 先乐观更新
        try {
          await initAnonymousUser(newUserId);
          initializeSessions();
        } catch (err) {
          setUserId(""); // 回滚
          console.error("Initialization failed:", err);
        }
      } else {
        initializeSessions();
      }
    };

    init();
  }, []);
}
