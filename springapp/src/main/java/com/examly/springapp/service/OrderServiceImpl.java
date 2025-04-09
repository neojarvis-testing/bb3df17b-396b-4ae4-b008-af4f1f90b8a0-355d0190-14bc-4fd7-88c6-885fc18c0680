package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.exceptions.DuplicateOrderException;
import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.UserRepo;

public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Order addOrder(Order order) {
        Order newOrder = orderRepo.save(order);
        return newOrder;

    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        Optional<Order> order = orderRepo.findById(orderId);
        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        List<Order> orderList = orderRepo.findAll();
        return orderList;
    }

    @Override
    public Optional<Order> updateOrder(Long orderId, Order updatedOrder) {
       Optional<Order> opt = orderRepo.findById(orderId);
       if(opt.isEmpty()){
          throw new OrderNotFoundException();
       }
       if(orderRepo.existsById(orderId)){
        throw new DuplicateOrderException(); 
       }
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
      

    }

    @Override
    public boolean deleteOrder(Long orderId) {
        Optional<Order> opt = orderRepo.findById(orderId);
        if(opt.isEmpty()){
            throw new OrderNotFoundException();
        }
        orderRepo.deleteById(orderId);
        return true;
    }

}
