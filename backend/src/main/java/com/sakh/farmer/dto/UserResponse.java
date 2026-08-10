package com.sakh.farmer.dto;

import com.sakh.farmer.model.User;

public record UserResponse(Long id, String email) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getEmail());
    }
}
