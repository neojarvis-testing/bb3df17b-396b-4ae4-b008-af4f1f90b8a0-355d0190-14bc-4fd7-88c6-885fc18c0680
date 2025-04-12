package com.examly.springapp.controller;

import com.examly.springapp.model.Cart;
import com.examly.springapp.service.CartItemService;
import com.examly.springapp.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private CartItemService cartItemService;

    @GetMapping("{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUser(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add/{userId}/{productId}/{quantity}")
    public ResponseEntity<Cart> addToCart(@PathVariable Long userId, @PathVariable Long productId,@PathVariable int quantity) {
        Cart cart = cartItemService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeItem(@RequestParam Long userId,@RequestParam Long productId) {
        Cart cart = cartItemService.removeItem(userId, productId);
        return ResponseEntity.ok(cart);
    }
    
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared successfully");
    }

}