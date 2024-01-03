package com.example.eventmanagerrestservice.event;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping(path= "/users/{username}/events")
	public void createEventsForUser(@RequestBody EventBean event){
		eventService.save(event);
	}
	
	//To retrieve a single event using the id
	@GetMapping(path = "/users/{username}/events/{id}")
	public EventBean getEventById(@PathVariable String username ,@PathVariable Integer id) {
		return eventService.findById(id);
	}
	
	//To delete the event using the id
	@DeleteMapping(path = "/users/{username}/events/{id}")
	public ResponseEntity<EventBean> deleteEventById(@PathVariable String username ,@PathVariable Integer id) {
		eventService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	
	//To update the event. 
	//This calls the method which deletes the previous event having the same id and then adds a new one.
	@PutMapping(path = "/users/{username}/events/{id}")
	public void updateEvent(@PathVariable Integer id,@RequestBody EventBean event) {
		eventService.updateById(id, event);
	}
	
}
