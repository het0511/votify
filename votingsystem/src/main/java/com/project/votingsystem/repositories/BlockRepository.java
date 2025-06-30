package com.project.votingsystem.repositories;

import com.project.votingsystem.models.Block;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BlockRepository extends MongoRepository<Block, String> {
    Optional<Block> findTopByOrderByIndexDesc(); // get last block

    boolean existsByVoterIdHashAndElectionId(String voterIdHash, String electionId);

    List<Block> findByElectionId(String electionId);
}
