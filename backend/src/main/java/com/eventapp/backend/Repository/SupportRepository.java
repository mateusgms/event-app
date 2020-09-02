package com.eventapp.backend.Repository;

import com.eventapp.backend.Model.Support;
import com.eventapp.backend.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SupportRepository extends JpaRepository<Support, Integer> {

	Support findByUser(User user);
    //Support findByUser(User user);
}