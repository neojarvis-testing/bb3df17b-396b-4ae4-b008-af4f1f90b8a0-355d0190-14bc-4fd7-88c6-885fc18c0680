package com.examly.springapp.service;

import java.util.*;

import com.examly.springapp.model.Product;

public interface ProductService {

    public Product addProduct(Product product);
    public Product getProductById(Long productId);
    public List<Product> getAllProducts();
    public Product updateProduct(Long productId,Product product);
    public boolean deleteProductById(Long productId);
}
