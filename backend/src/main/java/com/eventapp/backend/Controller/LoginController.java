package com.eventapp.backend.Controller;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class LoginController {

    private UserRepository userRepository;

    @GetMapping("/login")
    public User login(@RequestBody String email, String password) {
        

        System.out.println(user);

        if (user.getEmail().isEmpty()) {
            System.err.println("Credencias invalidas");
            return user;
        } else {
            if (user.getPassword().equals(password)) {
                System.out.println("Login bem sucedido com o usuário" + user.getName());
                return user;
            } else {
                System.err.println("Senha incorreta");
                return user;
            }

        }

    }
    

}