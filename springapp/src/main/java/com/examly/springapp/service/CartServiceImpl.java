package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.CartRepo;

@Service
public class CartServiceImpl implements CartService {
    
    @Autowired
    private CartRepo cartRepository;

    @Autowired
    private UserServiceImpl userService;

    public Cart getCartByUser(Long userId) {
        User user = userService.getUserById(userId);
        return cartRepository.findByUser(user)
            .orElseGet(() -> createNewCart(user));
    }

    public  Cart createNewCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public void clearCart(Long userId) {
        Cart cart = getCartByUser(userId);
        if (cart != null) {
            cart.getCartItems().forEach(cartItem -> {
                cartItem.getProduct().setStockQuantity(
                    cartItem.getProduct().getStockQuantity() + cartItem.getQuantity()
                );
            });
    
            cart.getCartItems().clear(); 
            cartRepository.save(cart); 
        }
    }
    

    public void updateCartItemQuantity(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getCartItems().stream()
            .filter(item -> item.getProduct().getProductId().equals(productId))
            .findFirst()
            .ifPresent(item -> item.setQuantity(quantity));

        cartRepository.save(cart);
    }
    
    
}
