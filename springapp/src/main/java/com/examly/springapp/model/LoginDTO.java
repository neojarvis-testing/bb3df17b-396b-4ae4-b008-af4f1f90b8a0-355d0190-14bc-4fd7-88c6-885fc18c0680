package com.examly.springapp.model;

public class LoginDTO {
    private String email;
    private String password;
    private String role;
    private String token;

    public LoginDTO() {

    }

    public LoginDTO(String email, String password, String role, String token) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.token = token;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
