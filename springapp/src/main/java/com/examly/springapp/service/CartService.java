package com.examly.springapp.service;

import com.examly.springapp.model.Cart;

public interface CartService {

    public Cart getCartByUserId(Long userId);
    public Cart addToCart(Long userId,Long productId,int quantity);
    public void clearCart(Long userId);
}
