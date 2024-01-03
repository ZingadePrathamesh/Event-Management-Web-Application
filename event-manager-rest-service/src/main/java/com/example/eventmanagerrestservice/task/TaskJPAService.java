package com.example.eventmanagerrestservice.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskJPAService extends JpaRepository<TaskBean, Integer> {

}
