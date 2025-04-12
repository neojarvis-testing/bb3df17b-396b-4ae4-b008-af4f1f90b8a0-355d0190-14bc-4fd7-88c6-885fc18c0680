package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Cart;
import com.examly.springapp.service.CartService;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/api/cart/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.status(200).body(cart);
    }

    @PostMapping("/{userId}/add/{productId}/{quantity}")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long userId, @PathVariable Long productId, @PathVariable int quantity) {
        Cart cart = cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.status(201).body(cart);
    }


    @DeleteMapping("/api/cart/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}

