package com.examly.springapp.service;

import java.util.*;

import com.examly.springapp.model.Product;

public interface ProductService {

    Product addProduct(Product product);
    Product getProductById(Long productId);
    List<Product> getAllProducts();
    Product updateProduct(Long productId,Product product);
    boolean deleteProductById(Long productId);
}
