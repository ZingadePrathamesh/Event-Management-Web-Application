import { useNavigate, useParams } from "react-router";
import { GetAuthContext } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { retrieveEventForId } from "./api/EventsApiService";
import TaskListComponent from "./TaskListComponent";

export default function EventViewComponent(){
    const {eventId} = useParams();
    const navigate = useNavigate();
    const authContext = GetAuthContext();
    const username = authContext.username;
    const [name, setName] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [status, setStatus] = useState("");
    
    useEffect(
        retrieveEvent, []
    )

    function retrieveEvent(){
        retrieveEventForId(username, eventId)
        .then(
            response=>{
                setName(response.data.name)
                setStatus(response.data.status)
                setTargetDate(response.data.targetDate)
            }
        )
        .catch(
            error => console.error(error.response.data.message)
        )
    }

    return(
        <div className="event-body">
            <div className="event-title">{name}</div>
            <div className="event-details">
                Status: {status}
            </div>
            <div className="event-details">
                Date: {targetDate}
            </div>
            <hr/>
            <div style={{width: "100%"}}>
                <TaskListComponent eventId={eventId}/>
            </div>
        </div>
    );
}