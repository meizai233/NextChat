export interface UserSlice {
  userId: string | null;
  setUserId: (id: string) => void;
}

export const createUserSlice = (
  set: (partial: Partial<UserSlice>, replace?: boolean) => void,
  get: () => UserSlice,
  initState?: Partial<UserSlice>,
): UserSlice => ({
  userId: initState?.userId ?? null,
  setUserId: (id) => set({ userId: id }),
});
