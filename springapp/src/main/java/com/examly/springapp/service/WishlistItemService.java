package com.examly.springapp.service;

import com.examly.springapp.model.Wishlist;

public interface WishlistItemService {
    public Wishlist addToWishlist(Long userId, Long productId, int quantity);
    public Wishlist removeItem(Long userId, Long productId);
}
