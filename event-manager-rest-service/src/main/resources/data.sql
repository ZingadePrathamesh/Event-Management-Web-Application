insert into event_bean(event_id, username, name, status, target_Date)
values (101, 'programmer', 'birthday', 'Upcoming',  CURRENT_DATE),
(102, 'programmer', 'wedding', 'Upcoming', CURRENT_DATE),
(103, 'programmer', 'dept day', 'Upcoming',  CURRENT_DATE);

insert into task_bean(event_event_id, task_id, deadline, assigned_to, task_name, task_status)
values (101, 1001, CURRENT_DATE, 'rahul', 'cake', 'Upcoming');