package com.example.eventmanagerrestservice.event;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@ExtendWith(MockitoExtension.class)
class EventControllerTest {
	@Mock
	EventJPAService eventJPAService;
	
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


}
