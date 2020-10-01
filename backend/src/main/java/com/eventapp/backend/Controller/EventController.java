package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Controller.exception.EventNotFoundException;
import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Services.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class EventController {

    @Autowired
    private EventService service;

    // CREATE
    @PostMapping("/events")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {

        return new ResponseEntity<>(service.saveEvent(event), HttpStatus.OK);
    }

    // GET
    @GetMapping("/events")
    public ResponseEntity<List<Event>> findAllEvents() {
        return new ResponseEntity<>(service.getEvents(), HttpStatus.OK);
    }

    @GetMapping("/events/id/{id}")
    public ResponseEntity<Event> findEventById(@PathVariable int id) throws EventNotFoundException {
         return new ResponseEntity<>(service.getEventById(id), HttpStatus.OK);
     }
     @GetMapping("/events/name/{name}")
     public ResponseEntity<Event> findEventByTitle(@PathVariable String title) {
         return new ResponseEntity<>(service.getEventByTitle(title), HttpStatus.OK);
     }
 
     // PUT
     @PutMapping("/events")
     public ResponseEntity<Event> updateEvent(@RequestBody Event event) throws EventNotFoundException {
         return new ResponseEntity<>(service.updateEvent(event), HttpStatus.OK);
     }
 
     // DELETE
     @DeleteMapping("/events/{id}")
     public ResponseEntity<String> deleteEvent(@PathVariable int id) {
         return new ResponseEntity<>(service.deleteEvent(id), HttpStatus.OK);
     }
    
    
}
