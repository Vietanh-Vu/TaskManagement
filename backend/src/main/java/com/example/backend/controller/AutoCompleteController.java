package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.AutoCompleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/trie")
public class AutoCompleteController {

    private final AutoCompleteService autoComplete;

    @GetMapping
    public ResponseEntity<?> getAutoComplete(
            @RequestParam String prefix,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        List<String> res = autoComplete.autoComplete(prefix.toLowerCase(), user.getId());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insert(
            @RequestParam String word,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        autoComplete.insert(word, user.getId());
        return ResponseEntity.ok().build();
    }
}
