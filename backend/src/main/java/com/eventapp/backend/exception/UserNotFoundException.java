package com.eventapp.backend.exception;

public class UserNotFoundException extends Exception{

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private int userId;

    public UserNotFoundException(int userId) {
        this.userId = userId;
    }

    public static UserNotFoundException createWith(int userId) {
        return new UserNotFoundException(userId);
    }
    @Override
    public String getMessage() {
        return "User " + userId + " não foi encontrado";
    }
}
