import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => {
    set((prev) => ({accessToken: token}))
  },
  removeAccessToken: () => {
    set((prev) => ({accessToken: null}))
  }
}));