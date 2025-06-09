import { StateCreator } from "zustand";

export interface HydrationSlice {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const createHydrationSlice: StateCreator<
  HydrationSlice,
  [],
  [],
  HydrationSlice
> = (set) => ({
  _hasHydrated: false,
  setHasHydrated: (state) => set({ _hasHydrated: state }),
});
