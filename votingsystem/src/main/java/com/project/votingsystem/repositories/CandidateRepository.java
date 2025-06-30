package com.project.votingsystem.repositories;

import com.project.votingsystem.models.Candidate;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CandidateRepository extends MongoRepository<Candidate, String> {
    List<Candidate> findByElectionId(String electionId);
    List<Candidate> findByConstituencyAndElectionId(String constituency, String electionId);
}
