package com.example.myapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.myapp.Models.User;
import com.example.myapp.Repository.UserRepository;

import java.security.SecureRandom;

@Service
public class TokenGenerator {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int TOKEN_LENGTH = 60;
    private static final SecureRandom RANDOM = new SecureRandom();

    private String generateRandomString() {
        StringBuilder stringBuilder = new StringBuilder(TOKEN_LENGTH);
        for (int i = 0; i < TOKEN_LENGTH; i++) {
            int randomIndex = RANDOM.nextInt(CHARACTERS.length());
            stringBuilder.append(CHARACTERS.charAt(randomIndex));
        }
        return stringBuilder.toString();
    }

    public String generateToken(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            String token;
            do {
                token = generateRandomString();
            } while (userRepository.existsByToken(token));
            user.setToken(token);
            userRepository.save(user);
            return token;
        }
        return null;
    }

    public boolean validateToken(String token) {
        return userRepository.findByToken(token).isPresent();
    }
}
