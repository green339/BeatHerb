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
      setNickname: (nickname) => {
        set((prev) => ({nickname: nickname}))
      },
      setUserId: (id) => {
        set((prev) => ({userId: id}))
      },
      removeUserStatus: () => {
        set((prev) => ({
          accessToken: null,
          nickname: "",
          userId: null,
          profileImage: null,
        }))
      }
    }),
    {
      name: 'auth-store',
    },
));