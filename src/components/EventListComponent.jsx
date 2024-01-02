import { useEffect, useState } from "react";
import { deleteEventsForId, getEventsForUsername } from "./api/EventsApiService";
import { Button } from "react-bootstrap";
import { GetAuthContext } from "./security/AuthContext";
import { useNavigate } from "react-router";

export default function EventListComponent(){
    const navigate = useNavigate();
    const authContext = GetAuthContext();
    const username = authContext.username;
    const [events,setEvents] = useState([])

    useEffect(
        renderingList, 
        [deleteEvent]
    )

    function renderingList(){
        getEventsForUsername(username)
        .then(
            response => {
                setEvents(response.data)
            }
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
            alert("deleted!")
        )
        .catch(
            error => console.error(error)
        )
    }

    return(
        <div className="container">
            <h1>Your Events</h1>
            <hr/>
            <table className="table">
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
                            (<tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.status}</td>
                                <td>{event.targetDate}</td>
                                <td><Button className="btn btn-dark" onClick={()=>updateEvent(event.id)}>Update</Button></td>
                                <td><Button className="btn btn-warning" onClick={()=>deleteEvent(event.id)}>Delete</Button></td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}