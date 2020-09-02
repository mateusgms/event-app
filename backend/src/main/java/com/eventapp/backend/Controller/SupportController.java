package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Support;
import com.eventapp.backend.Services.SupportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class SupportController {

    @Autowired
    private SupportService service;

    // CREATE
    @PostMapping("/addSupport")
    public Support addSupport(@RequestBody Support support) {
 
        return service.saveSupport(support);
    }
    @PostMapping("/addSupports")
    public List<Support> addSupports(@RequestBody List<Support> supports) {
        return service.saveSupports(supports);
    }

    // GET
    @GetMapping("/supports")
    public List<Support> findAllSupports() {
        return service.getSupports();
    }
    @GetMapping("/supportById/{id}")
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
    @PutMapping("/updateSupport")
    public Support updateSupport(@RequestBody Support support) {
        return service.updateSupport(support);
    }

    // DELETE
    @DeleteMapping("/deleteSupport/{id}")
    public String deleteSupport(@PathVariable int id) {
        return service.deleteSupport(id);
    }
}