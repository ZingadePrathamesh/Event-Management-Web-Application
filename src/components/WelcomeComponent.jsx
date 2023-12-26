import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

export default function WelcomeComponent(){
    const {username} = useParams();
    const navigate = useNavigate();

    function handleEventButton(){
        navigate('/events');
    }

    return(
        <div>
            <h1>WELCOME TO EVENT MANAGEMENT</h1>
            <h3>Your guide on the journey of managing events!
                <br/>
                Greetings, {username}
                <br/>
                You can proceed towards your Events from here!
            </h3>
            <Button variant='secondary' onClick={handleEventButton}>Events</Button>
        </div>
    );
}