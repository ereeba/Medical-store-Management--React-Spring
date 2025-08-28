package com.example.myapp.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String password;

    @Column(unique = true)
    private String token;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // ✅ Prevents infinite recursion during JSON serialization
    private List<Medicine> medicines = new ArrayList<>();

    // ✅ No-arg constructor (required by JPA)
    public User() {}

    // ✅ Constructor with email, password, fullName
    public User(String email, String password, String fullName) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    // === Getters ===
    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getToken() {
        return token;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    // === Setters ===
    public void setId(Long id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }
}
