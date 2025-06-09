"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chatSession, chatMessage } from "@lib/db/schema";
import {
  createSession,
  deleteSessionInDB,
  renameSessionInDB,
} from "../actions/session";

// 类型定义
type ChatSession = typeof chatSession.$inferInsert;
type ChatMessage = typeof chatMessage.$inferSelect;

interface ChatStore {
  _hasHydrated: boolean;
  userId: string | null;
  sessions: ChatSession[];
  currentSessionId: string | null;
  setHasHydrated: (params) => void;
  setSessions: (sessions: []) => void;
  setUserId: (id: string) => void;
  initializeSessions: () => void;
  createSession: () => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, newTitle: string) => void;
  setCurrentSessionId: (id: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      userId: null,
      sessions: [],
      setSessions: (sessions) => set({ sessions }),

      currentSessionId: null,

      setUserId: (id) => set({ userId: id }),

      initializeSessions: async () => {
        console.log(get().userId, "get().userId");
        if (get().sessions.length === 0) {
          const newSession = await createSession(get().userId);
          get().setSessions([newSession, ...get().sessions]);
          get().setCurrentSessionId(newSession.id);
        }
      },

      createSession: async () => {
        const newSession = await createSession();
        get().setSessions([newSession, ...get().sessions]);
        get().setCurrentSessionId(newSession.id);
      },

      setCurrentSessionId: (id: string) => {
        set({ currentSessionId: id });
      },

      deleteSession: async (id: string) => {
        await deleteSessionInDB(id);
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== id);
          const isDeletingCurrent = state.currentSessionId === id;
          return {
            sessions: newSessions,
            currentSessionId: isDeletingCurrent
              ? newSessions[0]?.id || null
              : state.currentSessionId,
          };
        });
      },

      renameSession: async (id: string, newTitle: string) => {
        await renameSessionInDB(id, newTitle);
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, title: newTitle, updatedAt: new Date() } : s,
          ),
        }));
      },

      addMessage: () => {
        // TODO: 向后端发送消息（可加乐观更新）
      },

      updateSessionTitle: () => {
        // TODO: 本地 title 更新
      },
    }),
    {
      name: "chat_user",
      partialize: (state) => ({
        userId: state.userId,
        currentSessionId: state.currentSessionId,
      }),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    },
  ),
);
