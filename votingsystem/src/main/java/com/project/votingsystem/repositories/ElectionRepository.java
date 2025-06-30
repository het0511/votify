package com.project.votingsystem.repositories;

import com.project.votingsystem.models.Election;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ElectionRepository extends MongoRepository<Election, String> {
    // Additional query methods if needed
}
