package com.eventapp.backend.Controller;

import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.UserAuthenticationService;
import com.eventapp.backend.Services.UserRegistrationService;
import com.eventapp.backend.Services.UserService;
import com.eventapp.backend.dto.DadosLogin;
import com.eventapp.backend.dto.UserAutheticatedDTO;
import com.eventapp.backend.dto.UserRegistrationDTO;
import com.eventapp.backend.exception.ExpiredTokenException;
import com.eventapp.backend.exception.InvalidLoginException;
import com.eventapp.backend.exception.InvalidTokenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @Autowired
    private UserRegistrationService userRegistrationService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserAutheticatedDTO> authentication(@RequestBody DadosLogin dadosLogin,
            @RequestHeader String Authorization)
            throws InvalidLoginException, InvalidTokenException, ExpiredTokenException {

        if (userAuthenticationService.authenticate(dadosLogin, Authorization)) {
            String email = dadosLogin.getEmail();
            User user = userService.getUserByEmail(email);
            System.out.println("Usuário " + user.getEmail() + " logado");
            return new ResponseEntity<UserAutheticatedDTO>(UserAutheticatedDTO.toDTO(user, "Bearer "),
                    HttpStatus.ACCEPTED);
        } else {
            String email = dadosLogin.getEmail();
            User user = userService.getUserByEmail(email);
            // System.out.println(user);
            return new ResponseEntity<UserAutheticatedDTO>(UserAutheticatedDTO.toDTO(user, "Bearer "),
                    HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping("/register")
    public ResponseEntity<UserAutheticatedDTO> registrate(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        User user = userRegistrationService.registrate(userRegistrationDTO.toUser());

        return new ResponseEntity<UserAutheticatedDTO>(UserAutheticatedDTO.toDTO(user, "Bearer "), HttpStatus.CREATED);

    }

}
