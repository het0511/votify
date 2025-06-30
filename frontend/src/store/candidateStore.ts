import { create } from 'zustand';
import { Candidate } from '../types';
import { useAuthStore } from './authStore';

interface CandidateState {
  candidates: Candidate[];
  isLoading: boolean;
  error: string | null;
  fetchCandidates: () => void;
  voteForCandidate: (candidateId: string, voterId: string, electionId: string) => void;
  checkHasVoted: (voterId: string, electionId: string) => Promise<void>;
  hasVoted: boolean;
  fetchResults: (electionId: string) => Promise<void>;
  voteResults: Record<string, number>;
}

export const useCandidateStore = create<CandidateState>((set, get) => ({
  candidates: [],
  isLoading: false,
  error: null,
  hasVoted: localStorage.getItem('hasVoted') === 'true',

  fetchCandidates: async () => {
    const user = useAuthStore.getState().user;
    //console.log('AuthStore user in fetchCandidates:', user);

    if (!user?.constituency) {
      set({ error: 'User constituency not found' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch('http://localhost:8080/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          constituency: user.constituency,
          electionId: "1" 
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch candidates');

      const data = await response.json();
      //console.log(data);
      set({ candidates: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', isLoading: false });
    }
  },

  voteForCandidate: async (candidateId: string, voterId: string, electionId: string) => {
  if (get().hasVoted) {
    set({ error: 'You have already voted' });
    return;
  }

  set({ isLoading: true, error: null });

  try {
    const response = await fetch('http://localhost:8080/api/blockchain/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voterId,
        candidateId,
        electionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to vote');
    }

    localStorage.setItem('hasVoted', 'true');

    set({
      hasVoted: true,
      isLoading: false,
    });

  } catch (err: any) {
    set({ error: err.message || 'Unknown error', isLoading: false });
  }
},

checkHasVoted: async (voterId: string, electionId: string) => {
  try {
    const response = await fetch('http://localhost:8080/api/blockchain/has-voted', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voterId, electionId }),
    });

    if (!response.ok) throw new Error('Failed to check voting status');

    const hasVoted = await response.json();
    set({ hasVoted });
  } catch (err: any) {
    set({ error: err.message || 'Failed to check vote status' });
  }
},

voteResults: {},

fetchResults: async (electionId: string) => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetch(`http://localhost:8080/api/blockchain/results/${electionId}`);
    if (!response.ok) throw new Error("Failed to fetch results");
    const data = await response.json();
    set({ voteResults: data, isLoading: false });
  } catch (err: any) {
    set({ error: err.message || 'Failed to fetch vote results', isLoading: false });
  }
}

}));
