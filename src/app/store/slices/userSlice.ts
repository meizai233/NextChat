import { StateCreator } from "zustand";

export interface UserSlice {
  userId: string | null;
  setUserId: (id: string) => void;
}
export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
});
