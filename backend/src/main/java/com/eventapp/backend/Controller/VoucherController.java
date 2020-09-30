package com.eventapp.backend.Controller;

import java.util.Date;
import java.util.List;

import com.eventapp.backend.Controller.exception.EventNotFoundException;
import com.eventapp.backend.Controller.exception.UserNotFoundException;
import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Model.Voucher;
import com.eventapp.backend.Repository.EventRepository;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.Services.VoucherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // CREATE
    @PostMapping(value = "/vouchers")
    public ResponseEntity<Voucher> addVoucher(@RequestBody Voucher voucher, @RequestParam("userId") int userId,
            @RequestParam("eventId") int eventId) throws UserNotFoundException, EventNotFoundException {
        User user;
        Event event;

        if (userRepository.findById(userId).get().equals(null)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            user = userRepository.findById(userId).get();
            System.out.println("User encontrado " + user.getId());
        }
        if (eventRepository.findById(eventId).get().equals(null)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            event = eventRepository.findById(eventId).get();
        }

        Date now = new Date();

        if (user.equals(null) || event.getDate().before(now)) {
            System.out.println("Usuário ou Evento invalido! User: " + user.getId() + "Evento fora de data"
                    + event.getDate().before(now));

            return new ResponseEntity<>(voucher, HttpStatus.BAD_REQUEST);

        } else {

            voucher.setUser(user);

            voucher.setEvent(event);

            voucherService.saveVoucher(voucher);
            System.out.println("Voucher " + voucher.getId() + " foi criado com sucesso!");
            return new ResponseEntity<>(voucher, HttpStatus.OK);
        }

    }

    // GET
    @GetMapping("/vouchers")
    public ResponseEntity<List<Voucher>> findAllVouchers() {
        return new ResponseEntity<>(voucherService.getVouchers(), HttpStatus.OK);
    }

    @GetMapping(value = "/vouchers/id/{id}")
    public ResponseEntity<Voucher> getVoucherById(@RequestParam int id) {

        Voucher voucher = voucherService.getVoucherById(id);
        Event event = voucher.getEvent();
        Date now = new Date();

        if(event.getDate().before(now)){
            voucher.setAvailable(false);
            return new ResponseEntity<>(voucher, HttpStatus.OK);
        } else {
            voucher.setAvailable(true);
            return new ResponseEntity<>(voucher, HttpStatus.OK);
        }

        
    }

    @PutMapping("/vouchers")
    public ResponseEntity<Voucher> updateVoucher(@RequestBody Voucher voucher) {

        return new ResponseEntity<>(voucherService.updateVoucher(voucher), HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/vouchers/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable int id) {
        return new ResponseEntity<>(voucherService.deleteVoucher(id), HttpStatus.OK);
    }
}
