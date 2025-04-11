package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Cart;
import com.examly.springapp.service.CartService;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/api/cart/{userId}/{productId}")
    public ResponseEntity<?> addToCart(@PathVariable Long userId,@PathVariable Long productId){
        Cart savedCart=cartService.addToCart(userId, productId);
        return ResponseEntity.status(200).body(savedCart);
    }

}
