"use client";

import { useEffect } from "react";
import { initAnonymousUser } from "@/app/actions/user";
import { getUserSessions } from "@/app/actions/session";
import { useChatStore } from "@/app/providers/chat-store-provider";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";

export function useInitUserAndSessions() {
  const userId = useChatStore((s) => s.userId);
  const setUserId = useChatStore((s) => s.setUserId);
  const setSessions = useChatStore((s) => s.setSessions); // 你要确保 store 有这个方法
  const initializeSessions = useChatStore((s) => s.initializeSessions); // 你要确保 store 有这个方法

  useEffect(() => {
    const init = async () => {
      let id = userId;

      if (!id) {
        id = nanoid();
        setUserId(id); // optimistic update

        // 待办 为什么要这样设置??
        Cookies.set("userId", id, {
          path: "/",
          expires: 365, // 一年过期（可按需）
          sameSite: "Lax",
        });

        try {
          await initAnonymousUser(id);
          await initializeSessions();
        } catch (err) {
          console.error("User 初始化失败:", err);
          setUserId("");
          return;
        }
      }
      try {
        const sessions = await getUserSessions(id);
        setSessions(sessions);
      } catch (err) {
        console.error("Session 加载失败:", err);
      }
    };

    init();
  }, []);
}
