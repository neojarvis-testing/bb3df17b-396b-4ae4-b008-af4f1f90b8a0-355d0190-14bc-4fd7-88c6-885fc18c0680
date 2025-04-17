package com.examly.springapp.service;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.model.Wishlist;
import com.examly.springapp.repository.WishlistRepo;


@Service
public class WishlistServiceImpl implements WishlistService{

    private WishlistRepo wishlistRepo;
    private UserService userService;

    public WishlistServiceImpl(WishlistRepo wishlistRepo, UserService userService){
        this.wishlistRepo = wishlistRepo;
        this.userService = userService;
    }

    @Override
    public Wishlist getWishlistByUser(Long userId) {
        User user = userService.getUserById(userId);
        return wishlistRepo.findByUser(user)
            .orElseGet(() -> createNewWishlist(user));
    }

    @Override
    public Wishlist createNewWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepo.save(wishlist);
    }

    @Override
    public void clearWishlist(Long userId) {
        Wishlist wishlist = getWishlistByUser(userId);
        if (wishlist != null) {
            wishlist.getWishlistItems().forEach(wishlistItem -> {
                wishlistItem.getProduct().setStockQuantity(
                    wishlistItem.getProduct().getStockQuantity() + wishlistItem.getQuantity()
                );
            });
    
            wishlist.getWishlistItems().clear(); 
            wishlistRepo.save(wishlist); 
        }
    }

    @Override
    public void updateWishlistItemQuantity(Long userId, Long productId, int quantity) {
        Wishlist wishlist = wishlistRepo.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        wishlist.getWishlistItems().stream()
            .filter(item -> item.getProduct().getProductId().equals(productId))
            .findFirst()
            .ifPresent(item -> item.setQuantity(quantity));

        wishlistRepo.save(wishlist);
    }

}
