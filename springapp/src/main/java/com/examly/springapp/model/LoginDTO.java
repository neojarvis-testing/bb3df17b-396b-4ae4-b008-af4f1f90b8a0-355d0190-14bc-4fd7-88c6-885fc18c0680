package com.examly.springapp.model;

public class LoginDTO {

    private String token;
    private int userId;
    private String email;
    private String role;
    private String username;

    public LoginDTO() {

    }

    public LoginDTO(String token, int userId, String email, String role, String username) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.role = role;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "LoginDTO [token=" + token + ", userId=" + userId + ", email=" + email + ", role=" + role + ", username="
                + username + "]";
    }


    

}
