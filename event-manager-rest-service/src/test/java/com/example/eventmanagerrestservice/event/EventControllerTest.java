package com.example.eventmanagerrestservice.event;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.eventmanagerrestservice.task.TaskBean;
import com.example.eventmanagerrestservice.task.TaskJPAService;


@ExtendWith(MockitoExtension.class)
class EventControllerTest {
	@Mock
	EventJPAService eventJPAService;
	
	@Mock
	TaskJPAService taskJPAService;
	
	@InjectMocks
	EventController eventController;
	
	 @Test
	    public void getEventById_Found() {
	        // Set up mock behavior
	        EventBean expectedEvent = new EventBean();
	        expectedEvent.setEventId(1);
	        expectedEvent.setName("Test Event");
	        when(eventJPAService.findById(1)).thenReturn(Optional.of(expectedEvent));

	        // Call the method under test
	        EventBean actualEvent = eventController.getEventById("testUser", 1);

	        // Verify results
	        assertEquals(expectedEvent, actualEvent);
	    }

	    @Test
	    public void getEventById_NotFound() {
	        // Set up mock behavior
	        when(eventJPAService.findById(2)).thenReturn(Optional.empty());

	        // Call the method and expect exception
	        assertThrows(EventNotFoundException.class, () -> {
	            eventController.getEventById("testUser", 2);
	        });
	    }
	    
	    @Test
	    public void getAllEventsByUsernameTest_Found() {
	    	List<EventBean> expectedValue = new ArrayList<EventBean>();
	    	expectedValue.add(new EventBean());
	    	expectedValue.add(new EventBean());
	    	expectedValue.add(new EventBean());
	    	when(eventJPAService.findAllByUsername("test2")).thenReturn(expectedValue);
	    	
	    	List<EventBean> actualValue = eventController.getAllEventsByUsername("test2");
	    	assertEquals(expectedValue, actualValue);
	    }
	    
	    @Test
	    public void getAllEventsByUsernameTest_NotFound() {
	    	when(eventJPAService.findAllByUsername("test2")).thenReturn(new ArrayList<EventBean>());
	    	assertThrows(EventNotFoundException.class, ()->{
	    		eventController.getAllEventsByUsername("test2");
	    	});
	    }
	    
	    @Test
	    public void testDeleteEventById() {
	        String username = "testuser";
	        Integer eventId = 1;
	        EventBean event = new EventBean(); // Sample event to be deleted
	        TaskBean task1 = new TaskBean(404, "test", "pending", "test2", LocalDate.now());
	        TaskBean task2 = new TaskBean(405, "test", "pending", "test2", LocalDate.now());
	        task1.setEvent(event);
	        task2.setEvent(event);
	        List<TaskBean> tasks = Arrays.asList(task1, task2); // Sample tasks associated with the event
	        event.setTasks(tasks);
	        when(eventJPAService.findById(eventId)).thenReturn(Optional.of(event));
	        doNothing().when(taskJPAService).deleteById(anyInt()); // Mock deleting tasks
	        doNothing().when(eventJPAService).deleteById(eventId); // Mock deleting the event

	        ResponseEntity<EventBean> response = eventController.deleteEventById(username, eventId);

	        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	        verify(taskJPAService, times(tasks.size())).deleteById(anyInt()); // Verify tasks were deleted
	        verify(eventJPAService).deleteById(eventId); // Verify event was deleted
	    }
	    
	    @Test
	    public void testUpdateEvent() {
	        int eventId = 1;
	        EventBean updatedEvent = new EventBean(10,"testuser" ,"Updated Event", "New Status", LocalDate.now());

	        // Mock the behavior of eventJPAService.findById
	        when(eventJPAService.findById(eventId)).thenReturn(Optional.of(new EventBean()));

	        eventController.updateEvent(eventId, updatedEvent);

	        // Verify that eventJPAService.save is called with the expected event
	        verify(eventJPAService).save(argThat(event -> {
	            assertEquals("Updated Event", event.getName());
	            assertEquals("New Status", event.getStatus());
	            assertEquals(LocalDate.now(), event.getTargetDate());
	            return true;
	        }));
	    }


}
