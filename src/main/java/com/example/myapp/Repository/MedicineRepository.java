package com.example.myapp.Repository;

import com.example.myapp.Models.Medicine;
import com.example.myapp.Models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    
    long countByUser(User user);

    // ✅ Pagination support
    Page<Medicine> findByUser(User user, Pageable pageable);

    // ✅ Search + Pagination support
    Page<Medicine> findByUserAndNameContainingIgnoreCase(User user, String name, Pageable pageable);
}
