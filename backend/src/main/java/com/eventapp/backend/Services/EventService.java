package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Event;
import com.eventapp.backend.Repository.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;


    public Event saveEvent(Event event){

        return repository.save(event);
    }
    
    public List<Event> saveEvents(List<Event> events){

        return repository.saveAll(events);
    }

    public List<Event> getEvents(){

        return repository.findAll();
    }

    public Event getEventById(int id){

        return repository.findById(id).orElse(null);
    }

    public Event getEventByTitle(String name){

        return repository.findByTitle(name);
    }

    public String deleteEvent(int id){

        repository.deleteById(id);
        return "Event removed!! " + id;

    }

    public Event updateEvent(Event event){

        Event existingEvent = repository.findById(event.getId()).orElse(null);
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
