package com.example.myapp.Controller;

import com.example.myapp.Models.Medicine;
import com.example.myapp.Models.User;
import com.example.myapp.Repository.MedicineRepository;
import com.example.myapp.Repository.UserRepository;
import com.example.myapp.security.TokenGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.example.myapp.service.CustomUserDetail;


import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenGenerator tokenGenerator;

    // ✅ Add Medicine
    @PostMapping("/add")
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        if (user == null) return ResponseEntity.status(401).body("Invalid user");

        long count = medicineRepository.countByUser(user);
        if (count >= 5) {
            return ResponseEntity.badRequest().body("Only 5 medicines can be added");
        }

        medicine.setUser(user);
        medicine.setAddedTime(LocalDateTime.now()); // ✅ make sure this is not null!
        medicineRepository.save(medicine);

        return ResponseEntity.ok("Medicine added successfully");
    }

    // ✅ List Medicines with Pagination + Search
    @GetMapping("/list")
    public ResponseEntity<?> getAllMedicines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "") String search,
            Authentication authentication
    ) {
        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
        User user = userDetails.getUser(); // ✅ direct access to full user

        // now continue as before
        Pageable pageable = PageRequest.of(page, size, Sort.by("addedTime").descending());
        Page<Medicine> medicinePage = search.isEmpty()
                ? medicineRepository.findByUser(user, pageable)
                : medicineRepository.findByUserAndNameContainingIgnoreCase(user, search, pageable);

        return ResponseEntity.ok(medicinePage);
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateMedicine(@PathVariable Long id, @RequestBody Medicine updated, Authentication authentication) {
        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
        String currentUserEmail = userDetails.getUsername();

        Optional<Medicine> optionalMed = medicineRepository.findById(id);
        if (optionalMed.isEmpty()) return ResponseEntity.status(404).body("Medicine not found");

        Medicine med = optionalMed.get();
        if (!med.getUser().getEmail().equals(currentUserEmail)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        med.setName(updated.getName());
        med.setStock(updated.getStock());
        medicineRepository.save(med);
        return ResponseEntity.ok("Updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id, Authentication authentication) {
        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
        String currentUserEmail = userDetails.getUsername();

        Optional<Medicine> optionalMed = medicineRepository.findById(id);
        if (optionalMed.isEmpty()) return ResponseEntity.status(404).body("Medicine not found");

        Medicine med = optionalMed.get();
        if (!med.getUser().getEmail().equals(currentUserEmail)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        medicineRepository.delete(med);
        return ResponseEntity.ok("Deleted successfully");
    }
}