package com.eventapp.backend.Repository;

import com.eventapp.backend.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
}