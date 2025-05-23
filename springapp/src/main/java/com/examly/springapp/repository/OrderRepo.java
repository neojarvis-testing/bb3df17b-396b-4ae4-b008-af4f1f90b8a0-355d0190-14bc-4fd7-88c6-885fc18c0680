package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.User;

@Repository
public interface OrderRepo extends JpaRepository<Order , Long> {

  public List<Order> findByUser(User user);

}


