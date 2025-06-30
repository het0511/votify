package com.project.votingsystem.controllers;

import com.project.votingsystem.dtos.LoginRequestDTO;
import com.project.votingsystem.dtos.LoginResponseDTO;
import com.project.votingsystem.dtos.UserRegisterDTO;
import com.project.votingsystem.dtos.UserResponseDTO;
import com.project.votingsystem.models.User;
import com.project.votingsystem.services.UserService;
import com.project.votingsystem.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

                LoginResponseDTO responseDTO = new LoginResponseDTO(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    user.getConstituency()
                );
                return ResponseEntity.ok(responseDTO);
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
    
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRegisterDTO registerDTO) {
        User registeredUser = userService.registerUser(registerDTO);
        UserResponseDTO responseDTO = new UserResponseDTO(registeredUser.getEmail(), registeredUser.getRole());
        return ResponseEntity.ok(responseDTO);
    }
}
