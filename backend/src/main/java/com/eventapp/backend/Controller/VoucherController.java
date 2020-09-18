package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Model.Voucher;
import com.eventapp.backend.Repository.EventRepository;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.Services.VoucherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
public class VoucherController {
    

    @Autowired
    private VoucherService voucherService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;
    
    //CREATE
    @PostMapping(value = "/vouchers")
    public Voucher addVoucher(@RequestBody Voucher voucher,@RequestParam("userId") int userId, @RequestParam("eventId") int eventId) {
        try {
            User user = userRepository.findById(userId).get();
            Event event = eventRepository.findById(eventId).get();
            voucher.setUser(user);
            voucher.setEvent(event);
            Voucher voucherSave = voucherService.saveVoucher(voucher);
            return voucherSave;
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
        
        
    }
    // GET
    @GetMapping("/vouchers")
    public List<Voucher> findAllVouchers() {
        return voucherService.getVouchers();
    }

    @GetMapping(value="/vouchers/id/{id}")
    public Voucher getVoucherById(@RequestParam int id) {
        return voucherService.getVoucherById(id);
    }
    @PutMapping("/vouchers")
     public Voucher updateVoucher(@RequestBody Voucher voucher) {
         return voucherService.updateVoucher(voucher);
     }
 
     // DELETE
     @DeleteMapping("/vouchers/{id}")
     public String deleteVoucher(@PathVariable int id) {
         return voucherService.deleteVoucher(id);
     }
}
