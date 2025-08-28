package com.example.myapp.Controller;

import com.example.myapp.Models.User;
import com.example.myapp.Repository.UserRepository;
import com.example.myapp.dto.UserDto;
import com.example.myapp.security.TokenGenerator;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserAPIController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenGenerator tokenGenerator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setFullName(userDto.getFullname());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        Optional<User> userOptional = userRepository.findByEmail(userDto.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
                // ✅ Generate or reuse the existing token
                String token = tokenGenerator.generateToken(user.getEmail(), userDto.getPassword());

                if (token != null) {
                    return ResponseEntity.ok(Map.of(
                        "token", token,
                        "fullName", user.getFullName(),
                        "email", user.getEmail()
                    ));
                }
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
