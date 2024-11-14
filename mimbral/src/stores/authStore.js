import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  email: '',
  username: '',
  password: '',
  setEmail: (email) => set({ email }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));

export default useAuthStore;