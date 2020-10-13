package com.eventapp.backend.Services;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRegistrationService {

    @Autowired
    private UserService userService;

    public User registrate(User user) {
        return userService.saveUser(user);
    }

    public User update(User user) {
        return userService.saveUser(user);
    }

}