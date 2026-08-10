package com.sakh.farmer.controller;

import com.sakh.farmer.dto.FavoriteRequest;
import com.sakh.farmer.dto.FavoriteResponse;
import com.sakh.farmer.model.Favorite;
import com.sakh.farmer.model.User;
import com.sakh.farmer.repository.FavoriteRepository;
import com.sakh.farmer.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    private static final String SESSION_USER_ID = "userId";

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    public FavoriteController(FavoriteRepository favoriteRepository, UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> list(HttpSession session) {
        User user = currentUser(session);
        if (user == null) return unauthorized();

        List<FavoriteResponse> result = favoriteRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().map(FavoriteResponse::from).toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody FavoriteRequest request, HttpSession session) {
        User user = currentUser(session);
        if (user == null) return unauthorized();

        if (blank(request.itemId()) || blank(request.itemType()) ||
                blank(request.itemNameHi()) || blank(request.itemNameEn())) {
            return ResponseEntity.badRequest().body(Map.of("message", "पसंदीदा आइटम की जानकारी अधूरी है।"));
        }

        if (favoriteRepository.existsByUserAndItemIdAndItemType(
                user, request.itemId(), request.itemType())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "message", "यह आइटम पहले से पसंदीदा में है।"));
        }

        Favorite saved = favoriteRepository.save(new Favorite(
                user,
                request.itemId(),
                request.itemType(),
                request.itemNameHi(),
                request.itemNameEn()
        ));
        return ResponseEntity.status(HttpStatus.CREATED).body(FavoriteResponse.from(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id, HttpSession session) {
        User user = currentUser(session);
        if (user == null) return unauthorized();

        var favorite = favoriteRepository.findByIdAndUser(id, user);
        if (favorite.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        favoriteRepository.delete(favorite.get());
        return ResponseEntity.noContent().build();
    }

    private User currentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute(SESSION_USER_ID);
        if (userId == null) return null;
        return userRepository.findById(userId).orElse(null);
    }

    private ResponseEntity<Map<String, String>> unauthorized() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "message", "लॉगिन आवश्यक है।"));
    }

    private boolean blank(String value) {
        return value == null || value.isBlank();
    }
}
