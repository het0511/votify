import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => void;
  updateUserRole: (userId: string, role: 'voter' | 'admin') => void;
  deleteUser: (userId: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = userData.token;
      //console.log(token);
      const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data: User[] = await response.json();
      //console.log(data);
      set({ users: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateUserRole: async (userId, role) => {
    set({ isLoading: true, error: null });

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = userData.token;
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // Optimistically update local state
      const updatedUsers = get().users.map(user =>
        user.id === userId ? { ...user, role } : user
      );
      set({ users: updatedUsers, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ isLoading: true, error: null });

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = userData.token;
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const remainingUsers = get().users.filter(user => user.id !== userId);
      set({ users: remainingUsers, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
