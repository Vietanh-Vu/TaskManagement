package com.example.backend.dto;

import com.example.backend.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link Task}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto implements Serializable {
    private LocalDateTime createAt;
    private String name;
    private Integer priority;
    private String status;
    private String note;
}