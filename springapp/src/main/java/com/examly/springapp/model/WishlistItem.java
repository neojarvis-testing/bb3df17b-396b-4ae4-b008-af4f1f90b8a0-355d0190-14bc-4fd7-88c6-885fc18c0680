package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishlistItemId;

    @ManyToOne
    @JsonIgnore
    private Wishlist wishlist;

    @ManyToOne
    private Product product;
    private int quantity;
    
    public WishlistItem() {
    }



    public WishlistItem(Wishlist wishlist, Product product, int quantity) {
        this.wishlist = wishlist;
        this.product = product;
        this.quantity = quantity;
    }

    public Long getWishlistItemId() {
        return wishlistItemId;
    }

    public void setWishlistItemId(Long wishlistItemId) {
        this.wishlistItemId = wishlistItemId;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "WishlistItem [wishlistItemId=" + wishlistItemId + ", wishlist=" + wishlist + ", product=" + product
                + ", quantity=" + quantity + "]";
    }
    
}
