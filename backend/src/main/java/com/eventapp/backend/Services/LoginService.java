package com.eventapp.backend.Services;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    
    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(User user) {
        String email = user.getEmail();
        return userRepository.findByEmail(email);
    }
}
