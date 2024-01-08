import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import eveimage from "./image/calendar.gif";
export default function WelcomeComponent(){
    const {username} = useParams();
    const navigate = useNavigate();


    function handleEventButton(){
        navigate('/events');
    }

    return(
        <div className="welcome-body">
            <div className="title-body">
                <p className="title">WELCOME TO EVENT MANAGEMENT</p>
            </div>
            <div className="mid-div">
                <div>
                    <img className = "image" src={eveimage}></img>
                </div>
                <div className="tutorial-box">
                    <p className="tutorial">&#x2022; There are events that you can create.</p>
                    <p className="tutorial">&#x2022; And each event have tasks in them.</p>
                    <p className="tutorial">&#x2022; You can add, update and delete an event.</p>
                    <p className="tutorial">&#x2022; You can add, update, assign and delete a task too.</p>
                </div>
            </div>
            <div className="button-box">
                <Button variant='btn btn-dark m-6 w-60' onClick={()=>navigate('/events')}>Events</Button>
                <Button variant='btn btn-light m-6 w-60' onClick={()=>navigate('/tasks')}>Tasks</Button>
            </div>
        </div>
    );
}