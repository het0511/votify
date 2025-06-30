export type UserRole = 'voter' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  constituency: string;
  token: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  electionId: string;
  symbol: string;
  constituency: string;
  age: number;
  imageUrl: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, aadhaar: string, constituency: string) => void;
  logout: () => void;
  checkAuth: () => void;
}