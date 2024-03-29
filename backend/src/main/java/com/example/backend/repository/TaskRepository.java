package com.example.backend.repository;

import com.example.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    Task findByCreateAtAndUser_Id(LocalDateTime createAt, Integer userId);

    List<Task> findByUser_Id(Integer userId);
}