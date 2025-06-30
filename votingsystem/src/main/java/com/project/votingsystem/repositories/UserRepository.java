package com.project.votingsystem.repositories;

import com.project.votingsystem.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByAadhaarNumber(String aadhaarNumber);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByAadhaarNumber(String aadhaarNumber);
    boolean existsByUsername(String username);
}
