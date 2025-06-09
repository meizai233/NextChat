import { chatMessage } from "@lib/db/schema";
import { StateCreator } from "zustand";

type ChatMessage = typeof chatMessage.$inferSelect;

export interface CurrentSessionSlice {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
}

export const createCurrentSessionSlice: StateCreator<
  CurrentSessionSlice,
  [],
  [],
  CurrentSessionSlice
> = (set) => ({
  currentSessionId: null,
  setCurrentSessionId: (id) => set({ currentSessionId: id }),
  addMessage: (sessionId: string, message: ChatMessage) => {
    // TODO: 向后端发送消息（可加乐观更新）
    console.log("Adding message to session", sessionId, message);
  },
});
