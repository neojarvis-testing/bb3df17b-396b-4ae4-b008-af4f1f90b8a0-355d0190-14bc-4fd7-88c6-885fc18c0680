package com.examly.springapp.service;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.User;

public interface CartService {
    public Cart getCartByUser(Long userId);
    public Cart createNewCart(User user);
    public void clearCart(Long userId);
}
