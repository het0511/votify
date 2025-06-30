import { useEffect } from 'react';
import { useCandidateStore } from '../store/candidateStore';
import CandidateCard from '../components/CandidateCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { AlertCircle, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const VoterDashboard = () => {
  
  const { candidates, fetchCandidates, isLoading, voteForCandidate, hasVoted, checkHasVoted, error } = useCandidateStore();
  const { user } = useAuthStore();
  const voterId = user?.id; 
  const electionId = '1'; 
  
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // Check if the user has already voted
  useEffect(() => {
    if (voterId && electionId) {
      checkHasVoted(voterId, electionId);
    }
  }, [voterId, electionId, checkHasVoted]);

  if (isLoading && candidates.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          
          <p className="mt-2 text-lg text-gray-600">
            Cast your vote for your preferred candidate below.
          </p>
          
          {hasVoted && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100 flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-800">
                Thank you for voting! Your vote has been recorded.
              </span>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {candidates.map(candidate => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onVote={() => {
                if (voterId) {
                  voteForCandidate(candidate.id, voterId, electionId);
                }
              }}
              disabled={hasVoted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoterDashboard;