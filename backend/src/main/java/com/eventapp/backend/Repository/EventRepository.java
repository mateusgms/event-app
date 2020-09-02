package com.eventapp.backend.Repository;

import com.eventapp.backend.Model.Event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
    Event findByTitle(String name);
}
