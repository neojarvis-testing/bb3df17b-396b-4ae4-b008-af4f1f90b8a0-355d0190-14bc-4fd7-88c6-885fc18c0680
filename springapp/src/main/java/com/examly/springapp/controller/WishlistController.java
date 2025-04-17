package com.examly.springapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Wishlist;
import com.examly.springapp.service.WishlistItemService;
import com.examly.springapp.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    private WishlistService wishlistService;
    private WishlistItemService wishlistItemService;

    public WishlistController(WishlistService wishlistService, WishlistItemService wishlistItemService){
        this.wishlistService = wishlistService;
        this.wishlistItemService = wishlistItemService;
    }

    @GetMapping("{userId}")
    public ResponseEntity<Wishlist> getWishlist(@PathVariable Long userId) {
        Wishlist wishlist = wishlistService.getWishlistByUser(userId);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add/{userId}/{productId}/{quantity}")
    public ResponseEntity<Wishlist> addToWishlist(@PathVariable Long userId, @PathVariable Long productId,@PathVariable int quantity) {
        Wishlist wishlist = wishlistItemService.addToWishlist(userId, productId, quantity);
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Wishlist> removeItem(@RequestParam Long userId,@RequestParam Long productId) {
        Wishlist wishlist = wishlistItemService.removeItem(userId, productId);
        return ResponseEntity.ok(wishlist);
    }
    
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearWishlist(@PathVariable Long userId) {
        wishlistService.clearWishlist(userId);
        return ResponseEntity.status(201).body("");
    }
    
    @PutMapping("/updateItem/{userId}/{productId}/{quantity}")
    public ResponseEntity<?> updateWishlistItemQuantity(@PathVariable Long userId, @PathVariable Long productId, @PathVariable int quantity) {
        try {
            wishlistService.updateWishlistItemQuantity(userId, productId, quantity);
            return ResponseEntity.ok("Quantity updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating quantity: " + e.getMessage());
        }
    }
}
