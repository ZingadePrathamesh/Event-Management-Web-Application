package com.example.eventmanagerrestservice.task;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.eventmanagerrestservice.event.EventBean;
import com.example.eventmanagerrestservice.event.EventJPAService;
import com.example.eventmanagerrestservice.event.EventNotFoundException;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {
	
	@Mock
	EventJPAService eventJPAService;
	
	@Mock
	TaskJPAService taskJPAService;
	
	@InjectMocks
	TaskController taskController;

	@Test
	void getTaskForEvent_TaskFound() {
		EventBean testEvent0 = new EventBean(10, "test", "test", "test", LocalDate.now());
		List<TaskBean> tasks = new ArrayList<TaskBean>();
		tasks.add(new TaskBean(101, "test", "test", "test", LocalDate.now()));
		Optional<EventBean> testEvent = Optional.of(testEvent0);
		when(eventJPAService.findById(10)).thenReturn(testEvent);
		List<TaskBean> actualTasks = taskController.getTaskForEvent(10);
		assertEquals(testEvent0.getTasks(),actualTasks);
	}
	@Test
	void getTaskForEvent_TaskEmpty() {
		EventBean testEvent0 = new EventBean(10, "test", "test", "test", LocalDate.now());
		Optional<EventBean> testEvent = Optional.of(testEvent0);
		when(eventJPAService.findById(10)).thenReturn(testEvent);
		List<TaskBean> actualTasks = taskController.getTaskForEvent(10);
		assertEquals(null,actualTasks);
	}
	@Test
	void getTaskForEvent_EventNotFound() {
		when(eventJPAService.findById(10)).thenReturn(Optional.empty());
		assertThrows(EventNotFoundException.class,()-> taskController.getTaskForEvent(10));
	}
	

}
