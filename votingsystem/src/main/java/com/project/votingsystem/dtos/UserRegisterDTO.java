package com.project.votingsystem.dtos;

public class UserRegisterDTO {
    private String username;
	private String email;
    private String password;
    private String aadhaarNumber;
    private String constituency;

    // Constructors
    public UserRegisterDTO() {}

    public UserRegisterDTO(String username, String email, String password, String aadhaarNumber, String constituency) {
        this.username = username;
    	this.email = email;
        this.password = password;
        this.aadhaarNumber = aadhaarNumber;
        this.constituency = constituency;
    }

    // Getters & Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }
    
    public String getConstituency() { return constituency; }
    public void setConstituency(String constituency) { this.constituency = constituency; }
}
