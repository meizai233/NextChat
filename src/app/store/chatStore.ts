"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SessionsSlice, createSessionsSlice } from "./slices/sessionsSlice";
import {
  CurrentSessionSlice,
  createCurrentSessionSlice,
} from "./slices/CurrentSessionSlice";
import { HydrationSlice, createHydrationSlice } from "./slices/hydrationSlice";
import { UserSlice, createUserSlice } from "./slices/userSlice";
import { ConfigSlice, createConfigSlice } from "./slices/configSlice";

type ChatStore = HydrationSlice &
  UserSlice &
  SessionsSlice &
  CurrentSessionSlice &
  ConfigSlice;

export const useChatStore = create<ChatStore>()(
  persist(
    (...a) => ({
      ...createHydrationSlice(...a),
      ...createUserSlice(...a),
      ...createSessionsSlice(...a),
      ...createCurrentSessionSlice(...a),
      ...createConfigSlice(...a),
    }),
    {
      name: "chat_user",
      partialize: (state) => ({
        userId: state.userId,
        currentSessionId: state.currentSessionId,
        config: state.config,
      }),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    },
  ),
);
