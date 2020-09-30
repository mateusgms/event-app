package com.eventapp.backend.Controller.exception;

public class UserNotFoundException extends Exception{

    private String email;

    private UserNotFoundException(String email) {
        this.email = email;
    }

    public static UserNotFoundException createWith(String email) {
        return new UserNotFoundException(email);
    }
    @Override
    public String getMessage() {
        return "User " + email + "não foi encontrado";
    }
}
