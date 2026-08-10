package com.sakh.farmer.controller;

import com.sakh.farmer.dto.AuthRequest;
import com.sakh.farmer.dto.UserResponse;
import com.sakh.farmer.model.User;
import com.sakh.farmer.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final String SESSION_USER_ID = "userId";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest request, HttpSession session) {
        String email = normalize(request.email());
        String password = request.password();

        if (email.isBlank() || password == null || password.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "ईमेल सही भरें और पासवर्ड कम से कम 6 अक्षरों का रखें।"));
        }

        if (userRepository.findByEmailIgnoreCase(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "message", "इस ईमेल से खाता पहले से मौजूद है।"));
        }

        User user = userRepository.save(new User(email, passwordEncoder.encode(password)));
        session.setAttribute(SESSION_USER_ID, user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpSession session) {
        String email = normalize(request.email());

        User user = userRepository.findByEmailIgnoreCase(email).orElse(null);
        if (user == null || request.password() == null ||
                !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "ईमेल या पासवर्ड गलत है।"));
        }

        session.setAttribute(SESSION_USER_ID, user.getId());
        return ResponseEntity.ok(UserResponse.from(user));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Long userId = (Long) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "लॉगिन आवश्यक है।"));
        }

        return userRepository.findById(userId)
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(UserResponse.from(user)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "message", "लॉगिन आवश्यक है।")));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.noContent().build();
    }

    private String normalize(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }
}
