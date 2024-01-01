package com.example.eventmanagerrestservice.event;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {
	
	EventService eventService;
	
	public EventController(EventService eventService) {
		super();
		this.eventService = eventService;
	}


	@GetMapping(path= "/users/{username}/events")
	public List<EventBean> getAllEventsByUsername(@PathVariable String username){
		return eventService.findAllByUsername(username);
	}
	
	@GetMapping(path = "/users/{username}/events/{id}")
	public EventBean getEventById(@PathVariable String username ,@PathVariable Integer id) {
		return eventService.findById(id);
	}
}
