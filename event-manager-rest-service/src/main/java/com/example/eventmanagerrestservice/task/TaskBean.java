package com.example.eventmanagerrestservice.task;

import java.time.LocalDate;

import com.example.eventmanagerrestservice.event.EventBean;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class TaskBean {
	@Id
	@GeneratedValue
	private Integer taskId;
	
	private String taskName;
	
	private String taskStatus;
	
	private String assignedTo;
	
	private LocalDate deadline;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private EventBean eventBean;

	public TaskBean(Integer taskId, String taskName, String taskStatus, String assignedTo, LocalDate deadline) {
		super();
		this.taskId = taskId;
		this.taskName = taskName;
		this.taskStatus = taskStatus;
		this.assignedTo = assignedTo;
		this.deadline = deadline;
	}

	public TaskBean() {
		super();
	}

	public Integer getTaskId() {
		return taskId;
	}

	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}

	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public LocalDate getDeadline() {
		return deadline;
	}

	public void setDeadline(LocalDate deadline) {
		this.deadline = deadline;
	}

	public EventBean getEvent() {
		return eventBean;
	}

	public void setEvent(EventBean event) {
		this.eventBean = event;
	}

	@Override
	public String toString() {
		return "TaskBean [taskId=" + taskId + ", taskName=" + taskName + ", taskStatus=" + taskStatus + ", assignedTo="
				+ assignedTo + ", deadline=" + deadline + ", event=" + eventBean + "]";
	}
	
	
}
