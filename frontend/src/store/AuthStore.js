import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      nickname: "",
      userId: null,
      setAccessToken: (token) => {
        set((prev) => ({accessToken: token}))
      },
      removeAccessToken: () => {
        set((prev) => ({accessToken: null}))
      },
      setNickname: (nickname) => {
        set((prev) => ({name: nickname}))
      },
      setUserId: (id) => {
        set((prev) => ({userId: id}))
      },
    }),
    {
      name: 'auth-store',
    },
));