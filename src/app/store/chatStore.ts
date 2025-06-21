import { createStore } from "zustand/vanilla";

import { SessionsSlice, createSessionsSlice } from "./slices/sessionsSlice";
import {
  CurrentSessionSlice,
  createCurrentSessionSlice,
  CurrentSessionSliceInit,
} from "./slices/CurrentSessionSlice";
import { UserSlice, createUserSlice } from "./slices/userSlice";
import { ConfigSlice, createConfigSlice } from "./slices/configSlice";

export type ChatStore = UserSlice &
  SessionsSlice &
  CurrentSessionSlice &
  ConfigSlice;

export interface ChatStoreInit {
  user?: Partial<UserSlice>;
  currentSession?: CurrentSessionSliceInit;
}

export const createChatStore = (init?: ChatStoreInit) => {
  return createStore<ChatStore>()((...a) => ({
    ...createUserSlice(a[0], a[1], init?.user),
    ...createSessionsSlice(...a), // 没有 init
    ...createCurrentSessionSlice(init?.currentSession)(...a),
    ...createConfigSlice(...a),
  }));
};

export type ChatStoreApi = ReturnType<typeof createChatStore>;
