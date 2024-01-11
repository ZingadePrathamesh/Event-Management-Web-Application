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
        // <div className="event-body p-2">
        //     <p className="event-title m-2 text-4xl drop-shadow-xl">Events</p>
        //     <table className="table table-light table-striped table-hover ">
        //         <thead>
        //             <tr>
        //                 <th>Id</th>
        //                 <th>Name</th>
        //                 <th>Status</th>
        //                 <th>Date</th>
        //                 <th></th>
        //                 <th></th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 events.map(
        //                     event=>
        //                     (<tr key={event.eventId}>
        //                         <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.eventId}</Link></td>
        //                         <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.name}</Link></td>
        //                         <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.status}</Link></td>
        //                         <td><Link className="nav-link" to={`/event-view/${event.eventId}`}>{event.targetDate}</Link></td>
        //                         <td><Button className="btn btn-dark" onClick={()=>updateEvent(event.eventId)}>Update</Button></td>
        //                         <td><Button className="btn btn-warning" onClick={()=>deleteEvent(event.eventId)}>Delete</Button></td>
        //                     </tr>)
        //                 )
        //             }
        //         </tbody>
        //     </table>
        //     <Button className="btn btn-light w-40 hover:shadow-xl" onClick={()=>createEvent(-1)}>Add</Button>
        // </div>
        <div>
            <div className="title-bar">
                <p className="title">Manage Your Events!</p>
                <button className="btn w-40 h-10" onClick={()=>createEvent(-1)}>Add</button>
            </div>
            <div className="event-cards">
                
                {events.map(event=>(
                    <Link className="nav-link" to={`/event-view/${event.eventId}`}>
                        <div class="card">
                            <div class="card-content">
                                <p class="card-title">{event.name}</p>
                                <p class="card-para">{event.status}</p>
                                <p class="card-para">{event.targetDate}</p>
                                <Button className="btn btn-dark" onClick={()=>updateEvent(event.eventId)}>Update</Button>
                                <Button className="btn btn-danger" onClick={()=>deleteEvent(event.eventId)}>Delete</Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}