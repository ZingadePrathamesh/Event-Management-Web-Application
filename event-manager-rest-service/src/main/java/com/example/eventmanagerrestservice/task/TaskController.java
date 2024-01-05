package com.example.eventmanagerrestservice.task;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping(path = "/users/{username}/events/{eventId}/tasks/{taskId}")
	public TaskBean getTaskFromId(@PathVariable Integer eventId, @PathVariable Integer taskId) {
		Optional<EventBean> eventOpt = eventJPAService.findById(eventId);
		if(eventOpt.isEmpty()) throw new EventNotFoundException("id: "+ eventId);
		List<TaskBean> tasks = eventOpt.get().getTasks();
		
		Predicate<? super TaskBean> predicate = newTask -> newTask.getTaskId().equals(taskId);
		TaskBean taskBean = tasks.stream().filter(predicate).findFirst().orElse(null);
		if(taskBean == null)throw new TaskNotFoundException(taskId); 
		else {
			return taskBean;
		}
	}
	
	@DeleteMapping(path = "/users/{username}/events/{eventId}/tasks/{taskId}")
	public ResponseEntity<Object> deleteTaskById(@PathVariable Integer eventId, @PathVariable Integer taskId) {
		Optional<EventBean> eventOpt = eventJPAService.findById(eventId);
		if(eventOpt.isEmpty()) throw new EventNotFoundException("id: "+ eventId);
		
		
		System.out.println(taskId);
		System.out.println(eventId);
		
		taskJPAService.deleteById(taskId);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path = "/users/{username}/events/{eventId}/tasks/{taskId}")
	public ResponseEntity<Object> updateTaskById(@PathVariable Integer eventId, @PathVariable Integer taskId, 
			@RequestBody TaskBean task) {
		Optional<EventBean> eventOpt = eventJPAService.findById(eventId);
		if(eventOpt.isEmpty()) throw new EventNotFoundException("id: "+ eventId);
		List<TaskBean> tasks = eventOpt.get().getTasks();
		
		Predicate<? super TaskBean> predicate = tas -> tas.getTaskId().equals(taskId);
		TaskBean taskBean = tasks.stream().filter(predicate).findFirst().orElse(null);
		if(taskBean == null) postTaskForEvent(eventId, task);
		else{
			taskBean.setEvent(eventOpt.get());
			taskBean.setAssignedTo(task.getAssignedTo());
			taskBean.setDeadline(task.getDeadline());
			taskBean.setTaskName(task.getTaskName());
			taskBean.setTaskStatus(task.getTaskStatus());			
			taskJPAService.save(taskBean);
		}
		return ResponseEntity.ok().build();
	}
}
