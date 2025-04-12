package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.CartItem;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.CartItemRepo;
import com.examly.springapp.repository.ProductRepo;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemRepo cartItemRepository;

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private CartService cartService;

    public Cart addToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartService.getCartByUser(userId);

        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getCartItems().stream()
            .filter(ci -> ci.getProduct().equals(product))
            .findFirst()
            .orElse(new CartItem(cart, product, 0));

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItemRepository.save(cartItem);

        return cart;
    }

    public Cart removeItem(Long userId, Long productId) {
        Cart cart = cartService.getCartByUser(userId);
        cart.getCartItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        return cart;
    }
}
