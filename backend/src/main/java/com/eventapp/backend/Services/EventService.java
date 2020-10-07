package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Repository.EventRepository;
import com.eventapp.backend.exception.EventNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;


    public Event saveEvent(Event event){

        return repository.save(event);
    }
    

    public List<Event> getEvents(){

        return repository.findAll();
    }

    public Event getEventById(int id) throws EventNotFoundException{
        return repository.findById(id).orElseThrow(() -> new EventNotFoundException(id));
    }

    public Event getEventByTitle(String name){

        return repository.findByTitle(name);
    }

    public String deleteEvent(int id){

        repository.deleteById(id);
        return "Event removed!! " + id;

    }

    public Event updateEvent(Event event) throws EventNotFoundException {

        Event existingEvent = repository.findById(event.getId()).orElseThrow(() -> new EventNotFoundException(event));
        existingEvent.setAddress(event.getAddress());
        existingEvent.setCountry(event.getCountry());
        existingEvent.setDate(event.getDate());
        existingEvent.setTitle(event.getTitle());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setValue(event.getValue());
        existingEvent.setImageURL(event.getImageURL());
        existingEvent.setUf(event.getUf());

        return repository.save(existingEvent);
    }    
}
