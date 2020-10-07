package com.eventapp.backend.exception;

public class VoucherNotFoundException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private int voucherId;

    public static VoucherNotFoundException createWith(int voucherId) {
        return new VoucherNotFoundException(voucherId);
    }

    public VoucherNotFoundException(int voucherId) {
        this.voucherId = voucherId;
    }

    @Override
    public String getMessage() {
        return "O "+ voucherId + "não existe.";
    }
}
