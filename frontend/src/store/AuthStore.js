import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token) => {
        set((prev) => ({accessToken: token}))
      },
      removeAccessToken: () => {
        set((prev) => ({accessToken: null}))
      }
    })
  )
);