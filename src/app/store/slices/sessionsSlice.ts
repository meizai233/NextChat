import {
  createSession,
  deleteSessionInDB,
  renameSessionInDB,
} from "@/app/actions/session";
import { chatSession } from "@lib/db/schema";
import { StateCreator } from "zustand";
import { UserSlice } from "./userSlice";
import { CurrentSessionSlice } from "./CurrentSessionSlice";

type ChatSession = typeof chatSession.$inferInsert;

export interface SessionsSlice {
  sessions: ChatSession[];
  setSessions: (sessions: ChatSession[]) => void;
  initializeSessions: () => Promise<void>;
  createSession: () => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
  renameSession: (id: string, newTitle: string) => Promise<void>;
  updateSessionTitle: (sessionId: string, title: string) => void;
}

export const createSessionsSlice: StateCreator<
  SessionsSlice & UserSlice & CurrentSessionSlice,
  [],
  [],
  SessionsSlice
> = (set, get) => ({
  sessions: [],
  setSessions: (sessions) => set({ sessions }),

  initializeSessions: async () => {
    if (get().sessions.length === 0) {
      const newSession = await createSession(get().userId);
      set((state) => ({
        sessions: [newSession, ...state.sessions],
      }));
      get().setCurrentSessionId(newSession.id);
    }
  },

  createSession: async () => {
    const newSession = await createSession(get().userId);
    set((state) => ({
      sessions: [newSession, ...state.sessions],
    }));
    get().setCurrentSessionId(newSession.id);
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

  updateSessionTitle: (sessionId: string, title: string) => {
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, title } : s,
      ),
    }));
  },
});
