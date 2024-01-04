package com.example.eventmanagerrestservice.task;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TaskNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public TaskNotFoundException(Integer id) {
		super("Task with id: " + id+ " Not found!");
	}

}
