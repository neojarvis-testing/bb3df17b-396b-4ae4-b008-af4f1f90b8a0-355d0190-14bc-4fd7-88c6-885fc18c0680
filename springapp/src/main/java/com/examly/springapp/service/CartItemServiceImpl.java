package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.CartItem;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.CartItemRepo;
import com.examly.springapp.repository.CartRepo;
import com.examly.springapp.repository.ProductRepo;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemRepo cartItemRepository;

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepo cartRepo;

    @Transactional
    public Cart addToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartService.getCartByUser(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (quantity > product.getStockQuantity()) {
            throw new RuntimeException("Requested quantity exceeds available stock");
        }

        // Deduct stock
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product); // Save updated product stock

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

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartService.getCartByUser(userId);

        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();
            product.setStockQuantity(product.getStockQuantity() + cartItem.getQuantity()); // Restore stock
            productRepository.save(product); // Save updated stock
        }

        cart.getCartItems().clear();
        cartRepo.save(cart);
    }

}
