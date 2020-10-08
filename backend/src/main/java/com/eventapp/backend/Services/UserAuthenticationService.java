package com.eventapp.backend.Services;

import java.util.Date;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.dto.DadosLogin;
import com.eventapp.backend.exception.ExpiredTokenException;
import com.eventapp.backend.exception.InvalidLoginException;
import com.eventapp.backend.exception.InvalidTokenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;

@Service
public class UserAuthenticationService {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    @Autowired
    public UserAuthenticationService(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public User authenticate(DadosLogin dados, String token)
            throws InvalidLoginException, InvalidTokenException, ExpiredTokenException {

        User user = userRepository.findByEmail(dados.getEmail());

        System.out.println(user.getName());
        System.out.println("Senha igual: " + dados.getSenha().equals(user.getPassword()));
        System.out.println("Token vazio: " + token.isEmpty());
        if (dados.getSenha().equals(user.getPassword()) && !token.isEmpty() && validate(token)) {
            return user;
        } else {
            throw new InvalidLoginException();
        }
    }

    private boolean validate(String token) throws InvalidTokenException, ExpiredTokenException {

        String tokenTratado = token.replace("Bearer ", "");

        Claims claims = tokenService.decodeToken(tokenTratado);

        System.out.println(claims.getIssuer());
        System.out.println(claims.getIssuedAt());
        // Verifica se o token está expirado
        if (claims.getExpiration().before(new Date(System.currentTimeMillis())))
            throw new ExpiredTokenException();
        System.out.println(claims.getExpiration());
        return true;

    }

}
