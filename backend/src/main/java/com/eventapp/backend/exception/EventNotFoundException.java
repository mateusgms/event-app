package com.eventapp.backend.exception;

import com.eventapp.backend.Model.Event;

public class EventNotFoundException extends Exception{

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private int event;
    public EventNotFoundException(int event) {
        this.event = event;
    }

    public EventNotFoundException(Event event2) {
	}

	public static EventNotFoundException createWith(int event) {
        return new EventNotFoundException(event);
    }
    @Override
    public String getMessage() {
        return "Event " + event + "não foi encontrado";
    }
}
