package com.sakh.farmer.dto;

import com.sakh.farmer.model.Favorite;

import java.time.LocalDateTime;

public record FavoriteResponse(
        Long id,
        String item_id,
        String item_type,
        String item_name_hi,
        String item_name_en,
        LocalDateTime created_at
) {
    public static FavoriteResponse from(Favorite f) {
        return new FavoriteResponse(
                f.getId(),
                f.getItemId(),
                f.getItemType(),
                f.getItemNameHi(),
                f.getItemNameEn(),
                f.getCreatedAt()
        );
    }
}
