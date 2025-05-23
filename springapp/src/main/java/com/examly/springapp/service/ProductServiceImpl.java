package com.examly.springapp.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;

import jakarta.persistence.EntityNotFoundException;


@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepo productRepo;

    public ProductServiceImpl(ProductRepo productRepo){
        this.productRepo = productRepo;
    }

    @Override
    public Product addProduct(Product product) {
        // Optional<Product> opt=productRepo.findById(product.);
        // if(opt.isPresent()){
        //     throw new DuplicateProductException();
        // }
        if (product.getCoverImage() != null && !product.getCoverImage().startsWith("data:image")) {
            product.setCoverImage("data:image/jpeg;base64," + product.getCoverImage());
        }
        Product savedProduct=productRepo.save(product);
        return savedProduct;
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> opt=productRepo.findById((productId));
        if(opt.isEmpty()){
            throw new EntityNotFoundException("Product not found with that Id");
        }

        return opt.get();
    }

    @Override
    public List<Product> getAllProducts() {
       List<Product> productList=productRepo.findAll();
       return productList;
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        if (product.getCoverImage() != null && !product.getCoverImage().startsWith("data:image")) {
            product.setCoverImage("data:image/jpeg;base64," + product.getCoverImage());
        }
    if (productRepo.existsById(productId)) {
        product.setProductId(productId); // Ensure the correct ID is set
        return productRepo.save(product); // Save updated product to the database
    } else {
        throw new RuntimeException("Product not found with ID: " + productId); // Handle product not found
    }
    }

    @Override
    public boolean deleteProductById(Long productId) {
        if(productRepo.existsById(productId)){
            productRepo.deleteById(productId);
            return true;
        }
        else{
            return false;
        }
    }
}
