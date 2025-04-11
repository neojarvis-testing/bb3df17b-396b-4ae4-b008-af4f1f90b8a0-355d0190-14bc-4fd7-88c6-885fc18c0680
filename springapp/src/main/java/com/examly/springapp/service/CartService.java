package com.examly.springapp.service;

import com.examly.springapp.model.Cart;

public interface CartService {

    Cart addToCart(Long userId,Long productId);

}
