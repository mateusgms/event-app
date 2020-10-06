package com.eventapp.backend.Services;

import java.security.Key;
import java.sql.Date;

import com.eventapp.backend.Model.User;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    private static long expirationTime = 900_000;
    Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(User user) {

        return Jwts.builder().setIssuedAt(new Date(System.currentTimeMillis())).setSubject("Teste Jwt API")
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)).signWith(key).compact();

    }
}