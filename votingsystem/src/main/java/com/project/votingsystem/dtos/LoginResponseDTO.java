package com.project.votingsystem.dtos;

public class LoginResponseDTO {
    private String token;
    private String id;
    private String username;
    private String email;
    private String role;
    private String constituency;

    // Constructors
    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, String id, String name, String email, String role, String constituency) {
        this.token = token;
        this.id = id;
        this.username = name;
        this.email = email;
        this.role = role;
        this.constituency = constituency;
    }

    // Getters & Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String name) { this.username = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getConstituency() { return constituency; }
    public void setConstituency(String constituency) { this.constituency = constituency; }
}
