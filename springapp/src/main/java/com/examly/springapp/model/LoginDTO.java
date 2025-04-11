package com.examly.springapp.model;

public class LoginDTO {
    private String email;
    private String password;

    public LoginDTO() {

    }

    public LoginDTO(String email, String password, String role, String token) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
