package com.examly.springapp.service;

import com.examly.springapp.model.Cart;

public interface CartItemService {
    public Cart addToCart(Long userId, Long productId, int quantity);
    public Cart removeItem(Long userId, Long productId);
}
