package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class UserController {


    @Autowired
    private UserService service;

    // CREATE
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return service.saveUser(user);
    }
    @PostMapping("/addUsers")
    public List<User> addUsers(@RequestBody List<User> users) {
        return service.saveUsers(users);
    }

    // GET
    @GetMapping("/users")
    public List<User> findAllUsers() {
        return service.getUsers();
    }
    @GetMapping("/userById/{id}")
    public User findUserById(@PathVariable int id) {
        return service.getUserById(id);
    }
    @GetMapping("/user/{name}")
    public User findUserByName(@PathVariable String name) {
        return service.getUserByName(name);
    }

    // PUT
    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        return service.updateUser(user);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id) {
        return service.deleteUser(id);
    }
}