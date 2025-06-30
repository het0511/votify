package com.project.votingsystem.services;

import com.project.votingsystem.models.Candidate;
import com.project.votingsystem.repositories.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public Candidate addCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public List<Candidate> getCandidatesByElection(String electionId) {
        return candidateRepository.findByElectionId(electionId);
    }

    public void deleteCandidate(String candidateId) {
        candidateRepository.deleteById(candidateId);
    }
    
    public List<Candidate> getCandidatesByConstituencyAndElection(String constituency, String electionId) {
        return candidateRepository.findByConstituencyAndElectionId(constituency, electionId);
    }
}
