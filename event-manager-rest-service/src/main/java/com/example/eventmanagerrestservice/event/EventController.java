package com.example.eventmanagerrestservice.event;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	
	@DeleteMapping(path = "/users/{username}/events/{id}")
	public ResponseEntity<EventBean> deleteEventById(@PathVariable String username ,@PathVariable Integer id) {
		eventService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
