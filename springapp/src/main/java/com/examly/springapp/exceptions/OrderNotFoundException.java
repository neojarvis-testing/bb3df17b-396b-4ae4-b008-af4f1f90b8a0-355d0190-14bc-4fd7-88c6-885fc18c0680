package com.examly.springapp.exceptions;

public class OrderNotFoundException extends RuntimeException{

    public OrderNotFoundException(){
        super();
    }

    public OrderNotFoundException(String message){
        super(message);
    }
}
