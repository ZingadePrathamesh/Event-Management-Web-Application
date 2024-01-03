package com.example.eventmanagerrestservice.event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventJPAService extends JpaRepository<EventBean, Integer> {
	public List<EventBean> findAllByUsername(String username);
}
