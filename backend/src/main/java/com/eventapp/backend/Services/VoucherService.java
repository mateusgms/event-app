package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Model.Voucher;
import com.eventapp.backend.Repository.VoucherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepository repository;

    public Voucher saveVoucher(Voucher voucher) {
        return repository.save(voucher);
    }

    public List<Voucher> saveVouchers(List<Voucher> vounchers) {
        return repository.saveAll(vounchers);
    }

    public List<Voucher> getVouchers() {
		return repository.findAll();
    }
    
    public Voucher getVoucherById(int id) {
		return repository.findById(id).orElse(null);
	}
    public Voucher getVoucherByEvent(Event event) {
        return repository.findVoucherByEvent(event);
    }

    public String deleteVoucher(int id){

        repository.deleteById(id);
        return "Voucher removed!! " + id;

    }

    public Voucher updateVoucher(Voucher voucher) {

        Voucher existingVoucher = repository.findById(voucher.getId()).orElse(null);

        existingVoucher.setQuantity(voucher.getQuantity());


        return repository.save(existingVoucher);
    }

	

	
}
