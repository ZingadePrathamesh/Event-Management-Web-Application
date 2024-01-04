insert into event_bean(event_id, username, name, status, target_Date)
values (101, 'programmer', 'birthday', 'Upcoming',  CURRENT_DATE),
(102, 'programmer', 'wedding', 'Upcoming', CURRENT_DATE),
(103, 'programmer', 'dept day', 'Upcoming',  CURRENT_DATE);


insert into task_bean(deadline, event_bean_event_id, task_id, assigned_to, task_name, task_status)
values (CURRENT_DATE, 101, 1001, 'Ramesh', 'Cake', 'Upcoming'),
(CURRENT_DATE, 102, 1002, 'Suresh', 'Balloon', 'Upcoming'),
(CURRENT_DATE, 103, 1003, 'Mukesh', 'Candles', 'Upcoming');