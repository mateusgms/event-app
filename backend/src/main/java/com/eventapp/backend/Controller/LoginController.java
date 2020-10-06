package com.eventapp.backend.Controller;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.LoginService;
import com.eventapp.backend.Services.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @GetMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {

        User user = loginService.getUserByEmail(loginUser);
        System.out.println(user);

        if (user.getEmail().isEmpty()) {
            System.err.println("Credenciais inválidas");
            return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
        } else {
            if (user.getPassword().equals(loginUser.getPassword())) {
                System.out.println("Login bem sucedido com o usuário" + user.getName());
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                System.err.println("Senha incorreta");
                return new ResponseEntity<>(user, HttpStatus.UNAUTHORIZED);
            }

        }

    }

    @PostMapping("/teste")
    public ResponseEntity<User> teste(@RequestBody User loginUser, TokenService tokenService) {

        User user = loginService.getUserByEmail(loginUser);
        System.out.println(user);

        if (user.getEmail().isEmpty()) {
            System.err.println("Credenciais inválidas");
            return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
        } else {
            if (user.getPassword().equals(loginUser.getPassword())) {
                System.out.println("Login bem sucedido com o usuário" + user.getName());
                String token = tokenService.generateToken(user);
                System.out.println(token);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                System.err.println("Senha incorreta");
                return new ResponseEntity<>(user, HttpStatus.UNAUTHORIZED);
            }

        }

    }

}