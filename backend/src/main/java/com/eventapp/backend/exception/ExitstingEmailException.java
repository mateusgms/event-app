package com.eventapp.backend.exception;

import com.eventapp.backend.Model.User;

public class ExitstingEmailException extends Exception {
    
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private int email;
    public ExitstingEmailException(int email) {
        this.email = email;
    }

    public ExitstingEmailException(User emailUser) {
	}

	public static ExitstingEmailException createWith(int email) {
        return new ExitstingEmailException(email);
    }
    @Override
    public String getMessage() {
        return "email " + email + "não foi encontrado";
    }
}
