package com.example.eventmanagerrestservice.event;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
public class EventController {
	
	EventJPAService eventJPAService;
	
	public EventController(EventJPAService eventJPAService) {
		super();
		this.eventJPAService = eventJPAService;
	}


	@GetMapping(path= "/users/{username}/events")
	public List<EventBean> getAllEventsByUsername(@PathVariable String username){
		return eventJPAService.findAllByUsername(username);
	}
	
	@PostMapping(path= "/users/{username}/events")
	public void createEventsForUser(@RequestBody @Valid EventBean event){
		eventJPAService.save(event);
	}
	
	//To retrieve a single event using the id
	@GetMapping(path = "/users/{username}/events/{id}")
	public EventBean getEventById(@PathVariable String username ,@PathVariable Integer id) {
		
		 Optional<EventBean> eventOpt = eventJPAService.findById(id);
		 if(eventOpt.isEmpty()) throw new EventNotFoundException("id: "+ id);
		 
		 return eventOpt.get();
	}
	
	//To delete the event using the id
	@DeleteMapping(path = "/users/{username}/events/{id}")
	public ResponseEntity<EventBean> deleteEventById(@PathVariable String username ,@PathVariable Integer id) {
		eventJPAService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	
	//To update the event. 
	//This calls the method which deletes the previous event having the same id and then adds a new one.
	@PutMapping(path = "/users/{username}/events/{id}")
	public void updateEvent(@PathVariable Integer id,@RequestBody @Valid EventBean event) {
		Optional<EventBean> eventOpt = eventJPAService.findById(id);
		System.out.println(eventOpt.get());
		System.out.println(event);
		if(eventOpt.isEmpty()) {
			eventJPAService.save(event);
		}
		else {
			EventBean eventFin = eventOpt.get();
			eventFin.setName(event.getName());
			eventFin.setStatus(event.getStatus());
			eventFin.setTargetDate(event.getTargetDate());
			eventJPAService.save(eventFin);
		}	
	}
	
}
