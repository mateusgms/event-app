package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Controller.exception.UserNotFoundException;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<User> addUser(@RequestBody User user) throws UserNotFoundException {
 
        return new ResponseEntity<>(service.saveUser(user), HttpStatus.OK);
    }

    // GET
    @GetMapping("/users")
    public ResponseEntity<List<User>> findAllUsers() {
        return new ResponseEntity<>(service.getUsers(), HttpStatus.OK);
    }
    @GetMapping("/users/id/{id}")
    public ResponseEntity<User> findUserById(@PathVariable int id) {
        return new ResponseEntity<>(service.getUserById(id), HttpStatus.OK);
    }
    @GetMapping("/users/email/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable String email) {
        return new ResponseEntity<>(service.getUserByEmail(email), HttpStatus.OK);
    }
    // PUT
    @PutMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return new ResponseEntity<>(service.updateUser(user), HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return new ResponseEntity<>(service.deleteUser(id), HttpStatus.OK);
    }
}