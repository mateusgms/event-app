package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Support;
import com.eventapp.backend.Services.SupportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
public class SupportController {

    @Autowired
    private SupportService service;

    // CREATE
    @PostMapping("/supports")
    public Support addSupport(@RequestBody Support support) {
 
        return service.saveSupport(support);
    }

    // GET
    @GetMapping("/supports")
    public List<Support> findAllSupports() {
        return service.getSupports();
    }
    @GetMapping("/supports/{id}")
    public Support findSupportById(@PathVariable int id) {
        return service.getSupportById(id);
    }
    /*
    @GetMapping("/support/{name}")
    public Support findSupportByName(@PathVariable String name) {
        return service.getSupportByName(name);
    }
    */
    
    // PUT
    @PutMapping("/supports")
    public Support updateSupport(@RequestBody Support support) {
        return service.updateSupport(support);
    }

    // DELETE
    @DeleteMapping("/supports/{id}")
    public String deleteSupport(@PathVariable int id) {
        return service.deleteSupport(id);
    }
}