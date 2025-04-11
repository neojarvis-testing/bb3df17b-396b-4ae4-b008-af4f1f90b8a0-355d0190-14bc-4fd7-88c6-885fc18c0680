package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Cart;
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
    public Cart addToCart(Long userId,Long productId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the product by ID
        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        // Create a new Cart entity and set user and product
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);

        // Save the cart to the repository
        Cart savedCart=cartRepo.save(cart);

        return savedCart;
    }

    

}
