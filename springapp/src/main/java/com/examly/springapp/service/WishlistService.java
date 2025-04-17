package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.model.Wishlist;

public interface WishlistService {
    public Wishlist getWishlistByUser(Long userId);
    public Wishlist createNewWishlist(User user);
    public void clearWishlist(Long userId);
    public void updateWishlistItemQuantity(Long userId, Long productId, int quantity);
}
