package com.example.myapp.Repository;

import com.example.myapp.Models.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Optional<User> findByToken(String token);
	boolean existsByToken(String token);

}
