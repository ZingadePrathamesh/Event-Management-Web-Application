package com.example.eventmanagerrestservice.event;

import java.time.LocalDate;
import java.util.List;

import com.example.eventmanagerrestservice.task.TaskBean;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class EventBean {
	
	@Id
	@GeneratedValue
	private Integer eventId;
	@Size(min=2, message="Atleast 2 characters")
	private String name;
	private String username;
	@NotNull
	private String status;
	

	@OneToMany(mappedBy = "eventBean")
	@JsonIgnore
	private List<TaskBean> tasks;
	
	private LocalDate targetDate;
	public EventBean(Integer id, String username, String name, String status, LocalDate targetDate) {
		super();
		this.eventId = id;
		this.username = username;
		this.name = name;
		this.status = status;
		this.targetDate = targetDate;
	}
	public EventBean() {
		super();
	}
	
	public Integer getEventId() {
		return eventId;
	}
	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}
	public List<TaskBean> getTasks() {
		return tasks;
	}
	public void setTasks(List<TaskBean> tasks) {
		this.tasks = tasks;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
		return "EventBean [id=" + eventId + ", name=" + name + ", status=" + status + ", targetDate=" + targetDate + "]";
	}
	
	
}

