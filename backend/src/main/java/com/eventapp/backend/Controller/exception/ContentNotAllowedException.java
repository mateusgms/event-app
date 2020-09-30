package com.eventapp.backend.Controller.exception;

import java.util.Collection;
import java.util.List;

import org.springframework.validation.ObjectError;

public class ContentNotAllowedException extends Exception{

    List<ObjectError> errors;
    
    public ContentNotAllowedException(List<ObjectError> errors) {
    }

    public static ContentNotAllowedException createWith(List<ObjectError> errors) {
        return new ContentNotAllowedException(errors);
    }
	public List<ObjectError> getErrors() {
		
        return errors;
	}

}
