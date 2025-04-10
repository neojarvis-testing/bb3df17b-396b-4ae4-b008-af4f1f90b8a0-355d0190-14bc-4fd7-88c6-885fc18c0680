package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.DuplicateProductException;
import com.examly.springapp.model.Product;
import com.examly.springapp.service.ProductService;
import jakarta.persistence.EntityNotFoundException;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/api/products")
    public ResponseEntity<?> addProduct(@RequestBody Product product){
        try{
        Product savedProduct=productService.addProduct(product);
        return ResponseEntity.status(201).body(savedProduct);
        }
        catch(DuplicateProductException e){
            return ResponseEntity.status(201).body("Product already exists with that Id");
        }
    }

    @GetMapping("/api/products/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId){
        try{
            Product product=productService.getProductById(productId);
            return ResponseEntity.status(200).body(product);
        }
        catch(EntityNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/api/products")
    public ResponseEntity<?> getAllProducts(){
        List<Product> productList=productService.getAllProducts();
        return ResponseEntity.status(200).body(productList);
    }

    @PutMapping("/api/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId,@RequestBody Product product){
        try{
            Product updatedProduct=productService.updateProduct(productId, product);
            return ResponseEntity.status(200).body(updatedProduct);
        }
        catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/api/products/{productId}")
    public ResponseEntity<?> deleteProductById(@PathVariable Long productId,@RequestBody Product product){
        try{
            Product deletedProduct=productService.deleteProductById(productId,product);
            return ResponseEntity.status(200).body(deletedProduct); 
        }
        catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
