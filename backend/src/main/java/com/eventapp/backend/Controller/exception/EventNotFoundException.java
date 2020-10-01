package com.eventapp.backend.Controller.exception;


public class EventNotFoundException extends Exception{

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private int event;
    public EventNotFoundException(int event) {
        this.event = event;
    }

    public static EventNotFoundException createWith(int event) {
        return new EventNotFoundException(event);
    }
    @Override
    public String getMessage() {
        return "User " + event + "não foi encontrado";
    }
}
