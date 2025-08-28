package com.example.myapp.Models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Medicine {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    private int stock;
	    private LocalDateTime addedTime;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;

    // === Getters ===
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getStock() {
        return stock;
    }

    public LocalDateTime getAddedTime() {
        return addedTime;
    }

    public User getUser() {
        return user;
    }

    // === Setters ===
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setAddedTime(LocalDateTime addedTime) {
        this.addedTime = addedTime;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
