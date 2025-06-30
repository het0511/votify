package com.project.votingsystem.services;

import com.project.votingsystem.dtos.UserRegisterDTO;
import com.project.votingsystem.models.User;
import com.project.votingsystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    public User registerUser(UserRegisterDTO registerDTO) {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.existsByAadhaarNumber(registerDTO.getAadhaarNumber())) {
            throw new RuntimeException("Aadhaar number already registered");
        }
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new RuntimeException("Username already registered");
        }
        
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setAadhaarNumber(registerDTO.getAadhaarNumber());
        user.setPasswordHash(passwordEncoder.encode(registerDTO.getPassword()));
        user.setRole("VOTER"); // default role
        user.setConstituency(registerDTO.getConstituency());
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public void updateUserRole(String userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String currentRole = user.getRole().toUpperCase();
        String targetRole = newRole.toUpperCase();

        if (currentRole.equals("ADMIN")) {
            // Prevent demoting ADMIN to VOTER
            throw new RuntimeException("Cannot change role of an ADMIN user");
        }

        if (!currentRole.equals("VOTER") || !targetRole.equals("ADMIN")) {
            throw new RuntimeException("Only VOTER accounts can be promoted to ADMIN");
        }

        user.setRole("ADMIN");
        userRepository.save(user);
    }
    
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Cannot delete another ADMIN user");
        }

        userRepository.deleteById(userId);
    }

}
