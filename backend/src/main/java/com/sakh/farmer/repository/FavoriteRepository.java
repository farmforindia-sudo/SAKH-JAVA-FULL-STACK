package com.sakh.farmer.repository;

import com.sakh.farmer.model.Favorite;
import com.sakh.farmer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserOrderByCreatedAtDesc(User user);
    Optional<Favorite> findByIdAndUser(Long id, User user);
    boolean existsByUserAndItemIdAndItemType(User user, String itemId, String itemType);
}
