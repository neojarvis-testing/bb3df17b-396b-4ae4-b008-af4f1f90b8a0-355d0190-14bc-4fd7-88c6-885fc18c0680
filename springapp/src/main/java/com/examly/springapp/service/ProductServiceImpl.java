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
        Optional<Product> opt=productRepo.findById(product.getProductId());
        if(opt.isPresent()){
            throw new DuplicateProductException();
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
        product.setProductId(productId);
        if(productRepo.existsById(productId)){
            Product updatedProduct=productRepo.save(product);
            return updatedProduct;
        }
        else{
            throw new RuntimeException("Product not found for Updation.");
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

}
