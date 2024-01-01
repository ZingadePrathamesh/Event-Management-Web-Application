import { useEffect, useState } from "react";
import { getEventsForUsername } from "./api/EventsApiService";

export default function EventListComponent(){
    const date = new Date();
    const today = (num ) => new Date(date.getFullYear()+num, date.getMonth(), date.getDate()).toDateString();
    const [events,setEvents] = useState([])

    useEffect(
        renderingList, []
    )

    function renderingList(){
        getEventsForUsername()
        .then(
            response => console.log(response)
        )
        .catch(
            error => console.error(error)
        )
    }

    // const events = [{id:1, name: "Birthday", status:"upcoming", targetDate: today(1) },
    //                 {id:2, name: "Wedding" , status:"upcoming", targetDate: today(2)},
    //                 {id:3, name: "Party" , status:"upcoming", targetDate: today(3)},
    //                 {id:4, name: "Exam" , status:"upcoming", targetDate: today(4)},
    //             ];



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
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}