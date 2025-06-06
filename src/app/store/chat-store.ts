"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

// 保存一次对话消息
export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// 保存一次对话上下文所有消息
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  model?: string; // 可选的模型选择
}

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

      initializeSessions: () => {
        if (get().sessions.length === 0) {
          const id = nanoid();
          const now = new Date();
          const initialSession: ChatSession = {
            id,
            title: "新会话",
            messages: [],
            createdAt: now,
            updatedAt: now,
          };
          set({
            sessions: [initialSession],
            currentSessionId: id,
          });
        }
      },
      createSession: () => {
        const id = nanoid();
        const now = new Date();
        const newSession: ChatSession = {
          id,
          title: "新会话",
          messages: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: id,
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
