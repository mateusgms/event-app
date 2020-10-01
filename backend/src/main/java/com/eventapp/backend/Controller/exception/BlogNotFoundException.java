package com.eventapp.backend.Controller.exception;

public class BlogNotFoundException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private int blogId;

    public static BlogNotFoundException createWith(int blogId) {
        return new BlogNotFoundException(blogId);
    }

    public BlogNotFoundException(int blogId) {
        this.blogId = blogId;
    }

    @Override
    public String getMessage() {
        return "O "+ blogId + "não existe.";
    }
}
