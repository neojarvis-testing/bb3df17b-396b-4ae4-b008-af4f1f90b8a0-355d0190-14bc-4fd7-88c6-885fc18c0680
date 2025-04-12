package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.CartRepo;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;


@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Cart getCartByUserId(Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        return user.getCart();


        // Fetch the product by ID
        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        // Create a new Cart entity and set user and product
        Cart cart = new Cart();
        cart.setUser(user);
        // cart.setProduct(product);
    }


    @Override
    public Cart addToCart(Long userId, Long productId, int quantity) {
        User user = userRepo.findById(userId).orElse(null);
        Product product = productRepo.findById(productId).orElse(null);
        
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }
        
        OrderItem orderItem = cart.getItems().stream()
                        .filter(item -> item.getProduct().getProductId().equals(productId))
                        .findFirst()
                        .orElse(new OrderItem());
        
        orderItem.setProduct(product);
        orderItem.setQuantity(orderItem.getQuantity() + quantity);
        orderItem.setCart(cart);
        
        cart.getItems().add(orderItem);
        cartRepo.save(cart);
        
        return cart;
        
    }

    @Override
    public void clearCart(Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        Cart cart = user.getCart();
        if (cart != null) {
            cart.getItems().clear();
            cartRepo.save(cart);
        }
        
    }

}
