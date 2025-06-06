"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chatSession, chatMessage } from "@lib/db/schema";
import { createSession } from "../actions/session";

// 查询结果的类型
type ChatSession = typeof chatSession.$inferInsert;
type ChatMessage = typeof chatMessage.$inferSelect;

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  // 操作方法
  initializeSessions: () => void;
  createSession: () => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, newTitle: string) => void;
  setCurrentSessionId: (id: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
}

// 待办 后续扩展到immerjs 做撤销重做功能
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      initializeSessions: async () => {
        if (get().sessions.length === 0) {
          const newSession = await createSession();
          set({
            sessions: [newSession],
            currentSessionId: newSession.id,
          });
        }
      },
      createSession: async () => {
        const newSession = await createSession();
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));
      },
      setCurrentSessionId: (id: string) => set({ currentSessionId: id }),
      deleteSession: (id: string) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
          currentSessionId:
            state.currentSessionId === id
              ? state.sessions[0]?.id || null
              : state.currentSessionId,
        })),

      renameSession: (id: string, newTitle: string) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, title: newTitle, updatedAt: new Date() } : s,
          ),
        })),
      addMessage: () => {
        // 添加信息时 向后端发起请求 或者直接db连接数据库 但是这样会不会不安全
      },
      updateSessionTitle: () => {},
    }),
    { name: "suda_sessions" },
  ),
);
