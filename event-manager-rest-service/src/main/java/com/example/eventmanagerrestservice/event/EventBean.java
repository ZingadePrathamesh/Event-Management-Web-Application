package com.example.eventmanagerrestservice.event;

import java.time.LocalDate;

public class EventBean {
	private Integer id;
	private String name;
	private String username;
	private String status;
	private LocalDate targetDate;
	public EventBean(Integer id, String username, String name, String status, LocalDate targetDate) {
		super();
		this.id = id;
		this.username = username;
		this.name = name;
		this.status = status;
		this.targetDate = targetDate;
	}
	public EventBean() {
		super();
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDate getTargetDate() {
		return targetDate;
	}
	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}
	
	@Override
	public String toString() {
		return "EventBean [id=" + id + ", name=" + name + ", status=" + status + ", targetDate=" + targetDate + "]";
	}
	
	
}

