import { createStore } from "zustand/vanilla";

import { SessionsSlice, createSessionsSlice } from "./slices/sessionsSlice";
import {
  CurrentSessionSlice,
  createCurrentSessionSlice,
  CurrentSessionSliceInit,
} from "./slices/CurrentSessionSlice";
import { UserSlice, createUserSlice } from "./slices/userSlice";
import { ConfigSlice, createConfigSlice } from "./slices/configSlice";
import { createPluginSlice } from "./slices/pluginsSlice";

export type ChatStore = UserSlice &
  SessionsSlice &
  CurrentSessionSlice &
  ConfigSlice;

export interface ChatStoreInit {
  user?: Partial<UserSlice>;
  currentSession?: CurrentSessionSliceInit;
  config?: Partial<ConfigSlice>;
}

export const createChatStore = (init?: ChatStoreInit) => {
  return createStore<ChatStore>()((...a) => ({
    ...createUserSlice(a[0], a[1], init?.user), //这里可以重构一下高阶函数
    ...createSessionsSlice(...a), // 没有 init
    ...createCurrentSessionSlice(init?.currentSession)(...a),
    ...createConfigSlice(init?.config)(...a), // 这里传入初始化的 config
    ...createPluginSlice(...a),
  }));
};

export type ChatStoreApi = ReturnType<typeof createChatStore>;
