package com.example.backend.controller;

import com.example.backend.dto.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AutoCompleteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final AutoCompleteService autoComplete;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            User user = userRepository.findByUsername(authRequest.getUsername()).orElseThrow(
                    () -> new Exception()
            );
            if (!encoder.matches(authRequest.getPassword(), user.getPassword())) throw new Exception();
            autoComplete.build(user.getId());
            return ResponseEntity.ok().body("Login successfully");
        } catch (Exception e) {
            log.error("Login failed", e);
            return ResponseEntity.badRequest().body("Login failed");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) {
        if (userRepository.findByUsername(authRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userRepository.save(User.builder()
                .username(authRequest.getUsername())
                .password(encoder.encode(authRequest.getPassword()))
                .build());
        return ResponseEntity.ok().body("Register successfully");
    }

    @PostMapping("/exit")
    public ResponseEntity<?> exit(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        autoComplete.updateDatabase(user.getId());
        return ResponseEntity.ok("Exit successfully");
    }
}
