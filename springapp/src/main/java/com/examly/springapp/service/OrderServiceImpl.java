package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;




@Service
public class OrderServiceImpl implements OrderService{


    @Autowired
    private OrderRepo orderRepository;
    
    @Autowired
    private UserRepo userRepo;

    @Override
    public Order addOrder(Order order) {
        return orderRepository.save(order); // Returns the saved order
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrder(Long orderId, Order updatedOrder) {
        updatedOrder.setOrderId(orderId);
        if(orderRepository.existsById(orderId)){
           Order savedOrder = orderRepository.save(updatedOrder);
           return savedOrder;
        }
        else{
            throw new OrderNotFoundException("Order Not Found");
        }

    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        Optional<User> user = userRepo.findById(userId);
        if(user.isPresent()){
            return orderRepository.findByUser(user.get());
        }
        else{
            throw new EntityNotFoundException("User Not Found");
        }
    }

    @Override
    public boolean deleteOrder(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return true;
        }
        return false;
    }

}
