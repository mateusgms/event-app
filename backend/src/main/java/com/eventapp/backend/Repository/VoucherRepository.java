package com.eventapp.backend.Repository;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Model.Voucher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    //Voucher findById(Event event);
    Voucher findVoucherByEvent(Event event);
}
