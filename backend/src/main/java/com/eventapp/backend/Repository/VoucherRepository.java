package com.eventapp.backend.Repository;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Model.Voucher;
import com.eventapp.backend.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    Voucher findVoucherByEvent(Event event);
    Voucher findVoucherByUser(User user);
}
