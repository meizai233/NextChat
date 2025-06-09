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

export const useChatStore = create<
  HydrationSlice & UserSlice & SessionsSlice & CurrentSessionSlice
>()(
  persist(
    (...a) => ({
      ...createHydrationSlice(...a),
      ...createUserSlice(...a),
      ...createSessionsSlice(...a),
      ...createCurrentSessionSlice(...a),
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
