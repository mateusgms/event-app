package com.eventapp.backend.Services;

import java.security.Key;
import java.sql.Date;
import java.util.Base64;

import javax.crypto.spec.SecretKeySpec;

import com.eventapp.backend.Model.User;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    private static long expirationTime = 900_000;
    // private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private String secret = "46070D4BF934FB0D4B06D9E2C46E346944E322444900A435D7D9A95E6D7435F5";
    Key key = new SecretKeySpec(Base64.getDecoder().decode(secret), SignatureAlgorithm.HS256.getJcaName());

    public String generateToken(User user) {
        return Jwts.builder().setIssuedAt(new Date(System.currentTimeMillis())).setSubject(String.valueOf(user.getId()))
                .claim("isAdmin", user.getIsAdmin().toString()).claim("name", user.getName())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)).signWith(key).compact();
    }

    public Claims decodeToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}
