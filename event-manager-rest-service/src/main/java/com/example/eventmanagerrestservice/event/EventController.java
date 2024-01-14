package com.example.eventmanagerrestservice.event;

import java.net.URI;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.eventmanagerrestservice.task.TaskBean;
import com.example.eventmanagerrestservice.task.TaskJPAService;

import jakarta.validation.Valid;

@RestController
public class EventController {
	
	EventJPAService eventJPAService;
	TaskJPAService taskJPAService;
	
	public EventController(EventJPAService eventJPAService, TaskJPAService taskJPAService) {
		super();
		this.eventJPAService = eventJPAService;
		this.taskJPAService = taskJPAService;
	}


	@GetMapping(path= "/users/{username}/events")
	public List<EventBean> getAllEventsByUsername(@PathVariable String username){
		List<EventBean> findAllByUsername = eventJPAService.findAllByUsername(username);
		if(findAllByUsername.isEmpty()) throw new EventNotFoundException("username: " + username);
		return findAllByUsername;
	}
	
	@PostMapping(path= "/users/{username}/events")
	public ResponseEntity<Object> createEventsForUser(@PathVariable String username, @RequestBody @Valid EventBean event){
		event.setUsername(username);
		EventBean savedEvent = eventJPAService.save(event);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{eventId}").buildAndExpand(savedEvent.getEventId()).toUri();
		return ResponseEntity.created(location).build();
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
		Optional<EventBean> event = eventJPAService.findById(id);
		List<TaskBean> tasks = event.get().getTasks();
		for(TaskBean task: tasks) {
			taskJPAService.deleteById(task.getTaskId());
		}
		eventJPAService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	
	//To update the event. 
	//This calls the method which deletes the previous event having the same id and then adds a new one.
	@PutMapping(path = "/users/{username}/events/{id}")
	public void updateEvent(@PathVariable Integer id,@RequestBody @Valid EventBean event) {
		Optional<EventBean> eventOpt = eventJPAService.findById(id);
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
