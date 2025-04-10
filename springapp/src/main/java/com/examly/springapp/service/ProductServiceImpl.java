package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateProductException;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;

import jakarta.persistence.EntityNotFoundException;


@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepo productRepo;

    @Override
    public Product addProduct(Product product) {
        // Optional<Product> opt=productRepo.findById(product.);
        // if(opt.isPresent()){
        //     throw new DuplicateProductException();
        // }
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
    if (productRepo.existsById(productId)) {
        product.setProductId(productId); // Ensure the correct ID is set
        return productRepo.save(product); // Save updated product to the database
    } else {
        throw new RuntimeException("Product not found with ID: " + productId); // Handle product not found
    }
    }

    @Override
    public Product deleteProductById(Long productId,Product product) {
        product.setProductId(productId);
        if(productRepo.existsById(productId)){
            productRepo.deleteById(productId);
            return product;
        }
        else{
            throw new RuntimeException("Product not found for Deletion.");
        }
    }
       //     Product existingProduct = productRepo.findById(productId)
    //             .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
 
    //     // Update the existing product's fields with the new data
    // existingProduct.setProductName(product.getProductName());
    // existingProduct.setDescription(product.getDescription());
    // existingProduct.setPrice(product.getPrice());
    // existingProduct.setCategory(product.getCategory());
    // existingProduct.setBrand(product.getBrand());
   
 
    // // Save and return the updated product
    // return productRepo.save(existingProduct);
}
