import { useState } from 'react';
import { Candidate } from '../types';
import Button from './ui/Button';
import { CheckCircle } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  onVote: () => void;
  disabled: boolean;
}

const CandidateCard = ({ candidate, onVote, disabled }: CandidateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform scale-105 shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={candidate.imageUrl}
          alt={candidate.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center space-x-3 mb-2">
            {/* Symbol image */}
            {candidate.symbol && (
              <img
                src={candidate.symbol}
                alt={`${candidate.party} symbol`}
                className="h-10 w-10 object-contain rounded-full border border-white bg-white p-1"
              />
            )}
          </div>
          <h3 className="font-semibold text-lg text-white mb-1">{candidate.party}</h3>
        </div>
      </div>

      <div className="p-6">
        <center><p className="text-gray-700 font-semibold leading-relaxed mb-6">{candidate.name}</p></center>

        <Button
          onClick={onVote}
          disabled={disabled}
          fullWidth
          variant={disabled ? 'disabled' : 'primary'}
          className="group transition-all duration-300 transform hover:scale-105"
        >
          {disabled ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Vote Recorded
            </>
          ) : (
            'Cast Your Vote'
          )}
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;
