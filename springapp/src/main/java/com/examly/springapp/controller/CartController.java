package com.examly.springapp.controller;

import com.examly.springapp.model.Cart;
import com.examly.springapp.service.CartItemService;
import com.examly.springapp.service.CartService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private CartService cartService;
    private CartItemService cartItemService;

    public CartController(CartService cartService, CartItemService cartItemService){
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

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
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
    cartService.clearCart(userId);
    return ResponseEntity.status(201).body("");
    }
    
    @PutMapping("/updateItem/{userId}/{productId}/{quantity}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long userId, @PathVariable Long productId, @PathVariable int quantity) {
        try {
            cartService.updateCartItemQuantity(userId, productId, quantity);
            return ResponseEntity.ok("Quantity updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error updating quantity: " + e.getMessage());
        }

    }

}