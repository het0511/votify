import { create } from 'zustand';
import { AuthState, User} from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        set({ error: errorText || 'Login failed', isLoading: false });
        return;
      }

      const data = await response.json();
      //console.log(data.token);
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
        constituency: data.constituency,
        token: data.token, 
      };

      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });

    } catch (error) {
      set({ error: 'Login request failed', isLoading: false });
    }
  },

  register: async (username: string, email: string, password: string, aadhaar: string, constituency: string) => {
      set({ isLoading: true, error: null });

      try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            aadhaarNumber: aadhaar,
            constituency,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to register');
        }

        const data = await response.json();

        const newUser: User = {
          id: '', // optional: backend can return it
          username: data.username,
          email: data.email,
          role: data.role,
          constituency: data.constituency,
          token: data.token,
        };

        localStorage.setItem('user', JSON.stringify(newUser));
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      } catch (err: any) {
        set({ error: err.message || 'Registration failed', isLoading: false });
      }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  },
}));