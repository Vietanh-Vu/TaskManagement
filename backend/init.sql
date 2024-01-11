-- Tạo bảng user
CREATE TABLE `user`
(
    user_id  INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tạo bảng task
CREATE TABLE `task`
(
    task_id   INT PRIMARY KEY AUTO_INCREMENT,
    user_id   INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name      VARCHAR(255) NOT NULL,
    priority  INT,
    status    ENUM ('Todo','Doing', 'Done'),
    note      TEXT,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

-- Tạo bảng word
CREATE TABLE `word`
(
    word_id   INT PRIMARY KEY AUTO_INCREMENT,
    user_id   INT,
    word      VARCHAR(255) NOT NULL,
    frequency INT,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

-- password: `123456`
INSERT INTO `user` (user_id, username, password)
VALUES (1, 'vietanh', '$2a$10$DMmHKvAu8GtWkGUc1rO9UuKQivwY.RDI2aDElOsroZg.LEH9amNeq');

-- Dữ liệu cho bảng word
INSERT INTO `word` (user_id, word, frequency)
VALUES (1, 'programming', 10),
       (1, 'database', 8),
       (1, 'web', 5),
       (1, 'machine', 7),
       (1, 'project', 3),
       (1, 'frontend', 6),
       (1, 'backend', 4),
       (1, 'algorithm', 9),
       (1, 'presentation', 2),
       (1, 'coding', 8);

-- Dữ liệu cho bảng task
INSERT INTO `task` (user_id, name, priority, status, note, create_at)
VALUES (1, 'Programming Assignment 1', 1, 'Todo', 'Finish by end of week', NOW()),
       (1, 'Update Database Schema', 2, 'Doing', 'Scheduled for next week', NOW() - INTERVAL 1 DAY),
       (1, 'Design Website Homepage', 3, 'Todo', 'Sketch ideas, get feedback', NOW() - INTERVAL 2 DAY),
       (1, 'Implement ML Algorithm', 1, 'Done', 'Successfully tested', NOW() - INTERVAL 3 DAY),
       (1, 'Project Management Meeting', 2, 'Doing', 'Discuss progress and tasks', NOW() - INTERVAL 4 DAY),
       (1, 'Frontend Development', 2, 'Todo', 'Create responsive UI', NOW() - INTERVAL 5 DAY),
       (1, 'Backend API Integration', 3, 'Todo', 'Connect frontend with backend services', NOW() - INTERVAL 6 DAY),
       (1, 'Algorithm Optimization', 1, 'Doing', 'Improve efficiency of existing algorithm', NOW() - INTERVAL 7 DAY),
       (1, 'Client Presentation', 2, 'Todo', 'Prepare slides and demo for client meeting', NOW() - INTERVAL 8 DAY),
       (1, 'Coding Challenge', 1, 'Todo', 'Participate in coding competition', NOW() - INTERVAL 9 DAY),
       (1, 'Code Review', 2, 'Doing', 'Review team members\' code and provide feedback', NOW() - INTERVAL 10 DAY),
       (1, 'Database Performance Tuning', 1, 'Todo', 'Optimize database queries', NOW() - INTERVAL 11 DAY),
       (1, 'Bug Fixing', 2, 'Todo', 'Address reported bugs in the system', NOW() - INTERVAL 12 DAY),
       (1, 'Machine Learning Research', 3, 'Todo', 'Explore latest trends in ML', NOW() - INTERVAL 13 DAY),
       (1, 'Team Collaboration', 2, 'Doing', 'Coordinate with team on ongoing projects', NOW() - INTERVAL 14 DAY),
       (1, 'UI/UX Design', 3, 'Todo', 'Create wireframes for new features', NOW() - INTERVAL 15 DAY),
       (1, 'Project Documentation', 1, 'Todo', 'Update project documentation', NOW() - INTERVAL 16 DAY),
       (1, 'Code Deployment', 2, 'Todo', 'Deploy latest version of the application', NOW() - INTERVAL 17 DAY),
       (1, 'User Feedback Analysis', 3, 'Todo', 'Review and analyze user feedback', NOW() - INTERVAL 18 DAY),
       (1, 'Agile Sprint Planning', 1, 'Todo', 'Plan tasks for the upcoming sprint', NOW() - INTERVAL 19 DAY);


