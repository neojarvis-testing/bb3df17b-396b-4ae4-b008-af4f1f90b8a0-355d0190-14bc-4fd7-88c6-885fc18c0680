package com.examly.springapp.exceptions;

public class DuplicateOrderException extends RuntimeException{

    public DuplicateOrderException(){
        super();
    }

    public DuplicateOrderException(String message){
        super(message);
    }
}
