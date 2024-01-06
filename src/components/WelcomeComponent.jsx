import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

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
            <div className="tutorial-box">
                <p className="tutorial">There are events that you create.</p>
                <p className="tutorial">And each event have tasks in them.</p>
                <p className="tutorial">You can add, update and delete an event.</p>
                <p className="tutorial">You can add, update, assign and delete a task too.</p>
            </div>
            <div className="button-box">
                <Button variant='btn btn-dark m-2' onClick={()=>navigate('/events')}>Events</Button>
                <Button variant='btn btn-light m-2' onClick={()=>navigate('/tasks')}>Tasks</Button>
            </div>
        </div>
    );
}