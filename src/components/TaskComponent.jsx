import { useEffect, useState } from "react";
import TaskListComponent from "./TaskListComponent";
import { Field, Formik } from "formik";
import { getEventsForUsername } from "./api/EventsApiService";
import { GetAuthContext } from "./security/AuthContext";

export default function TaskComponent(){
    const authContext = GetAuthContext();
    const username = authContext.username;
    const [eventId, setEventId] = useState(-1);
    const [events, setEvents] = useState([])
    
    useEffect(
        retrieveEvents,
        []
    )

    function retrieveEvents(){
        getEventsForUsername(username)
        .then(
            response => {
                console.log(response)
                setEvents(response.data)
            }
                
        )
        .catch(
            error=> console.error(error)
        );
    }
    
    const handleEventChange = (event) => {
        const selectedEventId = event.target.value;
        setEventId(selectedEventId);
    };

    return(
        <div>
            <Formik
            initialValues={{eventId}}
            enableReinitialize ={true}
            >
                <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                    <label className="form-label">Status</label>
                    <Field as="select" name="eventId"  onChange={handleEventChange} className="form-select">
                        <option key="" value="">Select an option</option>
                        {events.map((event) => (
                        <option key={event.eventId} value={event.eventId}>
                            {event.name}
                        </option>
                        ))}
                    </Field>
                </fieldset>
            </Formik>

            {eventId!=null &&<TaskListComponent key={eventId} eventId={eventId}/>}
        </div>
    );
}