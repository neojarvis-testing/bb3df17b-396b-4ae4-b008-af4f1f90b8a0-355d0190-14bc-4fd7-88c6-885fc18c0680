package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.Product;
import com.examly.springapp.model.Wishlist;
import com.examly.springapp.model.WishlistItem;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.WishlistItemRepo;
import com.examly.springapp.repository.WishlistRepo;

@Service
public class WishlistItemServiceImpl implements WishlistItemService{
    
    private WishlistItemRepo wishlistItemRepository;
    private ProductRepo productRepository;
    private WishlistService wishlistService;
    private WishlistRepo wishlistRepo;

    public WishlistItemServiceImpl(WishlistItemRepo wishlistItemRepository, ProductRepo productRepository, WishlistService wishlistService, WishlistRepo wishlistRepo){
        this.wishlistItemRepository = wishlistItemRepository;
        this.productRepository = productRepository;
        this.wishlistService = wishlistService;
        this.wishlistRepo = wishlistRepo;
    }

    @Transactional
    public Wishlist addToWishlist(Long userId, Long productId, int quantity) {
        Wishlist wishlist = wishlistService.getWishlistByUser(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (quantity > product.getStockQuantity()) {
            throw new RuntimeException("Requested quantity exceeds available stock");
        }

        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);

        WishlistItem wishlistItem = wishlist.getWishlistItems().stream()
                .filter(ci -> ci.getProduct().equals(product))
                .findFirst()
                .orElse(new WishlistItem(wishlist, product, 0));

        wishlistItem.setQuantity(wishlistItem.getQuantity() + quantity);
        wishlistItemRepository.save(wishlistItem);

        return wishlist;
    }

    @Override
    public Wishlist removeItem(Long userId, Long productId) {
        Wishlist wishlist = wishlistService.getWishlistByUser(userId);
        wishlist.getWishlistItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        return wishlist;
    }

    @Transactional
    public void clearWishlist(Long userId) {
        Wishlist wishlist = wishlistService.getWishlistByUser(userId);

        for (WishlistItem wishlistItem : wishlist.getWishlistItems()) {
            Product product = wishlistItem.getProduct();
            product.setStockQuantity(product.getStockQuantity() + wishlistItem.getQuantity());
            productRepository.save(product);
        }

        wishlist.getWishlistItems().clear();
        wishlistRepo.save(wishlist);
    }
}
