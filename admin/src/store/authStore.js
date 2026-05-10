import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      loading: false,

      setLoading: (v) => set({ loading: v }),

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.user.role !== 'ADMIN') throw new Error('Access denied: not an admin account');
        localStorage.setItem('traveloop_admin_token', data.token);
        set({ admin: data.user, token: data.token });
        return data;
      },

      signup: async (name, email, password) => {
        const { data } = await api.post('/auth/admin-signup', { name, email, password });
        localStorage.setItem('traveloop_admin_token', data.token);
        set({ admin: data.user, token: data.token });
        return data;
      },

      logout: () => {
        localStorage.removeItem('traveloop_admin_token');
        set({ admin: null, token: null });
      },

      checkAuth: async () => {
        set({ loading: true });
        const token = localStorage.getItem('traveloop_admin_token');
        if (!token) { set({ admin: null, loading: false }); return; }
        try {
          const { data } = await api.get('/auth/me');
          if (data.role !== 'ADMIN') throw new Error('Not admin');
          set({ admin: data });
        } catch {
          localStorage.removeItem('traveloop_admin_token');
          set({ admin: null, token: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: 'traveloop-admin-store', partialize: (s) => ({ admin: s.admin, token: s.token }) }
  )
);

export default useAuthStore;
