import { useEffect, useState } from "react";
import { deleteEventsForId, getEventsForUsername } from "./api/EventsApiService";
import { Button } from "react-bootstrap";
import { GetAuthContext } from "./security/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function EventListComponent(){
    const navigate = useNavigate();
    const authContext = GetAuthContext();
    const username = authContext.username;
    const [events,setEvents] = useState([])

    useEffect(
        renderingList, 
        []
    )

    function renderingList(){
         getEventsForUsername(username)
        .then(
            response => setEvents(response.data)
        )
        .catch(
            error => console.error(error)
        )
    }

    function updateEvent(id){
        console.log("updating: "+ id);
        navigate(`/event-form/${id}`)
    }  

    function deleteEvent(id){
        deleteEventsForId(username, id)
        .then(
            ()=>{
                alert("deleted!")
                renderingList()
            }
        )
        .catch(
            error => console.error(error)
        )
    }

    function createEvent(id){
        navigate(`/event-form/${id}`)
    }

    return(
        <div className="container">
            <h1>Your Events</h1>
            <hr/>
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map(
                            event=>
                            (<tr key={event.eventId}>
                                <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.eventId}</Link></td>
                                <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.name}</Link></td>
                                <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.status}</Link></td>
                                <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.targetDate}</Link></td>
                                <td><Button className="btn btn-dark" onClick={()=>updateEvent(event.eventId)}>Update</Button></td>
                                <td><Button className="btn btn-warning" onClick={()=>deleteEvent(event.eventId)}>Delete</Button></td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
            <Button className="btn btn-light" onClick={()=>createEvent(-1)}>Add</Button>
        </div>
    );
}