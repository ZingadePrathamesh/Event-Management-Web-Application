package com.example.eventmanagerrestservice.event;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class EventService {
	private static List<EventBean> events = new ArrayList<EventBean>();
	private static Integer eventCount = 0;
	
	static {
		events.add(new EventBean(++eventCount, "programmer", "Birthday" ,"upcoming", LocalDate.now().plusMonths(6)));
		events.add(new EventBean(++eventCount, "programmer", "Marriage" ,"upcoming", LocalDate.now().plusMonths(6)));
		events.add(new EventBean(++eventCount, "programmer", "Christmas" ,"upcoming", LocalDate.now().plusMonths(6)));
		events.add(new EventBean(++eventCount, "user", "Christmas" ,"upcoming", LocalDate.now().plusMonths(6)));
	}
	
	public List<EventBean> findAll() {
		return events;
	}
	
	public List<EventBean> findAllByUsername(String username) {
		List<EventBean> filteredEvents= new ArrayList<EventBean>();
		for(EventBean eve: events) {
			if(eve.getUsername().equals(username)) {
				filteredEvents.add(eve);
			}
		}
		return filteredEvents;
	}
	
	public EventBean findById(Integer id) {
		Predicate<? super EventBean> predicate = event-> event.getId() == id;
		return events.stream().filter(predicate ).findFirst().orElse(null);
	}
	
}
