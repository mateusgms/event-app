package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
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
public class UserController {

    @Autowired
    private UserService service;

    // CREATE
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
 
        return service.saveUser(user);
    }

    // GET
    @GetMapping("/users")
    public List<User> findAllUsers() {
        return service.getUsers();
    }
    @GetMapping("/users/{id}")
    public User findUserById(@PathVariable int id) {
        return service.getUserById(id);
    }
    @GetMapping("/users/{name}")
    public User findUserByName(@PathVariable String name) {
        return service.getUserByName(name);
    }

    // PUT
    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return service.updateUser(user);
    }

    // DELETE
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id) {
        return service.deleteUser(id);
    }
}