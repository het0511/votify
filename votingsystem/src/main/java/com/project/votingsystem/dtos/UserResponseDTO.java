package com.project.votingsystem.dtos;

public class UserResponseDTO {
    private String email;
    private String role;

    // Constructors
    public UserResponseDTO() {}

    public UserResponseDTO(String email, String role) {
        this.email = email;
        this.role = role;
    }

    // Getters & Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
