package com.sakh.farmer.dto;

public record FavoriteRequest(
        String itemId,
        String itemType,
        String itemNameHi,
        String itemNameEn
) {}
