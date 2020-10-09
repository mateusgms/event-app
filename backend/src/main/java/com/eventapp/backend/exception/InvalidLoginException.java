package com.eventapp.backend.exception;

public class InvalidLoginException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private int userId;

    public static InvalidLoginException createWith(int userId) {
        return new InvalidLoginException(userId);
    }

    public InvalidLoginException(int userId) {
        this.userId = userId;
    }

    @Override
    public String getMessage() {
        return "Senha Incorreta - User id:" + userId + ".";
    }
}
