package com.example.backend.repository;

import com.example.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Integer> {
    List<Word> findAllByUser_Id(int userId);
}