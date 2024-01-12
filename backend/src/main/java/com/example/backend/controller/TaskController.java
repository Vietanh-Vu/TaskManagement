package com.example.backend.controller;

import com.example.backend.entity.Task;
import com.example.backend.dto.TaskDto;
import com.example.backend.entity.User;
import com.example.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<?> getAll(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Task> tasks = taskRepository.findByUser_Id(user.getId());
        List<TaskDto> result = tasks.stream().map((element) -> mapper.map(element, TaskDto.class)).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody TaskDto newTask,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        Task task = mapper.map(newTask, Task.class);
        task.setCreateAt(LocalDateTime.now());
        task.setUser(user);
        taskRepository.save(task);
        return ResponseEntity.ok("Success insert task.");
    }

    @PutMapping
    public ResponseEntity<?> update(
            Authentication authentication,
            @RequestBody TaskDto updateTask
    ) {
        User user = (User) authentication.getPrincipal();
        Task task = taskRepository.findByCreateAtAndUser_Id(updateTask.getCreateAt(), user.getId());
        mapper.map(updateTask, task);
        taskRepository.save(task);
        return ResponseEntity.ok("Success update task.");
    }

    @DeleteMapping
    public ResponseEntity<?> delete(Authentication authentication, @RequestBody TaskDto deleteTask) {
        User user = (User) authentication.getPrincipal();
        Task task = taskRepository.findByCreateAtAndUser_Id(deleteTask.getCreateAt(), user.getId());
        taskRepository.delete(task);
        return ResponseEntity.ok("Success delete task.");
    }
}
