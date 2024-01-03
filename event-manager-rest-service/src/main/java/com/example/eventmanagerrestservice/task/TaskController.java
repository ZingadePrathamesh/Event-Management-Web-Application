package com.example.eventmanagerrestservice.task;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.eventmanagerrestservice.event.EventBean;
import com.example.eventmanagerrestservice.event.EventJPAService;
import com.example.eventmanagerrestservice.event.EventNotFoundException;

@RestController
public class TaskController {
	
	private TaskJPAService taskJPAService;
	private EventJPAService eventJPAService;
	
	public TaskController(TaskJPAService taskJPAService, EventJPAService eventJPAService) {
		super();
		this.taskJPAService = taskJPAService;
		this.eventJPAService = eventJPAService;
	}

	@GetMapping(path = "/users/{username}/events/{eventId}/tasks")
	public List<TaskBean> getTaskForEvent(@PathVariable Integer eventId) {
		Optional<EventBean> eventOpt = eventJPAService.findById(eventId);
		if(eventOpt.isEmpty()) throw new EventNotFoundException("id: "+ eventId);
		
		return eventOpt.get().getTasks();
	}
	
	@PostMapping(path = "/users/{username}/events/{eventId}/tasks")
	public void postTaskForEvent(@PathVariable Integer eventId, @RequestBody TaskBean task) {
		Optional<EventBean> eventOpt = eventJPAService.findById(eventId);
		if(eventOpt.isEmpty()) throw new EventNotFoundException("id: "+ eventId);
		
		task.setEvent(eventOpt.get());
		taskJPAService.save(task);
	}
}
