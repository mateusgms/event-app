package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Voucher;
import com.eventapp.backend.Services.VoucherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class VoucherController {
    

    @Autowired
    private VoucherService service;

    //CREATE
    @PostMapping(value = "/addVoucher")
    public Voucher addVoucher(@RequestBody Voucher voucher) {

        return service.saveVoucher(voucher);
        
    }

    @PostMapping(value="/addVouchers")
    public List<Voucher> addVouchers(@RequestBody List<Voucher> vouchers) {
        
        return service.saveVouchers(vouchers);
    }
    
    // GET
    @GetMapping("/vouchers")
    public List<Voucher> findAllVouchers() {
        return service.getVouchers();
    }

    @GetMapping(value="/voucherById/{id}")
    public Voucher getVoucherById(@RequestParam int id) {
        return service.getVoucherById(id);
    }
    @PutMapping("/updateVoucher")
     public Voucher updateVoucher(@RequestBody Voucher voucher) {
         return service.updateVoucher(voucher);
     }
 
     // DELETE
     @DeleteMapping("/deleteVoucher/{id}")
     public String deleteVoucher(@PathVariable int id) {
         return service.deleteVoucher(id);
     }
}
