import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      name: "",
      setAccessToken: (token) => {
        set((prev) => ({accessToken: token}))
      },
      removeAccessToken: () => {
        set((prev) => ({accessToken: null}))
      },
      setName: (name) => {
        set((prev) => ({name: name}))
      },
    }),
    {
      name: 'auth-store',
    },
));