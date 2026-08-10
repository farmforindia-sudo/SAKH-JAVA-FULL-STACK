package com.sakh.farmer.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorites",
       uniqueConstraints = @UniqueConstraint(
           name = "uq_user_favorite",
           columnNames = {"user_id", "item_id", "item_type"}))
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "item_id", nullable = false)
    private String itemId;

    @Column(name = "item_type", nullable = false)
    private String itemType;

    @Column(name = "item_name_hi", nullable = false)
    private String itemNameHi;

    @Column(name = "item_name_en", nullable = false)
    private String itemNameEn;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Favorite() {}

    public Favorite(User user, String itemId, String itemType, String itemNameHi, String itemNameEn) {
        this.user = user;
        this.itemId = itemId;
        this.itemType = itemType;
        this.itemNameHi = itemNameHi;
        this.itemNameEn = itemNameEn;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getItemId() { return itemId; }
    public String getItemType() { return itemType; }
    public String getItemNameHi() { return itemNameHi; }
    public String getItemNameEn() { return itemNameEn; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public User getUser() { return user; }
}
