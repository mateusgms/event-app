package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public User saveUser(User user){
        return repository.save(user);
    }
    
    public List<User> saveUsers(List<User> users){
        return repository.saveAll(users);
    }
    public List<User> getUsers(){
        return repository.findAll();
    }
    public User getUserById(int id){
        return repository.findById(id).orElse(null);
    }
    public User getUserByName(String name){
        return repository.findByName(name);
    }
    public String deleteUser(int id){
        repository.deleteById(id);
        return "product removed!! " + id;
    }
    public User updateUser(User user){
        User existingUser = repository.findById(user.getId()).orElse(null);
        existingUser.setAddress(user.getAddress());
        existingUser.setCountry(user.getCountry());
        existingUser.setDate(user.getDate());
        existingUser.setEmail(user.getEmail());
        existingUser.setName(user.getName());
        existingUser.setPassword(user.getPassword());
        existingUser.setPhone(user.getPhone());
        existingUser.setUf(user.getUf());
        existingUser.setUsername(user.getUsername());

        return repository.save(existingUser);
    }
}