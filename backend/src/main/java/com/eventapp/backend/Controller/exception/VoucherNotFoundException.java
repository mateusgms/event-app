package com.eventapp.backend.Controller.exception;

public class VoucherNotFoundException extends Exception {

    private int quantity;

    public static VoucherNotFoundException createWith(int quantity) {
        return new VoucherNotFoundException(quantity);
    }

    private VoucherNotFoundException(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String getMessage() {
        return "Você tem "+ quantity + "de vouchers";
    }
}
