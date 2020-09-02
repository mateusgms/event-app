package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Services.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class EventController {

    @Autowired
    private EventService service;

     // CREATE
     @PostMapping("/addEvent")
     public Event addEvent(@RequestBody Event event) {
  
         return service.saveEvent(event);
     }
     @PostMapping("/addEvents")
     public List<Event> addEvents(@RequestBody List<Event> events) {
         return service.saveEvents(events);
     }
 
     // GET
     @GetMapping("/events")
     public List<Event> findAllEvents() {
         return service.getEvents();
     }
     @GetMapping("/eventById/{id}")
     public Event findEventById(@PathVariable int id) {
         return service.getEventById(id);
     }
     @GetMapping("/event/{name}")
     public Event findEventByTitle(@PathVariable String title) {
         return service.getEventByTitle(title);
     }
 
     // PUT
     @PutMapping("/updateEvent")
     public Event updateEvent(@RequestBody Event event) {
         return service.updateEvent(event);
     }
 
     // DELETE
     @DeleteMapping("/deleteEvent/{id}")
     public String deleteEvent(@PathVariable int id) {
         return service.deleteEvent(id);
     }
    
    
}
