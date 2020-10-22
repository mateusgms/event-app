package com.eventapp.backend.exception;

public class PostNotFoundException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private int postId;

    public static PostNotFoundException createWith(int postId) {
        return new PostNotFoundException(postId);
    }

    public PostNotFoundException(int postId) {
        this.postId = postId;
    }

    @Override
    public String getMessage() {
        return "O " + postId + "não existe.";
    }
}
