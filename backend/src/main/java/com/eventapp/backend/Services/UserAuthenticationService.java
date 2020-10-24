package com.eventapp.backend.Services;

import java.util.Date;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.dto.DadosLogin;
import com.eventapp.backend.exception.ExpiredTokenException;
import com.eventapp.backend.exception.InvalidLoginException;
import com.eventapp.backend.exception.InvalidTokenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;

@Service
public class UserAuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    public boolean authenticate(DadosLogin dados, String token)
            throws InvalidLoginException, InvalidTokenException, ExpiredTokenException {

        User user = userRepository.findByEmail(dados.getEmail());

        if (!token.isEmpty())
            return this.validateExpiration(token); // && this.validateEquals(token, user);
        if (BCrypt.checkpw(dados.getSenha(), user.getPassword())) {
            user.setToken(tokenService.generateToken(user));
            System.out.println("NOVO TOKEN: " + user.getToken());
            return true;
        } else {
            throw new InvalidLoginException(user.getId());
        }
    }

    private boolean validateExpiration(String token) throws ExpiredTokenException {

        String tokenTratado = token.replace("Bearer ", "");
        Claims claims = tokenService.decodeToken(tokenTratado);

        // System.out.println(claims.getIssuedAt());
        // System.out.println("userId: " + claims.getSubject());
        // System.out.println("name: " + claims.get("name"));
        // System.out.println("isAdmin: " + claims.get("isAdmin"));
        // System.out.println("Token Expirado: " + claims.getExpiration().before(new
        // Date(System.currentTimeMillis())));
        if (claims.getExpiration().before(new Date(System.currentTimeMillis())))
            // insert clear token cookie function here
            return false;
        // throw new ExpiredTokenException()
        return true;

    }

    private boolean validateEquals(String token, User user) throws InvalidTokenException {
        String tokenTratado = token.replace("Bearer ", "");
        if (tokenTratado.equals(user.getToken()))
            // insert clear token cookie function here
            return false;
        // throw new InvalidTokenException()
        return true;
    }

}
