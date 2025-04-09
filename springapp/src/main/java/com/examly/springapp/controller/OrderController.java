package com.examly.springapp.controller;




import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.service.OrderService;

import jakarta.persistence.EntityNotFoundException;




@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/api/orders")
    public ResponseEntity<?> addOrder(@RequestBody Order order){
      orderService.addOrder(order);
      return ResponseEntity.status(201).body("Order Placed Successfully!!");
    }


    @GetMapping("/api/orders/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId){
            Optional<Order> order = orderService.getOrderById(orderId);
            return ResponseEntity.status(200).body(order);
    }
     

    @GetMapping("/api/orders/user/{userId}")
    public ResponseEntity<?> getOrderByUserId(@PathVariable Long userId){
        try{
            List<Order> orderList = orderService.getOrdersByUserId(userId);
            return ResponseEntity.status(200).body(orderList);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }


    @GetMapping("/api/orders")
    public ResponseEntity<?> getAllOrders(){
            List<Order> orderList = orderService.getAllOrders();
            return ResponseEntity.status(200).body(orderList);
    }


    @PutMapping("/api/orders/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId , @RequestBody Order updatedOrder){
        try{
            Order order = orderService.updateOrder(orderId , updatedOrder);
            return ResponseEntity.status(200).body(order);
        }catch(OrderNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/api/orders/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId){
            orderService.deleteOrder(orderId);
            return ResponseEntity.status(200).body(true);
    }
     


}
