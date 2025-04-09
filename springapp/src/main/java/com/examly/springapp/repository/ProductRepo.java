package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Product;

public interface ProductRepo extends JpaRepository<Product,Long>{


}
