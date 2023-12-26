import './EventComponent.css';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import LoginComponent from './LoginComponent';
import AuthProvider, { GetAuthContext } from './security/AuthContext';
import { Button } from 'react-bootstrap';
import ErrorComponent from './ErrorComponent';
import EventListComponent from './EventListComponent';
import HeaderComponent from './HeaderComponent';


export default function EventComponent(){
    return (
        <AuthProvider>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/welcome/:username' element={<WelcomeComponent/>}/>
                    <Route path='/events' element={<EventListComponent/>}/>

                    <Route path='*' element={<ErrorComponent/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}






function WelcomeComponent(){
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