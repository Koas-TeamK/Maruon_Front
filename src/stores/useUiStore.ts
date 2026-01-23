// src/stores/useUiStore.ts
import { create } from 'zustand';

type UiState = {
  // 상태
  snsOpen: boolean;
  
  // 액션
  toggleSns: () => void;
  closeSns: () => void;
  openSns: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  // 초기 상태
  snsOpen: false,

  // 액션
  toggleSns: () => set((state) => ({ snsOpen: !state.snsOpen })),
  closeSns: () => set({ snsOpen: false }),
  openSns: () => set({ snsOpen: true }),
}));