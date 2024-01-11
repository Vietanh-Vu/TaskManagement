package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "priority")
    private Integer priority;

    @Lob
    @Column(name = "status")
    private String status;

    @Lob
    @Column(name = "note")
    private String note;

}