package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateOrderException;
import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
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
    public Order getOrderById(Long orderId) {
        Optional<Order> opt = orderRepo.findById(orderId);
        if(opt.isEmpty()){
            throw new EntityNotFoundException();
        }
        return opt.get();
    }


    @Override
    public List<Order> getAllOrders() {
        List<Order> orderList = orderRepo.findAll();
        return orderList;
    }


    @Override
    public Order updateOrder(Long orderId, Order updatedOrder) {
       Optional<Order> opt = orderRepo.findById(orderId);
        if(opt.isEmpty()){
          throw new OrderNotFoundException();
        }
        updatedOrder.setOrderId(orderId);
        if(orderRepo.existsById(orderId)){
        throw new DuplicateOrderException(); 
        }
        Order savedOrder = orderRepo.save(updatedOrder);
        return savedOrder;
    }


    @Override
    public List<Order> getOrdersByUserId(Long userId) {
      List<Order> orderList = orderRepo.findByUserUserId(userId);
      return orderList;
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
