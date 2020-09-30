package com.eventapp.backend.Model;

import java.util.List;

public class ApiError {

    private List<String> errors;

    public ApiError(List<String> errorMessages) {
	}

	public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    
}
